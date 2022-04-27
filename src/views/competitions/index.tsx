import { useCallback, useEffect, useState } from "react";
import { useApiData, ApiDataState } from "../../hooks";

import {ICompetition} from "../../../common-interfaces";

import { Spinner } from "../../components/svg/spinner";
import { IPageComponent } from "../../components/book";
import { Pagination } from "../../components/pagination";
import { CompetitionsPage } from "./components/competition-page";
import { Search } from "../../components/search";

import {
    ViewWrapper,
    Title,
    ControlsRow,
    SpinnerWrapper,
    OngoingSelector,
} from './elements';

interface CompetitionViewProps extends IPageComponent {}

export function CompetitionView({nextPage}: CompetitionViewProps) {
    const [ongoingOnly, setOngoingOnly] = useState(true);
    const [searchMatchedCompetitions, setSearchMatchedCompetitions] = useState([] as ICompetition[]);

    const getCompetitions = useCallback(async () => {
        return await window.api.getCompetitions(ongoingOnly);
    }, [ongoingOnly]);
    const [competitions, competitionsState]: [ICompetition[], ApiDataState, any] = useApiData(getCompetitions, []);

    useEffect(() => {
        if (competitionsState === 'ready') {
            setSearchMatchedCompetitions(competitions);
        }
    }, [competitions, competitionsState]);

    return (
        <ViewWrapper>
            <Title>Select a Competition</Title>
            <ControlsRow>
                <OngoingSelector onClick={() => setOngoingOnly(!ongoingOnly)} ongoingOnly={ongoingOnly}>
                    {ongoingOnly ? 'Ongoing Only' : 'All'}
                </OngoingSelector>
                <Search 
                    searchData={competitions?.map(competition => {return {data: competition, searchTerm: competition.name}}) ?? []}
                    setMatches={setSearchMatchedCompetitions}
                />
            </ControlsRow>
            {
                competitionsState === "ready" ? (
                    <Pagination data={searchMatchedCompetitions} pageSize={8}>
                        {(props) => <CompetitionsPage {...props} nextBookPage={nextPage}/>}
                    </Pagination>
                ) : (
                    <SpinnerWrapper><Spinner /></SpinnerWrapper>
                ) 
            }
        </ViewWrapper>
    );
}
