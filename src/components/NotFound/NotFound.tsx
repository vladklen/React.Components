import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Page not found!</h2>
      <p>
        Go to the<Link href="/">Home</Link>
      </p>
    </div>
  );
}
