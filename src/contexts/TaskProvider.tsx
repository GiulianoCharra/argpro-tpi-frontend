import React, { createContext, ReactNode, useContext, useState } from "react";
import { Task } from "../models/Task.js";

const TaskContext = createContext<
  | {
      selectedTask: Task | null;
      setTask: (task: Task | null) => void;
    }
  | undefined
>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const setTask = (task: Task | null) => {
    setSelectedTask(task);
  };

  return <TaskContext.Provider value={{ selectedTask, setTask }}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
