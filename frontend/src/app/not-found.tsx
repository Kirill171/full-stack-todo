'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="flex flex-col h-[100vh] justify-center items-center">
          <h1 className="text-center text-5xl font-bold">
            Page not found!
          </h1>
          <Link
            href="/en"
            className="text-blue-500 text-2xl underline"
          >
            Go back
          </Link>
        </div>
      </body>
    </html>
  );
}
