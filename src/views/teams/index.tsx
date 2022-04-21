import { IPageComponent } from "../../components/Book";
import { Spinner } from "../../components/Spinner";

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
