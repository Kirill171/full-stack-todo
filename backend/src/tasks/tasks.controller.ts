import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Request,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
    type: TaskDto,
  })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const userId = req.user.userId;
    if (!userId) {
      throw new NotFoundException('User not found or not authenticated');
    }
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of all tasks',
    type: [TaskDto],
  })
  @ApiQuery({
    name: 'isCompleted',
    required: false,
    type: Boolean,
    description: 'Filter by completion status',
  })
  @ApiQuery({
    name: 'title',
    required: false,
    type: String,
    description: 'Filter by task title',
  })
  findAll(
    @Req() req,
    @Query('isCompleted') isCompleted?: string,
    @Query('title') title?: string,
  ) {
    const userId = req.user.userId;
    return this.tasksService.findAll(userId, isCompleted, title);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully retrieved.',
    type: TaskDto,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.tasksService.findOne(+id, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
    type: TaskDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    console.log('User ID from JWT:', req.user.userId);
    return this.tasksService.update(+id, updateTaskDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully removed.',
  })
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return this.tasksService.remove(+id, userId);
  }
}
