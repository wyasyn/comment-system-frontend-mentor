"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormContextType {
  activeReplyFormId: string | null;
  activeUpdateFormId: string | null;
  isDeleteModalOpen: boolean;
  openReplyForm: (id: string) => void;
  closeReplyForm: () => void;
  openUpdateForm: (id: string) => void;
  closeUpdateForm: () => void;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  openReplies: (id: string) => void;
  closeReplies: (id: string) => void;
  areRepliesOpen: (id: string) => boolean;
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider component
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [activeReplyFormId, setActiveReplyFormId] = useState<string | null>(
    null
  );
  const [activeUpdateFormId, setActiveUpdateFormId] = useState<string | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State to track open replies for each comment
  const [openRepliesIds, setOpenRepliesIds] = useState<Set<string>>(new Set());

  const openReplyForm = (id: string) => setActiveReplyFormId(id);
  const closeReplyForm = () => setActiveReplyFormId(null);

  const openUpdateForm = (id: string) => setActiveUpdateFormId(id);
  const closeUpdateForm = () => setActiveUpdateFormId(null);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  // Functions to open and close replies for a specific comment
  const openReplies = (id: string) => {
    setOpenRepliesIds((prev) => new Set(prev).add(id));
  };

  const closeReplies = (id: string) => {
    setOpenRepliesIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const areRepliesOpen = (id: string) => openRepliesIds.has(id);

  return (
    <FormContext.Provider
      value={{
        activeReplyFormId,
        activeUpdateFormId,
        isDeleteModalOpen,
        openReplyForm,
        closeReplyForm,
        openUpdateForm,
        closeUpdateForm,
        openDeleteModal,
        closeDeleteModal,
        openReplies,
        closeReplies,
        areRepliesOpen,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
