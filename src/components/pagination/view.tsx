import React from "react";
import _ from 'lodash'

import { PaginationProps } from ".";
import { PrevButton } from "../svg/prev-button";
import { NextButton } from "../svg/next-button";

import { PaginationButtonWrapper, PaginationGotoButton } from "./elements";

export interface PaginationButtonProps extends React.HTMLAttributes<HTMLElement>, PaginationProps {
    visiblePageCount?: number;
}

export function PaginationButtons({currentPage, totalPages, prevPage, nextPage, gotoPage, visiblePageCount = 5, ...props}: PaginationButtonProps) {
    if (totalPages === 1) return null;
    
    const middlePageLimit = Math.ceil(visiblePageCount / 2);
    const middlePageMin = Math.floor(visiblePageCount / 2);

    const lastPageIndex = totalPages - 1;
    return (
        <PaginationButtonWrapper {...props}>
            { currentPage > 0 ? <PrevButton height={24} width={24} onClick={prevPage}/> : <div style={{width: 24, height: 24}}/> }
            <PaginationGotoButton clickable={currentPage !== 0} onClick={() => gotoPage(0)}>1</PaginationGotoButton>

            { totalPages > middlePageLimit && currentPage > middlePageLimit && <PaginationGotoButton clickable={false}>...</PaginationGotoButton> }
            { 
                _.range(currentPage - middlePageMin, currentPage + middlePageLimit) // Get the range of the {visiblePageCount} items
                 .map((pageIndex, ind, range) => range[0] > 1 ? pageIndex : pageIndex + Math.abs(range[0] - 1)) // If there are negative items, make the bottom index = 0
                 .map((pageIndex, ind, arr) => (arr[visiblePageCount - 1] - lastPageIndex) < 0 ? pageIndex : pageIndex - (arr[visiblePageCount - 1] - lastPageIndex + 1)) // If there are greater than {totalPages} items, make the top index = {lastPage}
                 .filter(pageIndex => pageIndex > 0 && pageIndex < totalPages)
                 .map((pageIndex) => 
                    <PaginationGotoButton clickable={currentPage !== pageIndex} onClick={() => gotoPage(pageIndex)}>{pageIndex + 1}</PaginationGotoButton>
                )
            }
            { totalPages > middlePageLimit && lastPageIndex - currentPage > middlePageLimit && <PaginationGotoButton clickable={false}>...</PaginationGotoButton>}

            { totalPages > 1 && <PaginationGotoButton clickable={currentPage !== lastPageIndex} onClick={() => gotoPage(lastPageIndex)}>{totalPages}</PaginationGotoButton> }
            { currentPage < lastPageIndex ? <NextButton height={24} width={24} onClick={nextPage}/> : <div style={{width: 24, height: 24}}/> }
        </PaginationButtonWrapper>
    );
}
