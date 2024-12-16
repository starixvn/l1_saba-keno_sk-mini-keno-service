import {
    rounds as getRoundRepository,
    betlogs as getBetLogsRepository,
    bets as getBetRepository,
    tempBets as getTempBetRepository,
    result as getResultRepository,
    allGamesHistoriesModel,
} from "./models";
import SettlementRules from "./settlementRules";
import generateResult from "./shuffleNumbers";
import { generateRawResultForHash } from "./result-helper";

const choices = ["big", "small", "odd", "even", "gold", "wood", "water", "fire", "earth"];
const choicesMapper = { big: 1, small: 2, odd: 3, even: 4, gold: 5, wood: 6, water: 7, fire: 6, earth: 7 };
export const hedgeBetGroups = [
    ["big", "small"],
    ["even", "odd"],
];

const allGamesBetsRepository = allGamesHistoriesModel("megakeno_histories");

const kenoDirectionDurations = {
    wholeRound: 43,
    placingBets: 30,
    lockingBet: 5,
};

const fullGenerateResult = (randomMode) => generateResult(randomMode, 20, 80);
const miniGenerateResult = (randomMode) => generateResult(randomMode, 10, 40);

function generateGameSetting(id, name, durations, settle, generateResult) {
    return {
        id,
        name,
        durations,
        choices,
        choicesMapper,
        hedgeBetGroups,
        defaultBetTracks: {},
        settle,
        generateResult,
        generateRawResultForHash,
    };
}

export default [
    {
        ...generateGameSetting(
            1501,
            "MegaKeno",
            {
                wholeRound: 58,
                placingBets: 45,
                lockingBet: 5,
            },
            SettlementRules.full,
            fullGenerateResult
        ),
        repositories: {
            roundsRepository: getRoundRepository("MegaKeno_rounds"),
            betsRepository: getBetRepository("MegaKeno_bets"),
            betLogsRepository: getBetLogsRepository("MegaKeno_betlogs"),
            resultsRepository: getResultRepository("MegaKeno_result"),
            tempBetsRepository: getTempBetRepository("MegaKeno_tmpbets"),
            allGamesBetsRepository,
        },
    },
    {
        ...generateGameSetting(
            1502,
            "MegaKeno2",
            {
                wholeRound: 43,
                placingBets: 30,
                lockingBet: 5,
            },
            SettlementRules.full,
            fullGenerateResult
        ),
        repositories: {
            allGamesBetsRepository,
            roundsRepository: getRoundRepository("MegaKeno2_rounds"),
            betsRepository: getBetRepository("MegaKeno2_bets"),
            betLogsRepository: getBetLogsRepository("MegaKeno2_betlogs"),
            resultsRepository: getResultRepository("MegaKeno2_result"),
            tempBetsRepository: getTempBetRepository("MegaKeno2_tmpbets"),
        },
    },
    {
        ...generateGameSetting(
            1503,
            "KenoMini",
            {
                wholeRound: 51,
                placingBets: 40,
                lockingBet: 5,
            },
            SettlementRules.mini,
            miniGenerateResult
        ),
        repositories: {
            roundsRepository: getRoundRepository("KenoMini_rounds"),
            betsRepository: getBetRepository("KenoMini_bets"),
            betLogsRepository: getBetLogsRepository("KenoMini_betlogs"),
            resultsRepository: getResultRepository("KenoMini_result"),
            tempBetsRepository: getTempBetRepository("KenoMini_tmpbets"),
            allGamesBetsRepository,
        },
    },
    {
        ...generateGameSetting(
            1504,
            "KenoMini2",
            {
                wholeRound: 41,
                placingBets: 30,
                lockingBet: 5,
            },
            SettlementRules.mini,
            miniGenerateResult
        ),
        repositories: {
            roundsRepository: getRoundRepository("KenoMini2_rounds"),
            betsRepository: getBetRepository("KenoMini2_bets"),
            betLogsRepository: getBetLogsRepository("KenoMini2_betlogs"),
            resultsRepository: getResultRepository("KenoMini2_result"),
            tempBetsRepository: getTempBetRepository("KenoMini2_tmpbets"),
            allGamesBetsRepository,
        },
    },
    {
        ...generateGameSetting(1505, "KenoEast", kenoDirectionDurations, SettlementRules.full, fullGenerateResult),
        repositories: {
            roundsRepository: getRoundRepository("KenoEast_rounds"),
            betsRepository: getBetRepository("KenoEast_bets"),
            betLogsRepository: getBetLogsRepository("KenoEast_betlogs"),
            resultsRepository: getResultRepository("KenoEast_result"),
            tempBetsRepository: getTempBetRepository("KenoEast_tmpbets"),
            allGamesBetsRepository,
        },
    },
    {
        ...generateGameSetting(1506, "KenoWest", kenoDirectionDurations, SettlementRules.full, fullGenerateResult),
        repositories: {
            allGamesBetsRepository,
            roundsRepository: getRoundRepository("KenoWest_rounds"),
            betsRepository: getBetRepository("KenoWest_bets"),
            betLogsRepository: getBetLogsRepository("KenoWest_betlogs"),
            resultsRepository: getResultRepository("KenoWest_result"),
            tempBetsRepository: getTempBetRepository("KenoWest_tmpbets"),
        },
    },
    {
        ...generateGameSetting(1507, "KenoSouth", kenoDirectionDurations, SettlementRules.full, fullGenerateResult),
        repositories: {
            roundsRepository: getRoundRepository("KenoSouth_rounds"),
            betsRepository: getBetRepository("KenoSouth_bets"),
            betLogsRepository: getBetLogsRepository("KenoSouth_betlogs"),
            resultsRepository: getResultRepository("KenoSouth_result"),
            tempBetsRepository: getTempBetRepository("KenoSouth_tmpbets"),
            allGamesBetsRepository,
        },
    },
    {
        ...generateGameSetting(1508, "KenoNorth", kenoDirectionDurations, SettlementRules.full, fullGenerateResult),
        repositories: {
            roundsRepository: getRoundRepository("KenoNorth_rounds"),
            betsRepository: getBetRepository("KenoNorth_bets"),
            betLogsRepository: getBetLogsRepository("KenoNorth_betlogs"),
            resultsRepository: getResultRepository("KenoNorth_result"),
            tempBetsRepository: getTempBetRepository("KenoNorth_tmpbets"),
            allGamesBetsRepository,
        },
    },
];
