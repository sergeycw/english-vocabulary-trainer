import { ITrainingModel } from "../models";
import { ITrainingInfoView } from "../views";
import { ITaskController } from "./TaskController";
import { IStatisticsController } from "./StatisticsController";
import { EventEmitter } from "../helpers";
import { EVENTS } from "../constants";

export interface ITaskControllerFactory {
  (word: string): ITaskController;
}

export class TrainingController extends EventEmitter {
  private trainingModel: ITrainingModel;
  private trainingInfoView: ITrainingInfoView;
  private taskController: ITaskController;
  private statisticsController: IStatisticsController;
  private readonly taskControllerFactory: ITaskControllerFactory;

  constructor(
      trainingModel: ITrainingModel,
      trainingInfoView: ITrainingInfoView,
      taskController: ITaskController,
      statisticsController: IStatisticsController,
      taskControllerFactory: ITaskControllerFactory,
  ) {
    super();
    this.trainingModel = trainingModel;
    this.trainingInfoView = trainingInfoView;
    this.taskController = taskController;
    this.statisticsController = statisticsController;
    this.taskControllerFactory = taskControllerFactory;

    this.taskController.on(EVENTS.TASK_COMPLETE, this.getNewTask.bind(this));
    this.taskController.on(EVENTS.TASK_FAILED, this.getNewTask.bind(this));
    this.trainingInfoView.updateTrainingInfo(
        this.trainingModel.getTrainingInfo().currentQuestion,
        this.trainingModel.getTrainingInfo().totalQuestion,
    );
  }

  private getNewTask() {
    if (this.taskController) {
      this.taskController.cleanupEmitterEvents();
      this.statisticsController.updateStatistics(
          this.taskController.getStatisticByWord(),
      );
    }

    const newWord = this.trainingModel.getNewWord();
    if (!newWord) {
      this.statisticsController.showStatistics();
      return;
    }
    this.trainingModel.incrementQuestionNumber();

    this.taskController = this.taskControllerFactory(newWord);
    this.taskController.on(EVENTS.TASK_COMPLETE, this.getNewTask.bind(this));
    this.taskController.on(EVENTS.TASK_FAILED, this.getNewTask.bind(this));

    this.trainingInfoView.updateTrainingInfo(
        this.trainingModel.getTrainingInfo().currentQuestion,
        this.trainingModel.getTrainingInfo().totalQuestion,
    );
  }
}
