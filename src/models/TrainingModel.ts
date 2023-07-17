export interface ITrainingModel {
  getNewWord(): string | undefined;
  incrementQuestionNumber(): void;
  getTrainingInfo(): { currentQuestion: number; totalQuestion: number };
}
export class TrainingModel implements ITrainingModel {

}
