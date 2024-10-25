"use server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const { userId } = auth();

if (!userId) {
  redirect("/sign-in");
}

export const createComment = async (formData: FormData) => {
  if (!userId) {
    throw new Error("You must be signed in to create a comment");
  }
  try {
    const content = formData.get("content") as string;

    if (!content) {
      return {
        success: false,
        error: "Content is required",
      };
    }

    await prisma.comment.create({
      data: {
        content,
        userId,
      },
    });

    return {
      success: true,
      message: "Comment created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while creating the comment",
    };
  }
};

export const replyToComment = async (content: string, parentId: string) => {
  if (!userId) {
    throw new Error("You must be signed reply");
  }
  if (!content || !parentId || !userId) {
    return { error: "Missing required fields" };
  }

  try {
    const reply = await prisma.comment.create({
      data: {
        content,
        userId, // ensure userId is passed in as an argument
        parentId, // associate the reply with the parent comment
      },
    });

    return { success: "Reply successful", reply };
  } catch (error) {
    console.error("Error replying to comment:", error);
    return { error: "Failed to reply to comment" };
  }
};

export const likeComment = async (commentId: string) => {
  if (!userId) {
    throw new Error("You must be signed in to like");
  }
  const interaction = await prisma.commentInteraction.upsert({
    where: {
      commentId_userId: { commentId, userId },
    },
    update: {
      interactionType: "LIKE",
    },
    create: {
      commentId,
      userId,
      interactionType: "LIKE",
    },
  });
  return interaction;
};

export const disLikeComment = async (commentId: string) => {
  if (!userId) {
    throw new Error("You must be signed in to dislike");
  }
  const interaction = await prisma.commentInteraction.upsert({
    where: {
      commentId_userId: { commentId, userId },
    },
    update: {
      interactionType: "DISLIKE",
    },
    create: {
      commentId,
      userId,
      interactionType: "DISLIKE",
    },
  });
  return interaction;
};

export const editComment = async (commentId: string, newContent: string) => {
  if (!userId) {
    throw new Error("You must be signed in to edit a comment");
  }
  try {
    const comment = await prisma.comment.updateMany({
      where: {
        id: commentId,
        userId,
      },
      data: {
        content: newContent,
      },
    });

    if (comment.count === 0) {
      throw new Error("You are not allowed to edit this comment");
    }

    return { success: "Update successful" };
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  if (!userId) {
    throw new Error("You must be signed in to delete");
  }
  try {
    // Delete the comment (and its associated interactions)
    const comment = await prisma.comment.deleteMany({
      where: {
        id: commentId,
        userId: userId, // Ensure only the owner can delete
      },
    });

    if (comment.count === 0) {
      throw new Error("You are not allowed to delete this comment");
    }

    return { message: "Comment and associated data deleted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the comment");
  }
};
