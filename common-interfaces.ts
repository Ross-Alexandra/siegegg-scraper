export interface IApiFunction {
    execute: (...args: any[]) => Promise<any>;
    handle: (...args: any[]) => Promise<any>;
};

export interface ICompetition {
    logoUrl: string;
    name: string;
    url: string;
};

export interface ITeam {
    logoUrl: string,
    roster: string[],
    name: string,
    url: string;
};

export interface IMatchResult {
    team: string;
    mapBans: string[];
    operatorBans: string[];
    score: number;
    attackScore: number;
    defenseScore: number;
    communityPrediction: number;
};

export interface IMatch {
    matchUrl: string;
    victorIndex: number;
    deciderMap: string;
    completed: boolean;
    matchesResults: [IMatchResult, IMatchResult];
}
