import { shuffleArray } from "../utils";

const TOTAL_QUESTIONS = 6;

export interface ITrainingModel {
  getNewWord(): string | undefined;
  incrementQuestionNumber(): void;
  getTrainingInfo(): { currentQuestion: number; totalQuestion: number };
}
export class TrainingModel implements ITrainingModel {
  private readonly words: string[] = [];
  private readonly info: { currentQuestion: number; totalQuestion: number };

  constructor(words: string[]) {
    const randomisedWords = this.getRandomWords(words, TOTAL_QUESTIONS);
    this.words = this.serialiseWords(randomisedWords);
    const totalQuestion =
        TOTAL_QUESTIONS < words.length ? TOTAL_QUESTIONS : words.length;
    this.info = { currentQuestion: 1, totalQuestion };
  }

  private serialiseWords = (words: string[]) => {
    return words.map((word) => word.toLowerCase());
  };

  private getRandomWords(wordList: string[], amount: number): string[] {
    const shuffledWords = shuffleArray(wordList);
    return shuffledWords.slice(0, amount);
  }

  public getNewWord() {
    return this.words.pop();
  }

  public incrementQuestionNumber() {
    this.info.currentQuestion++;
  }

  public getTrainingInfo() {
    return this.info;
  }
}
