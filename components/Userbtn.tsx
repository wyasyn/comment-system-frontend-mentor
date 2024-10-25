import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader2, UserCircle } from "lucide-react";

export default function UserBtn() {
  return (
    <div className="absolute bottom-2 left-8 w-10 h-10 md:static">
      <SignedOut>
        <ClerkLoading>
          <Loader2 size={18} className="animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignInButton>
            <UserCircle
              size={24}
              className="cursor-pointer hover:opacity-75 duration-300 ease-in-out"
              aria-description="Sign in"
            />
          </SignInButton>
        </ClerkLoaded>
      </SignedOut>
      <SignedIn>
        <ClerkLoading>
          <Loader2 size={18} className="animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </SignedIn>
    </div>
  );
}
