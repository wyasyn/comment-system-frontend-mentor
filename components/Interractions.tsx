"use client";
import Image from "next/image";
import plus from "@/assets/images/icon-plus.svg";
import minus from "@/assets/images/icon-minus.svg";
import { useRouter } from "next/navigation";
import { disLikeComment, likeComment } from "@/app/actions/comments";

export default function Interactions({
  likes,
  commentId,
}: {
  likes: number;
  commentId: string;
}) {
  const router = useRouter();
  const handleLike = async () => {
    await likeComment(commentId);
    try {
      router.refresh();
    } catch (error) {
      console.log(error);

      throw error;
    }
  };
  const handleDisLike = async () => {
    await disLikeComment(commentId);
    try {
      router.refresh();
    } catch (error) {
      console.log(error);

      throw error;
    }
  };
  return (
    <div className="bg-background md:px-2 px-4 md:py-3 py-2 rounded-xl shrink-0 grow-0 flex md:flex-col gap-4 md:gap-2 items-center absolute md:static bottom-0 left-0">
      <button onClick={handleLike}>
        <Image
          src={plus}
          width={10}
          height={10}
          alt="plus"
          className="object-contain"
        />
      </button>
      <p className="text-primary font-semibold">{likes}</p>
      <button onClick={handleDisLike}>
        <Image
          src={minus}
          width={10}
          height={10}
          alt="minus"
          className="object-contain"
        />
      </button>
    </div>
  );
}
