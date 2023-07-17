import { ITaskModel } from "../models";
import { IAssembledWordView, IShuffledWordView } from "../views";
import { EventEmitter, IEventEmitter } from "../helpers";
import { EVENTS } from "../constants";
import { Statistics } from "../types";

const MAX_ERRORS = 3;

export interface ITaskController extends IEventEmitter {
  handleLetterSelection(letter: string, index: number): void;
  getStatisticByWord(): Statistics;
  cleanupEmitterEvents(): void;
}

export class TaskController extends EventEmitter implements ITaskController {
  private taskModel: ITaskModel;
  private shuffledWordView: IShuffledWordView;
  private assembledWordView: IAssembledWordView;
  private cleanupListeners: () => void;

  constructor(
      word: string,
      shuffledWordView: IShuffledWordView,
      assembledWordView: IAssembledWordView,
      taskModel: ITaskModel,
  ) {
    super();
    this.taskModel = taskModel;
    this.shuffledWordView = shuffledWordView;
    this.assembledWordView = assembledWordView;
    this.cleanupListeners = this.shuffledWordView.renderButtons(
        this.handleLetterSelection.bind(this),
    );
    this.assembledWordView.renderWord();
  }

  public handleLetterSelection(letter: string, index: number) {
    if (this.taskModel.isCorrectLetter(letter, index)) {
      this.assembledWordView.renderWord();
      this.cleanupListeners();
      this.cleanupListeners = this.shuffledWordView.renderButtons(
          this.handleLetterSelection.bind(this),
      );

      if (this.taskModel.isWordComplete()) {
        this.emit(EVENTS.TASK_COMPLETE);
        this.cleanupListeners();
      }
    } else {
      this.handleWrongLetterSelection(index);
    }
  }

  private handleWrongLetterSelection(index: number) {
    this.taskModel.incrementErrorCount();
    if (index >= 0) {
      this.shuffledWordView.highlightButtonError(index);
    }

    if (this.taskModel.getErrorsCount() >= MAX_ERRORS) {
      this.emit(EVENTS.TASK_FAILED);
      this.cleanupListeners();
    }
  }

  public getStatisticByWord() {
    return {
      word: this.taskModel.getOriginWord(),
      errors: this.taskModel.getErrorsCount(),
    };
  }

  public cleanupEmitterEvents() {
    this.off(EVENTS.TASK_COMPLETE);
    this.off(EVENTS.TASK_FAILED);
  }
}
