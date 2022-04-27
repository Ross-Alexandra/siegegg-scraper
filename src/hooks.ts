import { useEffect, useState } from "react";

export type ApiDataState = "loading" | "ready" | "error";
export type ApiData = [any, ApiDataState, any];

export function useApiData(apiCallback: Function, dataDefault?: any): ApiData {
    const [data, setData] = useState(dataDefault);
    const [loadingState, setLoadingState]: [ApiDataState, Function] = useState("loading");
    const [error, setError] = useState();

    useEffect(() => {
        let mounted = true;
        setLoadingState("loading");

        async function runCallback() {
            if (mounted) {
                try {
                    const queriedData = await apiCallback();
                    setData(queriedData);
                    setLoadingState("ready");
                } catch (err: any) {
                    setError(err);
                    setLoadingState("error");
                }
            }
        }

        runCallback();
        return () => {mounted = false};
    }, [apiCallback]);

    return [data, loadingState, error];
}
