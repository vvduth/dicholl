import React from "react";

import Link from "next/link";

import Image from "next/image";
import CategoryDrawer from "./category-drawer";
import Menu from "./menu";

const Header = () => {
  return (
    <header
      className="
    w-full border-b"
    >
      <div className="wrapper flex-between">
        <div className="flex-start">
          <CategoryDrawer />
          <Link href="/" className="flex-start ml-4">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              height={48}
              width={48}
              priority={true}
            />
            <span className="hidden font-bold lg:block text-2xl ml-3">
              Dichol
            </span>
          </Link>
        </div>

        <Menu />
      </div>
    </header>
  );
};

export default Header;
