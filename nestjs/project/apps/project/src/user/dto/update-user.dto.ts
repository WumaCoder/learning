import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * 名称
   * @example 张三
   */
  @IsString()
  name: string;

  @IsNumber()
  age?: number;
}
