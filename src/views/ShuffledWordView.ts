export interface IShuffledWordView {
  renderButtons(callback: (letter: string, index: number) => void): () => void;
  highlightButtonError(index: number): void;
}
export class ShuffledWordView implements IShuffledWordView {

}
