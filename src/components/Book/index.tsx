import React, {ReactNode, Children, useState} from "react";
import {Page} from './page';

import {BookWrapper} from './elements';

interface BookProps {
    children: ReactNode;
}

export type TNextPageCallback = (...args: any[]) => void;
export type TPageContext = any;
export interface IPageComponent {
    // Consumed by the Book component.
    pageTitle: string;

    // Passed via magic from the Book component.
    pageContext?: TPageContext;
    nextPage?: TNextPageCallback;
}

export function Book({children}: BookProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [pageContexts, setPageContexts] = useState(Array(Children.count(children)).fill({}));

    const indexAwareChildren = Children.map(children, (child, index) => {
        if (!React.isValidElement<IPageComponent>((child))) return null;

        const {pageTitle} = child.props;
        const nextPage = (pageContext: any): void => {
            setPageContexts(previousPageContexts => {
                const newPageContexts = [...previousPageContexts];
                newPageContexts[index + 1] = pageContext;

                return newPageContexts;
            });
            setActiveIndex(index + 1);
        }
        return (
            <Page 
                title={pageTitle ?? 'No title'}
                index={index}
                activeIndex={activeIndex}
                onClickTitle={() => void setActiveIndex(index)}
            >
                {React.cloneElement(child as React.ReactElement<IPageComponent>, {nextPage, pageContext: pageContexts[index]})}
            </Page>
        );
    });

    return (
        <BookWrapper>
            {indexAwareChildren}
        </BookWrapper>
    );
}
