import { ipcRenderer } from "electron";
import axios from "axios";
import * as cheerio from 'cheerio';

export interface IApiFunction {
    execute: (...args: any[]) => Promise<any>;
    handle: (...args: any[]) => Promise<any>;
}

export interface ICompetition {
    logoUrl: string;
    name: string;
    url: string;
}

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
                const name: string = $page(element)?.find('h3')?.text()?.toString() ?? '';
                const logoUrl: string = $page(element)?.find('img')?.attr('src')?.toString() ?? '';
                const url: string = $page(element)?.attr('href')?.toString() ?? '';

                return {logoUrl, name, url};
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
