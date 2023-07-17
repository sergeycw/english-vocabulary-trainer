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
  private statistics: Statistics[];

  constructor() {
    this.statistics = [];
  }

  public updateStatistics(statistics: Statistics) {
    this.statistics.push(statistics);
  }

  public getStatistics() {
    return {
      wordsAmountWithoutErrors: this.calculateWordsAmountWithoutErrors(),
      errorsAmount: this.calculateErrorsAmount(),
      wordWithMaxErrors: this.calculateWordWithMaxErrors(),
    };
  }

  private calculateWordsAmountWithoutErrors() {
    return this.statistics.reduce(
        (acc, curr) => (curr.errors === 0 ? acc + 1 : acc),
        0,
    );
  }

  private calculateErrorsAmount() {
    return this.statistics.reduce((acc, curr) => acc + curr.errors, 0);
  }

  private calculateWordWithMaxErrors() {
    return (
        this.statistics
            .filter((statistic) => statistic.errors > 0)
            .sort((a, b) => b.errors - a.errors)[0]?.word || ""
    );
  }
}
