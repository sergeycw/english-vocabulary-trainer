import { ITaskController } from "./TaskController";
import { EventEmitter } from "../helpers";

export interface ITaskControllerFactory {
  (word: string): ITaskController;
}

export class TrainingController extends EventEmitter {

}
