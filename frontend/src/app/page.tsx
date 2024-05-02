import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  RedirectToSignIn,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="">
      {/* <SignInButton>
        <Button>Sign In</Button>
      </SignInButton>

      <SignUpButton>
        <Button>Sign Up</Button>
      </SignUpButton> */}

      <header>
        <SignedOut>
          <SignInButton />
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
      </header>
    </div>
  );
}
