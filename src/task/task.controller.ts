import { Body, Controller, Delete, Get, Param, Logger, Post, Req, UnauthorizedException, ParseIntPipe, Patch, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TagService } from '../tag/tag.service';
import { UpdateTaskTagsDto } from '../tag/dto/update-task-tags.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * Task 관련 HTTP 요청을 처리하는 컨트롤러
 * 모든 엔드포인트는 JWT 인증이 필요합니다.
 */
@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  private readonly logger = new Logger(TaskController.name);
  
  constructor(
    private readonly taskService: TaskService,
    private readonly tagService: TagService
  ) {}


  @Get('/all')
  async findAll(@Req() req): Promise<TaskResponseDto[]> {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('올바른 인증 정보가 없습니다');
    }
    return this.taskService.findAll(userId);
  }
  /**
   * 새 작업 생성
   * POST /tasks
   * @param req 요청 객체 (JWT에서 추출한 사용자 정보 포함)
   * @param createTaskDto 작업 생성 정보
   * @returns 생성된 작업 정보
   */
  @Post()
  async createTask(
    @Req() req,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<TaskResponseDto> {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      this.logger.error('인증된 사용자 ID를 찾을 수 없습니다', req.user);
      throw new UnauthorizedException('올바른 인증 정보가 없습니다');
    }
    
    this.logger.log(`작업 생성 요청: 사용자 ${userId}`);
    return this.taskService.createTask(userId, createTaskDto);
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<TaskResponseDto> {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      this.logger.error('인증된 사용자 ID를 찾을 수 없습니다', req.user);
      throw new UnauthorizedException('올바른 인증 정보가 없습니다');
    }

    return this.taskService.updateTask(id, userId, updateTaskDto);
  }

  @Delete(':id')    
  deleteTask(@Param("id", ParseIntPipe) id: number, @Req() req): Promise<any> {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      this.logger.error('인증된 사용자 ID를 찾을 수 없습니다', req.user);
      throw new UnauthorizedException('올바른 인증 정보가 없습니다');
    }
    
    return this.taskService.deleteTask(id, userId);
  }

  /**
   * 작업에 태그 업데이트
   * PUT /tasks/:id/tags
   */
  @Put(':id/tags')
  updateTaskTags(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Body() updateDto: UpdateTaskTagsDto
  ): Promise<any> {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      this.logger.error('인증된 사용자 ID를 찾을 수 없습니다', req.user);
      throw new UnauthorizedException('올바른 인증 정보가 없습니다');
    }

    return this.tagService.updateTaskTags(id, userId, updateDto);
  }
}
