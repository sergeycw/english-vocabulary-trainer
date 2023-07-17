export interface ITrainingInfoView {
  updateTrainingInfo(currentQuestion: number, totalQuestions: number): void;
}

export class TrainingInfoView implements ITrainingInfoView {
  private currentQuestion: number;
  private totalQuestions: number;

  constructor() {
    this.currentQuestion = 0;
    this.totalQuestions = 0;
  }

  public updateTrainingInfo(currentQuestion: number, totalQuestions: number) {
    this.currentQuestion = currentQuestion;
    this.totalQuestions = totalQuestions;

    this.renderTrainingInfo();
  }

  private renderTrainingInfo() {
    const currentQuestion = document.getElementById("current_question");
    const totalQuestions = document.getElementById("total_questions");
    if (!currentQuestion || !totalQuestions) {
      throw new Error(
          "Failed to get a div with id current_question or total_questions",
      );
    }

    currentQuestion.textContent = String(this.currentQuestion);
    totalQuestions.textContent = String(this.totalQuestions);
  }
}
