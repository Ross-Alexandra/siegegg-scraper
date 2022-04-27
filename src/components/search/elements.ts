import styled from "@emotion/styled";
import { theme } from "../../theme";
import { SearchIcon } from "../svg/search-icon";

export const SearchWrapper = styled.div`
    position: relative;
    height: 25px;
    width: 200px;

    border: 1px solid ${theme.black};
`;

export const SearchInput = styled.input`
    width: calc(100% - 25px - 4px);
    height: calc(100% - 2px);
    padding-left: 25px;

    border: unset;
    margin: unset;
    appearance: none;
    outline: none
`;

export const StyledSearchIcon = styled(SearchIcon)`
    position: absolute;
    left: 5px;
    top: 50%;

    transform: translate(0px, -50%);

    cursor: text;
`;