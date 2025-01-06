import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        isCompleted: false,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(userId: number, isCompleted?: string, title?: string) {
    const filters: any = { userId };

    if (isCompleted !== undefined) {
      if (isCompleted === 'true') {
        filters.isCompleted = true;
      } else if (isCompleted === 'false') {
        filters.isCompleted = false;
      } else {
        throw new BadRequestException(
          `Invalid value for isCompleted. Expected 'true' or 'false', got '${isCompleted}'`,
        );
      }
    }

    if (title) {
      filters.title = { contains: title, mode: 'insensitive' };
    }

    return this.prisma.task.findMany({
      where: filters,
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this task');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this task');
    }

    const data: any = {
      title: updateTaskDto.title ?? task.title,
      description: updateTaskDto.description ?? task.description,
      isCompleted: updateTaskDto.isCompleted ?? task.isCompleted,
    };

    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async remove(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You can only delete your own tasks');
    }

    return this.prisma.task.delete({ where: { id } });
  }
}
