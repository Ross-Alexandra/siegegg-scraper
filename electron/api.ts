import { ipcRenderer } from "electron";
import { scrapeTotalPages, scrapeCompetitions, scrapeTeams, scrapeMatchUrls, scrapeMatch } from "./scrapers";

import {
    IApiFunction,
    ICompetition,
    ITeam,
    IMatch
} from './interfaces';

export const test: IApiFunction = {
    execute: async () => {
        return "API is working!"
    },
    handle: async () => {
        return await ipcRenderer.invoke('test');
    }
};

export const getCompetitions: IApiFunction = {
    execute: async (event, ongoing: boolean = true) => {
        const baseUrl = `https://siege.gg/competitions?${ongoing ? 'ongoing=1' : ''}`
        const lastPage = await scrapeTotalPages(baseUrl);

        const competitionPromises: Promise<ICompetition[]>[] = [];
        for (let i = lastPage; i > 0; i--) {
            competitionPromises.push(scrapeCompetitions(`${baseUrl}&page=${i}`));
        }
        
        const competitions = (await Promise.all(competitionPromises)).flat();
        return competitions.reverse();
    },
    handle: async (ongoing: boolean | undefined) => {
        return await ipcRenderer.invoke('getCompetitions', ongoing);
    }
}

export const getTeams: IApiFunction = {
    execute: async (event, competitionUrl: string): Promise<ITeam[]> => {
        return await scrapeTeams(competitionUrl);
    },
    handle: async (competitionUrl: string) => {
        return await ipcRenderer.invoke('getTeams', competitionUrl);
    }
}

export const getMatches: IApiFunction = {
    execute: async (event, {teamName, onlyCompleted}) => {
        const baseUrl = `https://siege.gg/matches?tab=results&team[]=${teamName.replace(' ', '+')}`;
        const lastPage = await scrapeTotalPages(baseUrl);

        const scrapedMatches: Promise<IMatch>[] = [];
        for (let i = lastPage; i > 0; i--) {
            const matchUrls = await scrapeMatchUrls(`${baseUrl}&page=${i}`);
            const matchPromises = matchUrls.map(matchUrl => scrapeMatch(matchUrl));
            scrapedMatches.push(...matchPromises);
        }

        const teamMatches = (await Promise.all(scrapedMatches)).reverse();
        if (onlyCompleted) return teamMatches.filter(({completed}) => completed);
        else return teamMatches;
    },
    handle: async (teamName: string, onlyCompleted: boolean = true) => {
        return await ipcRenderer.invoke('getMatches', {teamName, onlyCompleted});
    }
}
