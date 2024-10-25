"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-dvh place-items-center">
      <div className="flex items-center justify-center gap-4 text-center flex-col">
        <h2 className="text-5xl md:text-6xl font-serif">Oops!</h2>
        <p className="text-muted-foreground">Something went wrong!</p>
        <button
          className="block px-4 py-1 border border-border rounded-lg hover:border-foreground duration-300 ease-in-out"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
