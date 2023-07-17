const EVENT_NAMES = {
  CLICK: "click",
  KEYPRESS: "keypress",
} as const;

const TIMEOUT = 200;

export interface IShuffledWordView {
  renderButtons(callback: (letter: string, index: number) => void): () => void;
  highlightButtonError(index: number): void;
}
export class ShuffledWordView implements IShuffledWordView {
  private letters: string[];
  private readonly containerId: string;

  constructor(letters: string[], containerId: string = "letters") {
    this.letters = letters;
    this.containerId = containerId;
  }

  private getContainer() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      throw new Error(`Failed to get a div with id ${this.containerId}`);
    }
    return container;
  }

  private createButton(
      letter: string,
      index: number,
      callback: (letter: string, index: number) => void,
  ) {
    const button = document.createElement("button");
    button.className = "btn btn-primary";
    button.textContent = letter;
    const buttonClickHandler = () => {
      return callback(letter, index);
    };
    button.addEventListener(EVENT_NAMES.CLICK, buttonClickHandler);
    return { button, listener: buttonClickHandler };
  }

  public renderButtons(callback: (letter: string, index: number) => void) {
    const container = this.getContainer();
    container.innerHTML = "";
    const eventListeners: {
      button: HTMLButtonElement;
      listener: () => void;
    }[] = [];

    this.letters.forEach((letter, index) => {
      const { button, listener } = this.createButton(letter, index, callback);
      eventListeners.push({ button, listener });
      container.appendChild(button);
    });

    const keyPressHandler = (e: KeyboardEvent) => {
      const keyPressed = e.key;

      const letterIndex = this.letters.findIndex(
          (letter) => letter === keyPressed,
      );

      callback(keyPressed, letterIndex);
    };

    document.addEventListener(EVENT_NAMES.KEYPRESS, keyPressHandler);

    return () => {
      eventListeners.forEach(({ button, listener }) =>
          button.removeEventListener(EVENT_NAMES.CLICK, listener),
      );
      document.removeEventListener(EVENT_NAMES.KEYPRESS, keyPressHandler);
    };
  }

  public highlightButtonError(index: number) {
    const container = this.getContainer();
    const buttons = container.querySelectorAll(".btn");
    buttons.forEach((button, i) => {
      if (i === index) {
        button.className = "btn btn-danger";
        setTimeout(() => {
          button.className = "btn btn-primary";
        }, TIMEOUT);
      }
    });
  }
}
