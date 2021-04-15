import { Controller, Get, Req, UseFilters, UseGuards } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
  RedisContext,
  RpcException,
} from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { ExceptionFilter } from 'apps/auth/src/rpc-exception.filter';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('validateUser')
  validateUser(@Payload() loginDto) {
    console.log('validateUser', loginDto);

    return this.authService.validateUser(loginDto.username, loginDto.password);
  }

  @MessagePattern('login')
  login(@Payload() user) {
    console.log('visa', user);

    return this.authService.login(user);
  }
}
