import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'The title of the task (optional for update)',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'The description of the task (optional for update)',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description:
      'Indicates whether the task is completed (optional for update)',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
