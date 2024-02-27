"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { PaginationItem, PaginationLink } from "@/components/atoms/pagination";
import { cn } from "@/lib/utils";

type Props = {
  totalPages: number;
};

export const usePagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const calculatePageRange = () => {
    const buttonsToShow = 3;
    const halfButtonsToShow = Math.floor(buttonsToShow / 2);
    const startPage = Math.max(1, currentPage - halfButtonsToShow);
    const endPage = Math.min(totalPages, startPage + buttonsToShow - 1);
    return { startPage, endPage };
  };

  const renderPaginationButtons = () => {
    const { startPage, endPage } = calculatePageRange();
    const buttons = [];
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={createPageURL(i)}
            className={cn(
              "hover:bg-overlay hover:text-default",
              currentPage === i && "bg-overlay",
            )}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return buttons;
  };

  return {
    currentPage,
    createPageURL,
    renderPaginationButtons,
  };
};
