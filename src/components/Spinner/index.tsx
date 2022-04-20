import { SpinningGroup } from "./elements";

interface Props {
    color?: string;
    width?: number | string;
    height?: number | string;
    className?: string
}

export function Spinner({color='black', width, height, className}: Props) {
    return (
        <svg className={className} width={width} height={height} viewBox="0 0 25 25">
            <SpinningGroup stroke={color} strokeWidth="2">
                <path d="M-7-7A9.9 9.9 0 0 1 7 7A9.9 9.9 0 0 1 -7 -7" fill="none"/>
            </SpinningGroup>
        </svg>
    );
}