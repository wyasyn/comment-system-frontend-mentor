"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "./context";

export default function RepliesWrapper({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { areRepliesOpen } = useFormContext();

  if (!id) return null;

  return (
    <AnimatePresence>
      {areRepliesOpen(id) && (
        <motion.div
          key={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
