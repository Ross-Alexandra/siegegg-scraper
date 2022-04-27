import { ICompetition } from "../../../../../common-interfaces";
import { TNextPageCallback } from "../../../../components/book";
import { CompetitionText, ViewWrapper } from "./elements";

interface Props extends ICompetition {
    onClick: TNextPageCallback;
}

export function CompetitionButton({logoUrl, name, onClick}: Props) {
    return (
        <ViewWrapper logoUrl={logoUrl} onClick={onClick}>
            <CompetitionText>{name}</CompetitionText>
        </ViewWrapper>
    );
}