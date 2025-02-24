import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/user.action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
const UserButton = async () => {
  const session = await auth();
  if (!session) {
    return (
      <Button asChild>
        <Link href={"/sign-in"}>
          <UserIcon /> Sign in
        </Link>
      </Button>
    );
  }
  const firstIntial = session.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant={"ghost"}
              className="relative flex items-center justify-center w-8 h-8 ml-2 rounded-full bg-gray-200"
            >
              {firstIntial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user?.name}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem className="p-0 mb-1">
            <Link href={"/user/orders"}>
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant={"ghost"}
              >
                Order history
              </Button>
            </Link>
          </DropdownMenuItem>

          

          <DropdownMenuItem className="p-0 mb-1">
            <Link href={"/user/profile"}>
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant={"ghost"}
              >
                User profile
              </Button>
            </Link>
          </DropdownMenuItem>
          {session?.user?.role === "admin" && (
            <DropdownMenuItem className="p-0 mb-1 bg-green-600">
             <Button variant={"ghost"}
             className="w-full py-4 px-2 h-4 text-white"
             >
             <Link href={"/admin/overview"} className="w-ful">
             Admin</Link>
             </Button>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="p-0 mb-1 bg-rose-500">
            <form action={signOutUser} className="w-full">
              <Button
                className="w-full py-4 px-2 h-4 text-white"
                variant={"ghost"}
              >
                Sign out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
