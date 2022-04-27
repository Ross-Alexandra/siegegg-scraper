import axios from 'axios';
import * as cheerio from 'cheerio';

import {
    ICompetition, ITeam, IMatch
} from '../common-interfaces';

export async function scrapeTotalPages(paginatedURL: string): Promise<number> {
    const {data: frontPage} = await axios.get(paginatedURL);
    const $ = cheerio.load(frontPage);

    const paginationElements = $(".pagination");
    return parseInt(paginationElements?.find?.('li')?.eq?.(-2)?.text?.() || '1');
} 

export async function scrapeCompetitions(url: string): Promise<ICompetition[]> {
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

export async function scrapeTeams(competitionUrl: string): Promise<ITeam[]> {
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
}

export async function scrapeMatchUrls(pageOfMatches: string): Promise<string[]> {
    const {data: pageHtml} = await axios.get(pageOfMatches);
    const $page = cheerio.load(pageHtml);

    const matchAnchors = $page('a.match');
    return matchAnchors.map((index, element) => {
        return $page(element).attr('href')?.toString() ?? '';
    }).toArray();
}

function scrapeMatchBansByTeamName($: cheerio.CheerioAPI, teamName: string): string[] {
    return $(`img[alt$="${teamName}"]`).map((index, element) => {
        return $(element).parent().parent().parent().find('a').text().toString();
    }).toArray();
}

function scrapeMatchTeamScoreByIndex($: cheerio.CheerioAPI, index: number): number {
    return parseInt($('.match__score').eq(index).text());
}

function scrapeMatchTeamNameByIndex($: cheerio.CheerioAPI, index: number): string {
    return $('.match__name').eq(index).text().toString().trim();
}

function scrapeMatchDeciderMap($: cheerio.CheerioAPI): string {
    return $('div:contains("Decider")').eq(-1).parent().parent().parent().find('a').text().toString().trim();
}

function scrapeMatchOperatorBansByTeamName($: cheerio.CheerioAPI, teamName: string): string[] {
    const operatorBanSpans = $('.ban__op__text').toArray();

    return operatorBanSpans.reduce((acc: string[], element) => {
        if ($(element).find('.ban__op__team').text().toString().trim() === teamName) {
            const operatorName = $(element).find('a').text().toString().trim();
            acc.push(operatorName);
        } 
        
        return acc;
    }, []);
}

function scrapeMatchAttackScoreByIndex($: cheerio.CheerioAPI, index: number): number {
    return parseInt($('.side--defend').eq(index).text().toString().trim());
}

function scrapeMatchDefenseScoreByIndex($: cheerio.CheerioAPI, index: number): number {
    return parseInt($('.side--attack').eq(index).text().toString());
}

function scrapeMatchCommunityPredictionByIndex($: cheerio.CheerioAPI, index: number): number {
    return parseInt($('.predict__graph__text').eq(index).text().toString()) / 100;
}

export async function scrapeMatch(matchUrl: string): Promise<IMatch> {
    const {data: matchPage} = await axios.get(matchUrl);
    const $matchPage = cheerio.load(matchPage);
    
    const teams = [scrapeMatchTeamNameByIndex($matchPage, 0), scrapeMatchTeamNameByIndex($matchPage, 1)];
    const scores = [scrapeMatchTeamScoreByIndex($matchPage, 0), scrapeMatchTeamScoreByIndex($matchPage, 1)];

    const teamOneBans = scrapeMatchBansByTeamName($matchPage, teams[0]);
    const teamTwoBans = scrapeMatchBansByTeamName($matchPage, teams[1]);
    const deciderMap = scrapeMatchDeciderMap($matchPage);

    const teamOneOperatorBans = scrapeMatchOperatorBansByTeamName($matchPage, teams[0]);
    const teamTwoOperatorBans = scrapeMatchOperatorBansByTeamName($matchPage, teams[1]);

    const teamOneAttackScore = scrapeMatchAttackScoreByIndex($matchPage, 0);
    const teamOneDefenseScore = scrapeMatchDefenseScoreByIndex($matchPage, 0);
    const teamTwoAttackScore = scrapeMatchAttackScoreByIndex($matchPage, 1);
    const teamTwoDefenseScore = scrapeMatchDefenseScoreByIndex($matchPage, 1);

    const teamOneCommunityPrediction = scrapeMatchCommunityPredictionByIndex($matchPage, 0);
    const teamTwoCommunityPrediction = scrapeMatchCommunityPredictionByIndex($matchPage, 1);
    
    return {
        matchUrl,
        victorIndex: scores[0] > scores[1] ? 0 : 1,
        deciderMap: deciderMap,
        completed: !isNaN(scores[0]),
        matchesResults: [{
            team: teams[0],
            mapBans: teamOneBans,
            operatorBans: teamOneOperatorBans,
            score: scores[0],
            attackScore: teamOneAttackScore,
            defenseScore: teamOneDefenseScore,
            communityPrediction: teamOneCommunityPrediction
        },
        {
            team: teams[1],
            mapBans: teamTwoBans,
            operatorBans: teamTwoOperatorBans,
            score: scores[1],
            attackScore: teamTwoAttackScore,
            defenseScore: teamTwoDefenseScore,
            communityPrediction: teamTwoCommunityPrediction
        }]
    };
}
