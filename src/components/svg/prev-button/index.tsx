import { ISVG } from "../interface";
import { ButtonSVG } from './elements';

export function PrevButton({height, width, color, ...props}: ISVG) {
    return (
        <ButtonSVG {...props as any} height={height} width={width} color={color} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z"/>
        </ButtonSVG>
    );
}
