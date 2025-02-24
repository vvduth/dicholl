"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

const links = [
  {
    title: "Profile",
    href: "/user/profile",
  },
  {
    title: "Orders",
    href: "/user/orders",
  },
];
const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  return (
    <div
      {...props}
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >
      {links.map((link) => (
        <Link
          className={cn(
            "text-sm font-medium text-gray-900 transition-colors hover:text-primary",
            pathname.includes(link.href) ? ' ': 'text-muted-foreground'
          )}
          key={link.href}
          href={link.href}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
