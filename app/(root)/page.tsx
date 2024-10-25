import AddComment from "@/components/AddComment";
import Comments from "@/components/comments";
import Skeleton from "@/components/Skeleton";
import { Suspense } from "react";

export default async function page({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string };
}) {
  const currentPage = parseInt(page);
  if (isNaN(currentPage) || currentPage < 1) {
    return (
      <p className="mt-12 ml-4 font-serif text-3xl">Invalid page number</p>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-2 my-[3rem] md:my-[4rem]">
      <Suspense fallback={<Skeleton />}>
        <Comments currentPage={currentPage} />
      </Suspense>
      <AddComment />
    </section>
  );
}
