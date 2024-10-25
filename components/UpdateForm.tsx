"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "./context";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { editComment } from "@/app/actions/comments";
import UserBtn from "./Userbtn";
import SubmitBtn from "./submitBtn";
import { BtnType } from "@/lib/types";

const UpdateForm = ({
  commentId,
  defaultValue,
}: {
  commentId: string;
  defaultValue: string;
}) => {
  const { activeUpdateFormId, closeUpdateForm } = useFormContext();
  const [content, setContent] = useState<string>(defaultValue); // Set default value to initial state
  const router = useRouter();
  const isActive = activeUpdateFormId === commentId; // Check if the current form is active

  // Ensure defaultValue is set when component mounts or when it changes
  useEffect(() => {
    setContent(defaultValue);
  }, [defaultValue]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Comment content is required");
      return;
    }
    try {
      const { success } = await editComment(commentId, content);
      if (success) {
        toast.success("Update submitted successfully");
        closeUpdateForm();
        router.refresh();
      }
    } catch (error) {
      toast.error("Error submitting the update");
      console.error(error);
    }
  };

  if (!isActive) return null;
  return (
    <div className="md:flex items-start justify-between gap-4 bg-secondary p-4 rounded-lg relative">
      <UserBtn />
      <form
        onSubmit={handleUpdate}
        className="w-full flex-col items-end flex-1 flex md:flex-row md:items-start justify-between gap-4"
      >
        <textarea
          className="w-full border rounded-md p-4 bg-secondary border-border text-sm text-muted-foreground "
          aria-label="Edit Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
          minLength={10}
          maxLength={1000}
          autoComplete="off"
          autoFocus
        />
        <SubmitBtn typeBtn={BtnType.UPDATE} />
      </form>
    </div>
  );
};

export default UpdateForm;
