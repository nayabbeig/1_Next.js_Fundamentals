import { notFound } from "next/navigation";

export const dynamicParams = true;

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const { posts } = await fetch("https://dummyjson.com/posts").then(res => res.json());

  return posts.map(post => ({
    id: post.id.toString(),
  }));
}

export default async function BlogPost({ params }) {
  const { id } = await params;

  // Fetch the post
  const res = await fetch(`https://dummyjson.com/posts/${id}`);

  if (!res.ok) {
    // API returned 404 or error
    return <div>{id} Could not get a response</div>;
  }

  const post = await res.json();

  // DummyJSON returns {} for not found IDs (still 200), so we check this too
  if (!post.id) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <p>This page was generated at: {new Date().toString()}</p>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
