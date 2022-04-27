import { ReactElement, useCallback } from "react";
import { PaginationHook, usePagination } from "./hook";

// Props passed by the <Pagination /> element
// to the children.
export interface PaginationProps {
    nextPage: () => void;
    prevPage: () => void;
    gotoPage: (pageNumber: number) => void;
    pageData: any[];
    currentPage: number;
    totalPages: number;
} 

// Props for the action <Pagination /> element
export interface PaginatiorProps {
    data: any[];
    children: (props: PaginationProps) => ReactElement;
    pageSize: number;
};

export function Pagination({data, children, pageSize}: PaginatiorProps) {
    const [pageData, currentPage, totalPages, setPage]: PaginationHook = usePagination(data, pageSize);

    const nextPage = useCallback(() => {
        if (currentPage < totalPages - 1) setPage(currentPage + 1); 
    }, [currentPage, totalPages, setPage]);
    const prevPage = useCallback(() => {
        if (currentPage > 0) setPage(currentPage - 1);
    }, [currentPage, setPage]);
    const gotoPage = useCallback((pageNumber: number) => {
        if (pageNumber >= 0 && pageNumber <= totalPages - 1) setPage(pageNumber);
    }, [totalPages, setPage]);

    return children({
        nextPage,
        prevPage,
        gotoPage,
        pageData,
        currentPage,
        totalPages
    });
}
