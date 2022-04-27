import { IPageComponent } from "../../components/book";
import { Spinner } from "../../components/svg/spinner";

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
