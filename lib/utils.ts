import { formatDistanceToNow } from "date-fns";

export const formatDate = (date: Date) => {
  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });

  // Remove the word "about" if it exists
  return formattedDate.replace(/^about\s/, "");
};
