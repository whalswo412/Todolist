import { TaskPriority, TaskStatus } from '../../entities/task.entity';

export class TaskResponseDto {
  id: number;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: Date;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  tags?: {
    id: number;
    name: string;
  }[];
}