import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email address or username',
    example: 'user@example.com or user123',
  })
  @IsString()
  usernameOrEmail?: string;

  @ApiProperty({
    description: 'User password',
    example: 'strongpassword123',
  })
  @IsString()
  password: string;
}
