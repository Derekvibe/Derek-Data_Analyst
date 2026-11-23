import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-shell py-24">
      <p className="eyebrow">404 / Not found</p>
      <h1 className="page-heading mt-5">This page is not here.</h1>
      <Link href="/" className="mt-8 inline-block border-b border-[var(--primary)] pb-2 text-sm">Return home →</Link>
    </div>
  );
}
