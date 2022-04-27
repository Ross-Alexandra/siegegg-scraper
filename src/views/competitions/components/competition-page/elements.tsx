import styled from "@emotion/styled";
import { theme } from "../../../../theme";
import { PaginationButtons } from "../../../../components/pagination/view";

export const Competitions = styled.div`
    width: 90%;
    height: 100%;
    padding: 5px 5%;
    border: 2px solid ${theme.black};

    position: relative;
    display: grid;
    place-items: center;
    gap: 10px;

    grid-template-columns: repeat(2, calc(50% - 5px));
    grid-template-rows: repeat(4, calc(25% - 20px)) 40px;
`;

export const StyledPaginationButtons = styled(PaginationButtons)`
    position: absolute;
    left: 20%;
    width: 60%;
    bottom: 0px;
    height: 40px;
`;
