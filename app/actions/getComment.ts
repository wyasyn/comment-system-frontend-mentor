"use server";
import prisma from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";

export const getComments = async (page: number = 1, pageSize: number = 10) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const totalComments = await prisma.comment.count({
    where: {
      parentId: null,
    },
  });

  const comments = await prisma.comment.findMany({
    where: {
      parentId: null,
    },
    include: {
      replies: {
        include: {
          replies: {
            include: {
              interactions: true,
            },
          },
          interactions: true,
        },
      },
      interactions: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take,
  });

  // Determine if there are next or previous pages
  const hasNextPage = skip + take < totalComments;
  const hasPrevPage = page > 1;

  return {
    comments,
    totalComments,
    currentPage: page,
    totalPages: Math.ceil(totalComments / pageSize),
    hasNextPage,
    hasPrevPage,
  };
};

export const getUserById = async (userId: string) => {
  const userData = await clerkClient.users.getUser(userId);
  return userData;
};

export const countLikes = async (commentId: string) => {
  try {
    const likeCount = await prisma.commentInteraction.count({
      where: {
        commentId: commentId,
        interactionType: "LIKE",
      },
    });

    return likeCount;
  } catch (error) {
    console.error("Error counting likes: ", error);
    throw new Error("Unable to count likes.");
  }
};
