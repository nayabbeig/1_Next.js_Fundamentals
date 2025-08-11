import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
      <>
        <Link href="/about">About</Link>
        <div>{children}</div>
      </>
  );
}
