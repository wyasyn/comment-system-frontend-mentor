"use client";
import React from "react";
import { useFormContext } from "./context";
import { useRouter } from "next/navigation";
import { deleteComment } from "@/app/actions/comments";
import toast from "react-hot-toast";
import deleteIcon from "@/assets/images/icon-delete.svg";
import Image from "next/image";

const DeleteModal = ({ commentId }: { commentId: string }) => {
  const router = useRouter();
  const { isDeleteModalOpen, closeDeleteModal, openDeleteModal } =
    useFormContext();
  const [selectedCommentId, setSelectedCommentId] = React.useState<
    string | null
  >(null);

  const openDeleteModalForComment = (id: string) => {
    setSelectedCommentId(id);
    openDeleteModal();
  };

  const closeDeleteModalForComment = () => {
    setSelectedCommentId(null);
    closeDeleteModal();
  };

  const handleDelete = async () => {
    try {
      if (!selectedCommentId) return;
      await deleteComment(selectedCommentId);
      toast.success("Delete successful");
      router.refresh();
    } catch (error) {
      console.log(error);
      throw error;
    }

    closeDeleteModalForComment();
  };

  return (
    <>
      {selectedCommentId && isDeleteModalOpen ? (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm w-full h-full z-50 grid place-items-center p-4">
          <div className="bg-secondary p-4 rounded-lg w-fit flex flex-col gap-5">
            <h3 className="text-foreground text-xl">Delete comment</h3>
            <p className="max-w-prose text-muted-foreground">
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </p>
            <div className="flex items-center gap-4 uppercase justify-between">
              <button
                className="bg-muted-foreground text-background w-full py-2 px-3 rounded-lg uppercase hover:opacity-75 duration-300 ease-in-out"
                onClick={closeDeleteModalForComment}
              >
                No, Cancel
              </button>
              <button
                className="bg-danger text-white hover:bg-muted-danger duration-300 ease-in-out w-full py-2 px-3 rounded-lg uppercase"
                onClick={handleDelete}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => openDeleteModalForComment(commentId)}
          className="text-danger flex items-center gap-2 hover:text-muted-danger duration-300 ease-in-out"
        >
          <Image src={deleteIcon} alt="Reply Icon" className="w-4 h-4" /> Delete
        </button>
      )}
    </>
  );
};

export default DeleteModal;
