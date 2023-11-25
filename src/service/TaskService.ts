import axios from "axios";
import { Task } from "../models/Task.js";

const BASE_URL = "http://localhost:3000/tasks";

export const TaskService = {
  getAll: async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(BASE_URL);
    return response.data;
  },

  getById: async (id: number): Promise<Task> => {
    const response = await axios.get<Task>(`${BASE_URL}/${id}`);
    return response.data;
  },

  create: async (task: Task): Promise<Task> => {
    const response = await axios.post<Task>(BASE_URL, task);
    return response.data;
  },

  update: async (
    task: Task,
    body: {
      titulo?: string;
      descripcion?: string;
      tiempo?: number;
      imagen?: string;
      responsable?: string;
      estado?: string;
    }
  ): Promise<Task> => {
    const response = await axios.patch<Task>(`${BASE_URL}/${task.id}`, body);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};

export default TaskService;
