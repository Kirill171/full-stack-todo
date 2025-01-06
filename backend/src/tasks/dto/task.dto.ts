import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ default: false })
  isCompleted?: boolean;

  @ApiProperty({
    description: 'The ID of the user associated with the task',
  })
  userId: number;
}
