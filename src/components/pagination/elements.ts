import styled from "@emotion/styled";
import { theme } from "../../theme";

interface ClickableAware {
    clickable: boolean;
}

export const PaginationButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

export const PaginationGotoButton = styled.p<ClickableAware>`
    margin: unset;
    padding: unset;
    width: 16px;

    font-size: 18px;
    font-weight: ${({clickable}) => clickable ? '400' : '700'};
    color: ${theme.grey};

    cursor: ${({clickable}) => clickable ? 'pointer' : 'default'};
`;