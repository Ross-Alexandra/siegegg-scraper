import styled from "@emotion/styled";
import { theme } from "../../theme";

interface OngoingAware {
    ongoingOnly: boolean;
}

export const ViewWrapper = styled.div`
    width: calc(100% - 60px);
    height: calc(100% - 30px);
    padding: 15px 30px 15px 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${theme.white};
`;

export const Title = styled.h2`
    margin: 0px 0px 10px 0px;

    font-size: 32px;
    font-weight: 700;
    font-color: ${theme.black};
    text-transform: uppercase;
`;

export const ControlsRow = styled.div`    
    width: 100%;
    height: 40px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const SpinnerWrapper = styled.div`
    width: 90%;
    height: 100%;
    padding: 5px 5%;
    border: 2px solid ${theme.black};

    display: grid;
    place-items: center;
`;

export const OngoingSelector = styled.div<OngoingAware>`
    display: grid;
    place-items: center;

    width: 125px;
    height: 25px;

    user-select: none;
    cursor: pointer;

    font-weight: 700;
    text-transform: uppercase;
    font-size: 14px;

    ${({ongoingOnly}: OngoingAware) => ongoingOnly ? `
        border: 1px solid ${theme.darkBlue};
        background-color: ${theme.white};
        color: ${theme.darkBlue};
        :hover {
            border-color: ${theme.primary};
            color: ${theme.primary};
        }
    ` : `
        border: 1px solid ${theme.white};
        background-color: ${theme.darkBlue};
        color: ${theme.white};
        :hover {
            background-color: ${theme.primary};
            color: black;
        }
    `}
`;
