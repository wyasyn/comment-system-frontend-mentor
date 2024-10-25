"use client";
import Image from "next/image";
import { useFormContext } from "./context";
import reply from "@/assets/images/icon-reply.svg";

export default function OpenReply({ commentId }: { commentId: string }) {
  const { openReplyForm } = useFormContext();
  return (
    <button
      onClick={() => openReplyForm(commentId)}
      className="text-primary flex items-center gap-2 hover:opacity-75 duration-300 ease-in-out"
    >
      <Image src={reply} alt="Reply Icon" className="w-4 h-4" />
      Reply
    </button>
  );
}
