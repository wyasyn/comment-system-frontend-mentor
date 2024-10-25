import { Comment } from "@/lib/types";
import CommentCard from "./CommentCard";

export default function Replies({ comment }: { comment: Comment }) {
  return (
    <div className="pl-8 border-border flex flex-col gap-4 border-l">
      {comment.replies.map((reply) => (
        <CommentCard key={reply.id} comment={reply} />
      ))}
    </div>
  );
}
