import axios from 'axios';
import { Task } from '@/types/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await axios.get<Task[]>(
      `${API_BASE_URL}/tasks`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOjIsImlhdCI6MTczNjgxMjMwMywiZXhwIjoxNzM2ODE1OTAzfQ.dx7SQLCApOOm0nbMeZX1MSPtK3i088KpxHCGZaXW-Is`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function fetchTaskById(
  taskId: string
): Promise<Task> {
  try {
    const response = await axios.get<Task>(
      `${API_BASE_URL}/tasks/${taskId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching task with ID ${taskId}:`,
      error
    );
    throw error;
  }
}

export async function createTask(
  task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Task> {
  try {
    const response = await axios.post<Task>(
      `${API_BASE_URL}/tasks`,
      task
    );
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export async function updateTask(
  taskId: string,
  task: Partial<Task>
): Promise<Task> {
  try {
    const response = await axios.patch<Task>(
      `${API_BASE_URL}/tasks/${taskId}`,
      task
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating task with ID ${taskId}:`,
      error
    );
    throw error;
  }
}

export async function deleteTask(
  taskId: string
): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
  } catch (error) {
    console.error(
      `Error deleting task with ID ${taskId}:`,
      error
    );
    throw error;
  }
}
