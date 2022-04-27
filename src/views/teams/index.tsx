import { IPageComponent } from "../../components/book";
import { Spinner } from "../../components/svg/spinner";

import {
    TeamsWrapper
} from './elements';

interface TeamsViewProps extends IPageComponent {}

export function TeamsView({nextPage, pageContext}: TeamsViewProps) {
    return (
        <TeamsWrapper>
            <Spinner onClick={() => nextPage?.({message: 'also hello'})}/>
            <p>{pageContext.message}</p>
        </TeamsWrapper>
    );
}
