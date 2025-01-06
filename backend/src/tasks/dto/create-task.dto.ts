import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the task (optional)',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
