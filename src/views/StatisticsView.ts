export type StatisticDTO = {
  wordsWithoutErrors: number;
  errors: number;
  wordWithMaxErrors: string;
};
export interface IStatisticsView {
  updateStatistics(statistics: StatisticDTO): void;
}

export class StatisticsView implements IStatisticsView {

}
