import { Statistics } from "../types";

export interface IStatisticsController {
  updateStatistics(statistics: Statistics): void;
  showStatistics(): void;
}

export class StatisticsController implements IStatisticsController {

}
