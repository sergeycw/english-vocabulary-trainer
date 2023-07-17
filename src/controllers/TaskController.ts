import { EventEmitter, IEventEmitter } from "../helpers";
import { Statistics } from "../types";



export interface ITaskController extends IEventEmitter {
  handleLetterSelection(letter: string, index: number): void;
  getStatisticByWord(): Statistics;
  cleanupEmitterEvents(): void;
}

export class TaskController extends EventEmitter implements ITaskController {

}
