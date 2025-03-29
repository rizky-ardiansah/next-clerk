import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <header className="border-b">
      <div className="container mx-auto my-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="text-xl font-bold">
          NextBlog🚀
        </Link>
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            {/* <SignOutButton>
              <Button variant="outline" className="text-red-700">
                Sign Out
              </Button>
            </SignOutButton> */}
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
