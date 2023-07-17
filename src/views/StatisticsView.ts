const namesMap: { [key: string]: string } = {
  wordsWithoutErrors: "Words assembled without errors",
  errors: "Total errors",
  wordWithMaxErrors: "Word with the most errors",
};

export type StatisticDTO = {
  wordsWithoutErrors: number;
  errors: number;
  wordWithMaxErrors: string;
};
export interface IStatisticsView {
  updateStatistics(statistics: StatisticDTO): void;
}

export class StatisticsView implements IStatisticsView {
  private readonly containerId: string;
  private statistics: StatisticDTO;

  constructor(containerId: string = "statistics") {
    this.statistics = {
      wordsWithoutErrors: 0,
      errors: 0,
      wordWithMaxErrors: "",
    };
    this.containerId = containerId;
  }

  public updateStatistics(statistics: StatisticDTO) {
    this.statistics = statistics;
    this.renderStatistics();
  }

  private renderStatistics() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      throw new Error("Failed to get a div with id statistics");
    }

    Object.entries(this.statistics).forEach(([key, value]) => {
      const paragraph = document.createElement("p");
      paragraph.className = "mb-1";
      paragraph.textContent = value !== "" ? `${namesMap[key]}: ${value}` : "";
      container.appendChild(paragraph);
    });
  }
}
