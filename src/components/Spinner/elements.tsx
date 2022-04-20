import styled from "@emotion/styled";
import {keyframes} from '@emotion/react';

export const SpinAnimation = keyframes`
    from {
        transform: translate(12.5px, 12.5px) rotate(0deg);
        stroke-dashoffset: 0;
    }

    25% {
        stroke-dashoffset: 60;
    }

    50% {
        stroke-dashoffset: 0;
        transform: translate(12.5px, 12.5px) rotate(180deg);
    }

    75% {
        stroke-dashoffset: 60;
    }
    
    to {
        transform: translate(12.5px, 12.5px) rotate(360deg);
        stroke-dashoffset: 0;
    }
`;

export const SpinningGroup = styled.g`
    animation: ${SpinAnimation} 2.5s ease infinite;
    animation-fill-mode: both;
    stroke-dasharray: 62;
    stroke-dashoffset: 124;

    transform: translate(12.5px, 12.5px);
`;