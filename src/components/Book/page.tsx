import {
    PageWrapper,
    PageTitleBox,
    PageTitle,
    PageBody
} from './elements';

interface PageProps {
    index: number;
    activeIndex: number;
    title: string;
    onClickTitle: () => undefined;
    children: React.ReactNode;
}

export function Page({title, index, activeIndex, onClickTitle, children}: PageProps) {
    return (
        <PageWrapper index={index} activeIndex={activeIndex}>
            <PageTitleBox index={index} activeIndex={activeIndex} onClick={onClickTitle}>
                <PageTitle>{title}</PageTitle>
            </PageTitleBox>
            <PageBody index={index}>
                {children}
            </PageBody>
        </PageWrapper>
    );
}