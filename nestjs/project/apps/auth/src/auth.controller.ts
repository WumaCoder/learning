import { Controller, Get, UseFilters } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
  RedisContext,
  RpcException,
} from '@nestjs/microservices';
import { ExceptionFilter } from 'apps/auth/src/rpc-exception.filter';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseFilters(new ExceptionFilter())
  @MessagePattern('accumulate')
  accumulate(@Payload() data: number[], @Ctx() ctx: RedisContext): number {
    console.log({ data, ctx }, ctx.getChannel(), ctx.getArgs());

    if (data[0] === 0) {
      throw new RpcException('not 0');
    }
    return (data || []).reduce((a, b) => a + b);
  }
}
