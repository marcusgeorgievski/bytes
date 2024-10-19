"use client";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { jetBrainsMono } from "@/lib/fonts/fonts";

export default function Header() {
  const user = null;

  const handleSignOut = async () => {
    try {
    } catch (error) {}
  };

  return (
    <header className="border h-[50px] rounded-md mt-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h1 className={`font-bold text-xl pl-4 ${jetBrainsMono.className}`}>
          Auth
        </h1>

        <nav className="flex gap-4 items-center text-sm text-zinc-800">
          <Link href="/">Home</Link>
          <Link href="/protected">Protected</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4 pr-4 text-sm text-zinc-800">
        {user !== null ? (
          <>
            <button onClick={handleSignOut}>Sign Out</button>
            <Link href="/account">Account</Link>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign up</Link>
          </>
        )}
      </div>
    </header>
  );

  // return (
  //   <header className="py-2">
  //     <div className="pb-1">
  //       <h1 className={`font-bold text-xl ${jetBrainsMono.className}`}>
  //         JWT Auth
  //       </h1>
  //     </div>
  //     <div className="flex justify-between">
  //       <nav className="flex gap-4 items-center">
  //         <Link href="/">Home</Link>
  //         <Separator orientation="vertical" className="h-4" />
  //         <Link href="/protected">Protected</Link>
  //       </nav>
  //       <div className="flex items-center gap-4">
  //         {user !== null ? (
  //           <>
  //             <button onClick={handleSignOut}>Sign Out</button>
  //             <Separator orientation="vertical" className="h-4" />
  //             <Link href="/account">Account</Link>
  //           </>
  //         ) : (
  //           <>
  //             <Link href="/login">Login</Link>
  //             <Separator orientation="vertical" className="h-4" />
  //             <Link href="/signup">Sign up</Link>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //     <Separator className="my-2" />
  //   </header>
  // );
}
