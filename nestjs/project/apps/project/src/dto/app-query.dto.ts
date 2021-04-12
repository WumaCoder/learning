import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleEnum } from '../user/dto/create-user.dto';

export class AppQueryDto {
  /**
   * 角色名
   */
  @IsEnum(RoleEnum)
  @ApiProperty({ enum: RoleEnum })
  roleName: RoleEnum = RoleEnum.ADMIN;
}
