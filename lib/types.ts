import { InteractionType } from "@prisma/client";

export enum BtnType {
  SEND,
  REPLY,
  UPDATE,
}

export interface Interaction {
  id: string;
  userId: string;
  createdAt: Date;
  commentId: string;
  interactionType: InteractionType;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  replies: Comment[];
  interactions: Interaction[];
}
