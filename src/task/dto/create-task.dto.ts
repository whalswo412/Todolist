import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDateString, IsArray, IsNumber } from 'class-validator';
import { TaskPriority, TaskStatus } from '../../entities/task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: TaskPriority = TaskPriority.MEDIUM;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus = TaskStatus.PENDING;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  newTags?: string[];
}