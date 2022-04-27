import { ISVG } from "../interface"
import {ButtonSVG} from './elements'

export function NextButton({height, width, color, ...props}: ISVG) {
    return (
        <ButtonSVG {...props as any} height={height} width={width} color={color} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 6L8.6 7.4 13.2 12l-4.6 4.6L10 18l6-6z"/>
        </ButtonSVG>
    );
}
