import React, {ReactNode, Children, useState} from "react";
import {Page} from './page';

import {BookWrapper} from './elements';

interface ChildrenProps {
    title: string;
}

interface BookProps {
    children: ReactNode;
}

export function Book({children}: BookProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const indexAwareChildren = Children.map(children, (child, index) => {
        if (!React.isValidElement<ChildrenProps>((child))) return null;

        const {title} = child.props;
        return (
            <Page 
                title={title ?? 'No title'}
                index={index}
                activeIndex={activeIndex}
                onClickTitle={() => void setActiveIndex(index)}
            >
                {React.cloneElement(child as React.ReactElement<any>, {nextPage: () => setActiveIndex(index + 1)})}
            </Page>
        );
    });

    return (
        <BookWrapper>
            {indexAwareChildren}
        </BookWrapper>
    );
}
