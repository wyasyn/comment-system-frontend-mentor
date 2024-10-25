import { getComments } from "@/app/actions/getComment";
import CommentCard from "./CommentCard";
import Pagination from "./pagination";

export default async function Comments({
  currentPage,
}: {
  currentPage: number;
}) {
  const commentsData = await getComments(currentPage, 5);
  return (
    <section className=" grid gap-8 pb-[14rem] ">
      {commentsData.comments.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      )) || (
        <p className="text-lg mt-8 ml-4 text-foreground">No comments yet</p>
      )}
      {commentsData.totalPages > 1 && (
        <Pagination
          currentPage={commentsData.currentPage}
          totalPages={commentsData.totalPages}
        />
      )}
    </section>
  );
}
