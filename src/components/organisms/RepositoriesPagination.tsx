"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination";
import { usePagination } from "@/hooks/usePagination";

type Props = {
  totalPages: number;
};

export const RepositoriesPagination = ({ totalPages }: Props) => {
  const { currentPage, createPageURL, renderPaginationButtons } = usePagination(
    { totalPages },
  );

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
        {renderPaginationButtons()}
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
