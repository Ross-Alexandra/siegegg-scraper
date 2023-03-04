import { useCallback, useEffect, useState } from "react";
import { ITeam } from "../../../common-interfaces";
import { IPageComponent } from "../../components/book";
import { Spinner } from "../../components/svg/spinner";
import { ApiDataState, useApiData } from "../../hooks";

import {
    TeamsWrapper
} from './elements';

interface TeamsViewProps extends IPageComponent {}

export function TeamsView({nextPage, pageContext}: TeamsViewProps) {
    const [searchMatchedTeams, setSearchMatchedTeams] = useState([] as ITeam[]);

    const getTeams = useCallback(async () => {
        if (pageContext?.competition?.url) {
            return await window.api.getTeams(pageContext.competition.url);
        }
    }, [pageContext]);
    const [teams, teamsState]: [ITeam[], ApiDataState, any] = useApiData(getTeams, []);

    useEffect(() => {
        if (teamsState === 'ready') {
            setSearchMatchedTeams(teams);
        }
    }, [teams, teamsState]);

    return (
        <TeamsWrapper>
            <Spinner onClick={() => nextPage?.({message: 'also hello'})}/>
            <p>{pageContext?.competition?.name}</p>
            <p>{teams?.length} Teams</p>
        </TeamsWrapper>
    );
}
