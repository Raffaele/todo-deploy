import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export const MainHeader = () => {
  return (
    <header className="bg-empty flex w-full justify-between">
      <div className="w-16 flex justify-center align-middle">
        <SignedOut>
          <SignInButton mode="modal">
            <Image
              src={"/login-button.svg"}
              alt="Login"
              width={50}
              height={50}
            />
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <h1 className="text-5xl font-bold py-4 text-center text-empty-text">
        TODO LIST
      </h1>
      <div className="w-16">A</div>
    </header>
  );
};
