"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-d-dvh grid place-items-center">
        <main className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-5xl md:text-6xl font-serif">
            Something went wrong!
          </h2>
          <button
            className="block px-4 py-1 border border-border rounded-lg hover:border-foreground duration-300 ease-in-out"
            onClick={() => reset()}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
