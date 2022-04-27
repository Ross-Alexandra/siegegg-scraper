import { theme } from "../../../theme";
import { ISVG } from "../interface";
import { SpinningGroup } from "./elements";

export function Spinner({color=theme.black, width=35, height=35, className, ...props}: ISVG) {
    return (
        <svg {...props as any} className={className} width={width} height={height} viewBox="0 0 25 25">
            <SpinningGroup stroke={color} strokeWidth="2">
                <path d="M-7-7A9.9 9.9 0 0 1 7 7A9.9 9.9 0 0 1 -7 -7" fill="none"/>
            </SpinningGroup>
        </svg>
    );
}