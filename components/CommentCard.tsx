import { Comment } from "@/lib/types";
import Avatar from "./avatar";
import DeleteModal from "./DeleteModel";
import Interactions from "./Interractions";
import OpenReply from "./OpenReply";
import OpenUpdate from "./OpenUpdate";
import ReplyForm from "./ReplyForm";
import UpdateForm from "./UpdateForm";
import { auth } from "@clerk/nextjs/server";
import { countLikes, getUserById } from "@/app/actions/getComment";
import { formatDate } from "@/lib/utils";
import Replies from "./Replies";
import CommentsBtn from "./CommentsBtn";
import RepliesWrapper from "./RepliesWrapper";

export default async function CommentCard({ comment }: { comment: Comment }) {
  let isCurrentUser = false;
  const { userId } = auth();

  if (userId) {
    isCurrentUser = userId === comment.userId;
  }

  const userData = await getUserById(comment.userId);
  const likes = await countLikes(comment.id);

  return (
    <div className="flex flex-col gap-6">
      <article className="bg-secondary p-4 rounded-xl text-muted-foreground">
        <div className="flex gap-8 items-start relative md:static pb-12 md:pb-0">
          <Interactions likes={likes} commentId={comment.id} />
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex items-center justify-between gap-8 w-full flex-1">
              <div className="flex items-center gap-4">
                <Avatar src={userData.imageUrl} />
                <h2 className="text-foreground font-semibold">
                  {userData.firstName}
                </h2>
                {isCurrentUser && (
                  <div className="bg-primary text-white px-2 rounded-md">
                    you
                  </div>
                )}
                <p>{formatDate(comment.createdAt)}</p>
              </div>
              <div className="flex items-center flex-1 gap-4 justify-end absolute md:static bottom-0 right-4">
                {isCurrentUser ? (
                  <>
                    <DeleteModal commentId={comment.id} />
                    <OpenUpdate commentId={comment.id} />
                  </>
                ) : (
                  <OpenReply commentId={comment.id} />
                )}
              </div>
            </div>
            <p className="max-w-prose">{comment.content}</p>
          </div>
        </div>
        <ReplyForm commentId={comment.id} />
        <UpdateForm defaultValue={comment.content} commentId={comment.id} />
        <CommentsBtn
          id={comment.id}
          count={comment.replies ? comment.replies.length : 0}
        />
      </article>

      <RepliesWrapper id={comment.id}>
        {comment.replies && comment.replies.length > 0 && (
          <Replies comment={comment} />
        )}
      </RepliesWrapper>
    </div>
  );
}
