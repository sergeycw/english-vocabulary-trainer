export interface IAssembledWordView {
  renderWord(): void;
  renderOriginWord(word: string): void;
}

export class AssembledWordView implements IAssembledWordView {
  private word: string[];
  private readonly containerId: string;

  constructor(word: string[], containerId: string = "answer") {
    this.word = word;
    this.containerId = containerId;
    this.renderWord();
  }

  private getContainer() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      throw new Error(`Failed to get a div with id ${this.containerId}`);
    }
    return container;
  }

  private createButton(letter: string) {
    const button = document.createElement("button");
    button.className = "btn btn-success";
    button.textContent = letter;
    return button;
  }

  public renderWord() {
    const container = this.getContainer();
    container.innerHTML = "";
    this.word.forEach((letter) => {
      const button = this.createButton(letter);
      container.appendChild(button);
    });
  }

  public renderOriginWord(word: string) {
    const container = this.getContainer();
    container.innerHTML = "";
    const wordToRender = word.split("");
    wordToRender.forEach((letter) => {
      const button = this.createButton(letter);
      button.className = "btn btn-danger";
      container.appendChild(button);
    });
  }
}
