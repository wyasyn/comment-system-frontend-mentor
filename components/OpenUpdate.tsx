"use client";
import Image from "next/image";
import { useFormContext } from "./context";
import edit from "@/assets/images/icon-edit.svg";

export default function OpenUpdate({ commentId }: { commentId: string }) {
  const { openUpdateForm } = useFormContext();
  return (
    <button
      onClick={() => openUpdateForm(commentId)}
      className="text-primary flex items-center gap-2 hover:opacity-75 duration-300 ease-in-out"
    >
      <Image src={edit} alt="Reply Icon" className="w-4 h-4" />
      Edit
    </button>
  );
}
