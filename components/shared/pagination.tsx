"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};
const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = ( type: string) => {
    const pageValue = type === 'next' ? Number(page) + 1 : Number(page) -1
    const newUrl =  formUrlQuery({
        params: searchParams.toString(),
        key: urlParamName || "page",
        value: pageValue.toString(),
    })
    router.push(newUrl)
  }
  return (
    <div className="flex gap-2">
      <Button
        variant={"outline"}
        className="w-28"
        disabled={Number(page) <= 1}
        size={"lg"}
        onClick={() => handleClick('prev')}
      >
        prev
      </Button>
      <Button
        variant={"outline"}
        className="w-28"
        disabled={Number(page) >= totalPages}
        size={"lg"}
        onClick={() => handleClick('next')}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
