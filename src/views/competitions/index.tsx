import { Spinner } from "../../components/Spinner";

import {
    CompetitionWrapper
} from './elements';

interface CompetitionViewProps {
    title: string;
    nextPage?: () => undefined; // Passed via magic from the Book component.
}

export function CompetitionView({nextPage}: CompetitionViewProps) {
    return (
        <CompetitionWrapper>
            <Spinner onClick={nextPage}/>
        </CompetitionWrapper>
    );
}
