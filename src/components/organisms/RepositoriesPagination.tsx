"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination";

type Props = {
  totalPages: number;
};

export const RepositoriesPagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className={
              currentPage - 1 === 0
                ? "pointer-events-none opacity-50"
                : "hover:bg-overlay hover:text-default"
            }
          />
        </PaginationItem>
        <PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationLink
              key={index}
              href={createPageURL(index + 1)}
              className={
                currentPage === index + 1
                  ? "bg-overlay"
                  : "hover:bg-overlay hover:text-default"
              }
            >
              {index + 1}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className={
              currentPage + 1 > totalPages
                ? "pointer-events-none opacity-50"
                : "hover:bg-overlay hover:text-default"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
