export default function Skeleton() {
  return (
    <div className="grid gap-4 p-4">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            className="mx-auto max-w-3xl px-2 my-[3rem] md:my-[4rem] w-full h-[200px] animate-pulse bg-secondary rounded-lg flex gap-4 p-8"
            key={index}
          >
            <div className="w-16 h-16 rounded-full bg-background animate-pulse" />
            <div className="flex flex-col gap-4 flex-1 py-4">
              <div className="w-full h-4 rounded-xl bg-background animate-pulse" />
              <div className="w-full h-4 rounded-xl bg-background animate-pulse" />
              <div className="w-full h-4 rounded-xl bg-background animate-pulse" />
            </div>
          </div>
        ))}
    </div>
  );
}
