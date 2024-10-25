import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <div className="flex items-center justify-center gap-4 text-center flex-col">
        <h2 className="text-5xl md:text-6xl font-serif">Page Not Found</h2>
        <p className="text-muted-foreground">
          Could not find requested resource
        </p>
        <Link
          className="block px-4 py-1 border border-border rounded-lg hover:border-foreground duration-300 ease-in-out"
          href="/"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
