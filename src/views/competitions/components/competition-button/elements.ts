import styled from "@emotion/styled";
import { theme } from "../../../../theme";

interface ViewProps {
    logoUrl: string;
}

export const ViewWrapper = styled.div<ViewProps>`
    display: grid;
    place-items: center;

    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 2px solid ${theme.black};

    background-color: ${theme.darkBlue};
    background-image: ${({logoUrl}: ViewProps) => `url('${logoUrl}')`};
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 60px 60px;
    
    cursor: pointer;
    :hover {
        background-color: ${theme.primary};
        border-color: ${theme.primary};
    }
`;

export const CompetitionText = styled.h3`
    color: ${theme.white};
    font-weight: 800;
    font-size: 22px;
    -webkit-text-stroke: 1px ${theme.darkBlue};
    text-stroke: 1px ${theme.darkBlue};

    margin: unset;
`;
