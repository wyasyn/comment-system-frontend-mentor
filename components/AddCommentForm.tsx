"use client";

import { createComment } from "@/app/actions/comments";
import Textarea from "./Textarea";
import SubmitBtn from "./submitBtn";
import { BtnType } from "@/lib/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddCommentForm() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form) {
      console.error("Form reference is null");
      return;
    }

    const formData = new FormData(form);

    try {
      const { success, message, error } = await createComment(formData);

      if (success) {
        toast.success(message || "Comment created successfully");
        form.reset();
        router.refresh();
      } else if (error) {
        toast.error(error);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex-col items-end flex-1 flex md:flex-row md:items-start justify-between gap-4"
    >
      <Textarea placeholder="Add a comment.." name="content" />
      <SubmitBtn typeBtn={BtnType.SEND} />
    </form>
  );
}
