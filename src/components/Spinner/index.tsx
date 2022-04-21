import { SpinningGroup } from "./elements";

interface Props extends React.HTMLAttributes<HTMLElement> {
    color?: string;
    width?: number | string;
    height?: number | string;
    className?: string
}

export function Spinner({color='black', width=35, height=35, className, ...props}: Props) {
    return (
        <svg {...props as any} className={className} width={width} height={height} viewBox="0 0 25 25">
            <SpinningGroup stroke={color} strokeWidth="2">
                <path d="M-7-7A9.9 9.9 0 0 1 7 7A9.9 9.9 0 0 1 -7 -7" fill="none"/>
            </SpinningGroup>
        </svg>
    );
}