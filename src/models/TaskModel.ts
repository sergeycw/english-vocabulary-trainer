import { shuffleArray } from "../utils";

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
  private errorsCount = 0;
  private readonly originWord: string;
  private letterIdx = 0;
  private readonly shuffledWord: string[];
  private assembledWord: string[] = [];

  constructor(word: string) {
    this.originWord = word;
    this.shuffledWord = this.shuffleWord(word);
  }

  private shuffleWord(word: string) {
    const letters = word.split("");
    return shuffleArray(letters);
  }

  public isCorrectLetter(letter: string, index: number) {
    if (!this.originWord.includes(letter)) return false;
    if (this.originWord[this.letterIdx] === this.shuffledWord[index]) {
      this.letterIdx++;
      this.assembledWord.push(this.shuffledWord[index]);
      this.shuffledWord.splice(index, 1);
      return true;
    }
    return false;
  }

  public isWordComplete() {
    return this.assembledWord.join("") === this.originWord;
  }

  public getErrorsCount() {
    return this.errorsCount;
  }

  public incrementErrorCount() {
    this.errorsCount++;
  }

  public getAssembledWord() {
    return this.assembledWord;
  }

  public getShuffleWord() {
    return this.shuffledWord;
  }

  public getOriginWord() {
    return this.originWord;
  }
}
