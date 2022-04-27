import { useState, useMemo, useEffect } from "react";
import _ from 'lodash';

export type PaginationHook = [any[], number, number, (pageNumber: number) => void];

export function usePagination(data: any[], pageSize: number): PaginationHook {
    const [currentPage, setPage] = useState(0);
    
    const paginatedData = useMemo(() => {
        return _.chunk(data, pageSize);
    }, [data, pageSize]);

    const totalPages = paginatedData.length;
    useEffect(() => {
        setPage(0);
    }, [totalPages]);

    const currentPageData = paginatedData[currentPage] ?? [];
    return [currentPageData, currentPage, totalPages, setPage];
}
