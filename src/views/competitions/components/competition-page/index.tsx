import { CompetitionButton } from "../../components/competition-button";
import { PaginationProps } from "../../../../components/pagination";
import { TNextPageCallback } from "../../../../components/book";

import { 
    Competitions,
    StyledPaginationButtons,
} from './elements';


export interface CompetitionPageProps extends PaginationProps {
    nextBookPage?: TNextPageCallback;
}

export function CompetitionsPage({nextBookPage, nextPage, prevPage, gotoPage, pageData, currentPage, totalPages}: CompetitionPageProps) { 
    return (
        <Competitions>
            {pageData.map(competition => 
                <CompetitionButton
                    key={competition.url}
                    onClick={() => nextBookPage?.({competition: competition.name})}
                    {...competition}
                />
            )}
            <StyledPaginationButtons nextPage={nextPage} prevPage={prevPage} gotoPage={gotoPage} currentPage={currentPage} totalPages={totalPages} pageData={pageData} />
        </Competitions>
    );
}