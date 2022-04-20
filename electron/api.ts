import { ipcRenderer } from "electron";
import axios from "axios";
import * as cheerio from 'cheerio';

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
        const {data: frontPage} = await axios.get(baseUrl);
        const $frontPage = cheerio.load(frontPage);

        const paginationElements = $frontPage(".pagination");
        const lastPage = parseInt(paginationElements?.find?.('li')?.eq?.(-2)?.text?.() || '1');

        async function scrapeCompetitions(url: string): Promise<ICompetition[]> {
            const {data: pageHtml} = await axios.get(url);
            const $page = cheerio.load(pageHtml);

            const competitions = $page(".card");
            return competitions.map((index, element) => {
                return {
                    logoUrl: $page(element)?.find('img')?.attr('src')?.toString() ?? '',
                    name: $page(element)?.find('h3')?.text()?.toString() ?? '',
                    url: $page(element)?.attr('href')?.toString() ?? ''
                };
            }).toArray();
        }

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
        const {data: teamPage} = await axios.get(`${competitionUrl}?stats=full-stats`);
        const $teamPage = cheerio.load(teamPage);

        const teamCards = $teamPage('*:contains("Participating teams")').closest('section').find('.card');
        return teamCards.map((index, element) => {
            const cardText = $teamPage(element).text();

            // .text() will return =>
            // "    Team Name     player1      player2 ...   "
            // Get team name by trimming, finding the first 2+ whitespace, and trim
            // Get roster by removing team name, turning 2+ whitespaces into ' ', and drop initial ''.
            const teamName = cardText.trim().match(/.*?(\s\s+)/g)?.[0]?.trim() ?? 'Error Parsing Team';
            const roster = cardText.trim().replace(teamName, '').replace(/\s\s+/g, ' ').split(' ').slice(1);

            return {
                logoUrl: $teamPage(element)?.find('img[src$=".png"]')?.attr('src')?.toString() ?? '',
                name: teamName,
                roster: roster,
                url: `https://siege.gg${$teamPage(element).find('a').attr('href')?.toString() ?? ''}`
            };
        }).toArray();
    },
    handle: async (competitionUrl: string) => {
        return await ipcRenderer.invoke('getTeams', competitionUrl);
    }
}
