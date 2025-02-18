import React from 'react'
import { ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from 'next/image';


const Header = () => {
  return (
   <header
    className='
    w-full border-b'
   >
    <div className="wrapper flex-between">
        <div className="flex-start">
            <Link href="/" className='flex-start'>
                <Image
                 src="/images/logo.svg"
                 alt='Logo'
                 height={48}
                 width={48}
                 priority={true}
                />
                <span className='hidden font-bold lg:block text-2xl ml-3'>
                    Dichol
                </span>
            </Link>
        </div>
        <div className="space-x-2">
            <Button asChild variant={"ghost"}>
                <Link
                    href={"/cart"}
                >
                    <ShoppingCart/> Cart
                </Link>
            </Button>
            <Button asChild variant={"ghost"}>
                <Link
                    href={"/sign-in"}
                >
                    <UserIcon/> Sign in
                </Link>
            </Button>
        </div>
    </div>
   </header>
  )
}

export default Header
