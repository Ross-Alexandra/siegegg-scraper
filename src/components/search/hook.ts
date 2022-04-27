import { useEffect, useState } from "react";

export interface ISearch {
    searchTerm: string;
    data: any;
}

export type SearchHook = [any[], (newSearch: string) => void]; 

export function useSearch(search: ISearch[]): SearchHook {
    const [matchingData, setMatchingData] = useState(search);
    const [currentSearch, setCurrentSearch] = useState("");

    useEffect(() => {
        if (currentSearch.length === 0) setMatchingData(search);
        else setMatchingData(search.filter(({searchTerm}) => searchTerm.toLowerCase().includes(currentSearch.toLowerCase())));
    }, [currentSearch, search, setMatchingData]);

    return [
        matchingData,
        setCurrentSearch
    ];
}