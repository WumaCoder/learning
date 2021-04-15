import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class LoginDto {
  /**
   * 用户名
   * @example root
   */
  username: string;

  /**
   * 密码
   * @example 123456
   */
  password: string;
}
