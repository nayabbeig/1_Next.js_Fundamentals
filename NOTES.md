Alright, here’s a **full revision notes document** for everything you’ve learned in **Next.js** so far —

combining today’s learning, your earlier learning, and adding the missing definitions, differences, and code examples.

---

## **📒 Next.js Complete Revision Notes**

---

### **1. App Router vs Pages Router**

| Feature | Pages Router (`pages/`) | App Router (`app/`) |
| --- | --- | --- |
| **Introduced in** | Next.js 1+ | Next.js 13+ |
| **Routing** | File-based routing using `/pages` folder | File-based routing using `/app` folder |
| **Data Fetching** | `getStaticProps`, `getServerSideProps`, etc. | `fetch()` in server components, `generateStaticParams` |
| **Layouts** | Not built-in | Built-in (`layout.js`) |
| **Nested Layouts** | Not supported | Supported |
| **Streaming** | Not supported | Supported |
| **Rendering Granularity** | Per page | Per route segment |

---

**Example: Pages Router**

```jsx
// pages/blog/[id].js
export async function getStaticProps({ params }) {
  const post = await getPost(params.id);
  return { props: { post } };
}

export async function getStaticPaths() {
  return { paths: [{ params: { id: '1' } }], fallback: false };
}

export default function BlogPost({ post }) {
  return <h1>{post.title}</h1>;
}

```

**Example: App Router**

```jsx
// app/blog/[id]/page.js
export default async function BlogPost({ params }) {
  const post = await getPost(params.id);
  return <h1>{post.title}</h1>;
}

```

---

### **2. Rendering Types**

### **Server-Side Rendering (SSR)**

- HTML generated **on every request**.
- Fresh data every time, slower than static.
- Example:

```jsx
// app/page.js
export default async function Page() {
  const data = await fetch("https://api.example.com/posts", { cache: "no-store" });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

```

### **Static Site Generation (SSG)**

- HTML generated **at build time**.
- Served from CDN — fastest.
- Example:

```jsx
// app/page.js
export const dynamic = "force-static"; // or default static
export default async function Page() {
  const data = await fetch("https://api.example.com/posts");
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

```

### **Incremental Static Regeneration (ISR)**

- Static pages **re-built in the background** at intervals.
- Example:

```jsx
export default async function Page() {
  const data = await fetch("https://api.example.com/posts", { next: { revalidate: 10 } });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

```

### **Client-Side Rendering (CSR)**

- Data fetched **in browser** after HTML loads.
- Example:

```jsx
"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return <pre>{JSON.stringify(posts, null, 2)}</pre>;
}

```

---

### **3. Special Next.js Functions in App Router**

| Function | Purpose |
| --- | --- |
| `generateStaticParams` | Generates paths for static builds (SSG). |
| `generateMetadata` | Generates metadata for `<head>` dynamically or statically. |
| `revalidate` (option) | Enables ISR in fetch. |
| `dynamic` (export) | Controls whether a page is static or dynamic. |
| `dynamicParams` (export) | Controls if unknown dynamic routes are allowed. |
| `fetch` caching options | Control caching and revalidation behavior. |

---

**Example: `generateStaticParams`**

```jsx
export async function generateStaticParams() {
  const posts = await fetch("https://api.example.com/posts").then(res => res.json());
  return posts.map(post => ({ id: post.id.toString() }));
}

```

**Example: `generateMetadata`**

```jsx
export async function generateMetadata({ params }) {
  return { title: `Blog Post ${params.id}` };
}

```

**Example: `dynamicParams`**

```jsx
export const dynamicParams = false; // Only allow known params

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

```

---

### **4. Possible Values of `dynamic`**

| Value | Behavior |
| --- | --- |
| `"auto"` (default) | Static if possible, dynamic if needed. |
| `"force-static"` | Always static at build time. |
| `"force-dynamic"` | Always fetch/render at request time (SSR). |
| `"error"` | Throw error if dynamic fetch is used. |

---

**Difference Between `force-static` and `error`**

- **`force-static`** → Forces static rendering, even if dynamic code exists. Will try to precompute everything.
- **`error`** → If dynamic fetch or dynamic behavior is detected, it **fails the build**.

---

### **5. Example Blog Project — Dynamic & Static**

**Static page with `generateStaticParams`**

```jsx
// app/blog/[id]/page.js
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

export default async function BlogPost({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.id}`).then(r => r.json());
  return <h1>{post.title}</h1>;
}

```

**Dynamic page**

```jsx
export const dynamic = "force-dynamic"; // Always SSR
export default async function BlogPost({ params }) {
  const time = new Date().toISOString(); // Shows current time
  return <h1>Post {params.id} at {time}</h1>;
}

```

---

If you want, I can now **add a quick “how to test if your page is static or dynamic” section** so you can confirm with real examples instead of `new Date()` confusion.

That would make your notes even more practical.