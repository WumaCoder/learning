import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  @IsString()
  name = '管理员';

  /**
   * Hello
   */
  @ApiProperty({ enum: RoleEnum, enumName: 'RoleEnum' })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
