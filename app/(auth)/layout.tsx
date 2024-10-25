export default function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid place-items-center min-h-dvh w-full">
      {children}
    </section>
  );
}
