import { IPageComponent } from "../../components/Book";
import { Spinner } from "../../components/Spinner";

import {
    CompetitionWrapper
} from './elements';

interface CompetitionViewProps extends IPageComponent {}

export function CompetitionView({nextPage}: CompetitionViewProps) {
    return (
        <CompetitionWrapper>
            <Spinner onClick={() => nextPage?.({message: 'hello'})}/>
        </CompetitionWrapper>
    );
}
