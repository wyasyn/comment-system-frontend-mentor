"use client";

import { BtnType } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitBtnProps {
  typeBtn: BtnType;
}
export default function SubmitBtn({ typeBtn }: SubmitBtnProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-primary rounded-md px-4 text-btn-foreground py-1 hover:opacity-75 duration-300 ease-in-out uppercase "
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={18} />
        </>
      ) : typeBtn === BtnType.SEND ? (
        "Send"
      ) : typeBtn === BtnType.REPLY ? (
        "Reply"
      ) : (
        "UPDATE"
      )}
    </button>
  );
}
