import { IPageComponent } from "../../components/Book";
import { Spinner } from "../../components/Spinner";

import {
    MatchesWrapper
} from './elements';

interface MatchViewProps extends IPageComponent {}

export function MatchesView({nextPage, pageContext}: MatchViewProps) {
    return (
        <MatchesWrapper>
            <Spinner onClick={nextPage}/>
            <p>{pageContext.message}</p>
        </MatchesWrapper>
    );
}
