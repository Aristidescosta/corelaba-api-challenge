export interface ITask {
  id: number;           // Unique identifier for the task item
  title: string;        // Title or name of the task
  description?: string; // Optional description of the task
  isFavorite: boolean;  // Whether the task is marked as a favorite
  isCompleted: boolean;  // Whether the task is marked as a favorite
  color: string;        // Color associated with the task (e.g., '#ff0000')
  createdAt: Date;      // Timestamp when the task was created
  updatedAt: Date;      // Timestamp when the task was last updated
}