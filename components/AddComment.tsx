import AddCommentForm from "./AddCommentForm";
import UserBtn from "./Userbtn";

export default function AddComment() {
  return (
    <div className=" shadow-lg md:flex fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl items-start justify-between gap-4 bg-secondary p-4 rounded-lg z-30">
      <UserBtn />
      <AddCommentForm />
    </div>
  );
}
