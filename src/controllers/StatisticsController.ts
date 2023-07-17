import { IStatisticsModel } from "../models";
import { IStatisticsView } from "../views";
import { Statistics } from "../types";

export interface IStatisticsController {
  updateStatistics(statistics: Statistics): void;
  showStatistics(): void;
}

export class StatisticsController implements IStatisticsController {
  private statisticsModel: IStatisticsModel;
  private statisticsView: IStatisticsView;

  constructor(
      statisticsModel: IStatisticsModel,
      statisticsView: IStatisticsView,
  ) {
    this.statisticsModel = statisticsModel;
    this.statisticsView = statisticsView;
  }

  public updateStatistics(statistics: Statistics) {
    this.statisticsModel.updateStatistics(statistics);
  }

  public showStatistics() {
    const statistics = this.statisticsModel.getStatistics();
    this.statisticsView.updateStatistics({
      wordsWithoutErrors: statistics.wordsAmountWithoutErrors,
      wordWithMaxErrors: statistics.wordWithMaxErrors,
      errors: statistics.errorsAmount,
    });
  }
}
