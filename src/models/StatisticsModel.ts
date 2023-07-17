import { Statistics } from "../types";

export interface IStatisticsModel {
  updateStatistics(statistics: Statistics): void;
  getStatistics(): {
    wordsAmountWithoutErrors: number;
    errorsAmount: number;
    wordWithMaxErrors: string;
  };
}
export class StatisticsModel implements IStatisticsModel {

}
