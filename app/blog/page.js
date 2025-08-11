// app/blog/page.tsx

import Link from "next/link";

export default async function BlogListPage() {
  const res = await fetch('https://dummyjson.com/posts'); // Replace with your API
  const {posts} = await res.json();

  return (
    <div>
      <h1>All Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
