export interface ITaskModel {
  getShuffleWord(): string[];
  getAssembledWord(): string[];
  getOriginWord(): string;
  getErrorsCount(): number;
  incrementErrorCount(): void;
  isCorrectLetter(letter: string, index: number): boolean;
  isWordComplete(): boolean;
}

export class TaskModel implements ITaskModel {

}
