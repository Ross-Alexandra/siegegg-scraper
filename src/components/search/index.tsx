import { theme } from "../../theme";
import { useSearch, ISearch } from './hook';

import {
    SearchWrapper,
    SearchInput,
    StyledSearchIcon
} from './elements';
import { useEffect } from "react";

export interface SearchProps extends React.HTMLAttributes<HTMLInputElement> {
    searchData: ISearch[];
    setMatches: (matches: any[]) => void;
};

export function Search({searchData, setMatches, className, ...props}: SearchProps) {
    const [matchingData, setCurrentSearch] = useSearch(searchData);
    useEffect(() => {
        setMatches(matchingData.map(({data}) => data));
    }, [matchingData, setMatches]);

    return (
        <SearchWrapper className={className}>
            <SearchInput onChange={(event) => {
                const nextSearchTerm = event.target.value;
                setCurrentSearch(nextSearchTerm);
            }} {...props} />
            <StyledSearchIcon width={20} height={20} color={theme.grey} />
        </SearchWrapper>
    );
}
