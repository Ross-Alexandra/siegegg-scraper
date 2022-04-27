import styled from "@emotion/styled";
import {keyframes} from '@emotion/react';

export const SpinAnimation = keyframes`
    from {
        transform: translate(12.5px, 12.5px) rotate(0deg);
        stroke-dashoffset: 5;
    }

    25% {
        stroke-dashoffset: 57;
    }

    33% {
        transform: translate(12.5px, 12.5px) rotate(120deg);
    }

    50% {
        stroke-dashoffset: 5;
    }

    66% {
        transform: translate(12.5px, 12.5px) rotate(240deg);
    }

    75% {
        stroke-dashoffset: 57;
    }
    
    to {
        transform: translate(12.5px, 12.5px) rotate(360deg);
        stroke-dashoffset: 5;
    }
`;

export const SpinningGroup = styled.g`
    animation: ${SpinAnimation} 2.5s ease infinite;
    animation-fill-mode: both;
    stroke-dasharray: 62;
    stroke-dashoffset: 124;

    transform: translate(12.5px, 12.5px);
`;