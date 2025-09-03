import { useReducer, useEffect } from "react";
import { DEFAULT_TASKS } from "@/lib/constants";

export interface Task {
  id: string;
  title: string;
  column: string;
}

export enum TaskActionType {
  ADD_TASK = "ADD_TASK",
  MOVE_TASK = "MOVE_TASK",
  DELETE_TASK = "DELETE_TASK",
  CLEAR_COLUMN = "CLEAR_COLUMN",
  CLEAR_ALL_TASKS = "CLEAR_ALL_TASKS",
  MOVE_ALL_TASKS = "MOVE_ALL_TASKS",
  LOAD_TASKS = "LOAD_TASKS",
}

type TaskAction =
  | {
      type: TaskActionType.ADD_TASK;
      payload: { title: string; column: string };
    }
  | {
      type: TaskActionType.MOVE_TASK;
      payload: { taskId: string; column: string; beforeId?: string };
    }
  | { type: TaskActionType.DELETE_TASK; payload: { taskId: string } }
  | { type: TaskActionType.CLEAR_COLUMN; payload: { column: string } }
  | { type: TaskActionType.CLEAR_ALL_TASKS }
  | {
      type: TaskActionType.MOVE_ALL_TASKS;
      payload: { fromColumn: string; toColumn: string };
    }
  | { type: TaskActionType.LOAD_TASKS; payload: { tasks: Task[] } };

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case TaskActionType.ADD_TASK: {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        column: action.payload.column,
      };
      return [...state, newTask];
    }

    case TaskActionType.MOVE_TASK: {
      const { taskId, column, beforeId } = action.payload;
      let copy = [...state];

      const taskToMove = copy.find((task) => task.id === taskId);
      if (!taskToMove) return state;

      const updatedTask = { ...taskToMove, column };
      copy = copy.filter((task) => task.id !== taskId);

      if (beforeId === undefined || beforeId === "-1") {
        copy.push(updatedTask);
      } else {
        const insertIndex = copy.findIndex((task) => task.id === beforeId);
        if (insertIndex === -1) {
          copy.push(updatedTask);
        } else {
          copy.splice(insertIndex, 0, updatedTask);
        }
      }

      return copy;
    }

    case TaskActionType.DELETE_TASK: {
      return state.filter((task) => task.id !== action.payload.taskId);
    }

    case TaskActionType.CLEAR_COLUMN: {
      return state.filter((task) => task.column !== action.payload.column);
    }

    case TaskActionType.CLEAR_ALL_TASKS: {
      return [];
    }

    case TaskActionType.MOVE_ALL_TASKS: {
      return state.map((task) =>
        task.column === action.payload.fromColumn
          ? { ...task, column: action.payload.toColumn }
          : task,
      );
    }

    case TaskActionType.LOAD_TASKS: {
      return action.payload.tasks;
    }

    default:
      return state;
  }
};

const STORAGE_KEY = "tasks";

export const useTasks = () => {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      return storedTasks ? JSON.parse(storedTasks) : DEFAULT_TASKS;
    } catch (error) {
      console.warn("Failed to load tasks from localStorage:", error);
      return DEFAULT_TASKS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  const addTask = (title: string, column: string) => {
    dispatch({ type: TaskActionType.ADD_TASK, payload: { title, column } });
  };

  const moveTask = (taskId: string, column: string, beforeId?: string) => {
    dispatch({
      type: TaskActionType.MOVE_TASK,
      payload: { taskId, column, beforeId },
    });
  };

  const deleteTask = (taskId: string) => {
    dispatch({ type: TaskActionType.DELETE_TASK, payload: { taskId } });
  };

  const clearColumn = (column: string) => {
    dispatch({ type: TaskActionType.CLEAR_COLUMN, payload: { column } });
  };

  const clearAllTasks = () => {
    dispatch({ type: TaskActionType.CLEAR_ALL_TASKS });
  };

  const moveAllTasks = (fromColumn: string, toColumn: string) => {
    dispatch({
      type: TaskActionType.MOVE_ALL_TASKS,
      payload: { fromColumn, toColumn },
    });
  };

  const getTasksByColumn = (column: string) => {
    return tasks.filter((task) => task.column === column);
  };

  return {
    tasks,
    addTask,
    moveTask,
    deleteTask,
    clearColumn,
    clearAllTasks,
    moveAllTasks,
    getTasksByColumn,
  };
};
