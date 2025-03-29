import Link from "next/link";
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <header className="border-b">
      <div className="container mx-auto my-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="text-xl font-bold">
          NextClerk🚀
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <Link href="/sign-in">
            <Button variant={"outline"}>Sign In</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
