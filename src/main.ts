import { TrainingController } from "./controllers";
import { TrainingModel } from "./models";
import { AssembledWordView, TrainingInfoView } from "./views";
import { TaskController } from "./controllers";
import { StatisticsController } from "./controllers";
import { StatisticsView } from "./views";
import { StatisticsModel } from "./models";
import { ShuffledWordView } from "./views";
import { TaskModel } from "./models";
import { ITaskControllerFactory } from "./controllers";

const trainingModel = new TrainingModel([
    "apple",
    "function",
    "timeout",
    "task",
    "application",
    "data",
    "tragedy",
    "symbol",
    "button",
    "software",
    "sun",
]);
const word = trainingModel.getNewWord();
if (!word) {
    throw new Error("Failed to get a new word from the TrainingModel");
}
const trainingInfoView = new TrainingInfoView();
const taskControllerFactory: ITaskControllerFactory = (word: string) => {
    const taskModel = new TaskModel(word);
    const shuffledWordView = new ShuffledWordView(taskModel.getShuffleWord());
    const assembledWordView = new AssembledWordView(taskModel.getAssembledWord());
    return new TaskController(
        word,
        shuffledWordView,
        assembledWordView,
        taskModel,
    );
};
const taskController = taskControllerFactory(word);
const statisticsModel = new StatisticsModel();
const statisticsView = new StatisticsView();
const statisticsController = new StatisticsController(
    statisticsModel,
    statisticsView,
);

new TrainingController(
    trainingModel,
    trainingInfoView,
    taskController,
    statisticsController,
    taskControllerFactory,
);
