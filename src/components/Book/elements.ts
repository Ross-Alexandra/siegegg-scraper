import styled from "@emotion/styled";
import { theme } from "../../theme";

export const BookWrapper = styled.div`
    position: relative;

    width: 100vw;
    height: 100vh;

    overflow: hidden;
`;

const pageEndWidth = 40;
const pageEndBorderWidth = 2;

interface PositionAwareProps {
    index: number;
    activeIndex: number;
}

interface IndexAwareProps {
    index: number;
}

export const PageWrapper = styled.div<PositionAwareProps>`
    position: absolute;
    top: 0px;
    left: ${({index, activeIndex}: PositionAwareProps) => {
        if (index > activeIndex) return '100vw';
        else return `${index * (pageEndWidth)}px`;
    }};

    height: 100vh;
    width: ${({index}: PositionAwareProps) => `calc(100vw - ${index * pageEndWidth}px)`};
    transition: left 300ms;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const PageTitleBox = styled.div<PositionAwareProps>`
    width: ${pageEndWidth}px;
    height: 100vh;
    border-right: ${({index}: PositionAwareProps) => index === 0 ? 0 : pageEndBorderWidth}px solid ${theme.white};

    display: grid;
    place-items: center;

    background-color: ${theme.darkBlue};
    cursor: ${({index, activeIndex}: PositionAwareProps) => index < activeIndex ? 'pointer' : 'default' };
    
    transform: rotate(-180deg);
`;

export const PageTitle = styled.h2`
    font-family: 'Stencil Std';
    font-size: 30px;
    font-weight: 700;
    text-transform: uppercase;
    font-style: italic;

    color: ${theme.white};

    writing-mode: vertical-rl;
    text-orientation: mixed;

    margin: unset;
    padding: unset;
`;

export const PageBody = styled.div<IndexAwareProps>`
    width: ${({index}: IndexAwareProps) => `calc(100vw - ${pageEndWidth * (index + 1)}px)`};
    height: 100vh;
`;