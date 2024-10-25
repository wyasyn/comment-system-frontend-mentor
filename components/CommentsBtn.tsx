"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useFormContext } from "./context";

export default function CommentsBtn({
  id,
  count,
}: {
  id: string;
  count: number;
}) {
  const { openReplies, closeReplies, areRepliesOpen } = useFormContext();
  const handleToggleReplies = () => {
    if (areRepliesOpen(id)) {
      closeReplies(id);
    } else {
      openReplies(id);
    }
  };
  return (
    <button
      disabled={count < 1}
      onClick={handleToggleReplies}
      className=" flex items-center justify-center gap-2 text-primary border border-secondary hover:border-primary duration-300 ease-in-out text-sm px-4 py-2 rounded-xl mt-5"
    >
      {areRepliesOpen(id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}{" "}
      {count} replies
    </button>
  );
}
