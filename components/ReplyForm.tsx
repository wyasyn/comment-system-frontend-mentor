"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "./context";
import UserBtn from "./Userbtn";
import { replyToComment } from "@/app/actions/comments";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitBtn from "./submitBtn";
import { BtnType } from "@/lib/types";

const ReplyForm = ({ commentId }: { commentId: string }) => {
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  const { activeReplyFormId, closeReplyForm } = useFormContext();
  const isActive = activeReplyFormId === commentId; // Check if this form is active

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Reply content is required");
      return;
    }
    try {
      const { success } = await replyToComment(content, commentId);
      if (success) {
        toast.success("Reply submitted successfully");
        setContent(""); // Clear the form after success
        closeReplyForm(); // Close the form
        router.refresh(); // Refresh the page to show the new reply
      }
    } catch (error) {
      toast.error("Error submitting the reply");
      console.error(error);
    }
  };

  if (!isActive) return null; // Only render the form if it is active for this comment

  return (
    <div className="md:flex items-start justify-between gap-4 bg-secondary p-4 rounded-lg relative">
      <UserBtn />
      <form
        onSubmit={handleReply}
        className="w-full flex-col items-end flex-1 flex md:flex-row md:items-start justify-between gap-4"
      >
        <textarea
          className="w-full border rounded-md p-4 bg-secondary border-border text-sm text-muted-foreground "
          aria-label="Reply to Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
          minLength={10}
          maxLength={1000}
          autoComplete="off"
          autoFocus
        />
        <SubmitBtn typeBtn={BtnType.REPLY} />
      </form>
    </div>
  );
};

export default ReplyForm;
