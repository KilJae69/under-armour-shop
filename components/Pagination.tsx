"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export default function Pagination({
  currentPage,
  hasPrev,
  hasNext,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();


  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    ;
    params.set("page", pageNumber.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex w-full justify-between">
      <button
        className="w-24 cursor-pointer rounded-md bg-primary p-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasPrev}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="w-24 cursor-pointer rounded-md bg-primary p-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
