import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiSecurity,
} from '@nestjs/swagger';
import { timeout } from 'rxjs/operators';
import { AppService } from './app.service';
import { MicroService } from '../../../libs/micro/src/micro.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';

// @ApiHeader({
//   name: 'Authentication',
//   description: '认证',
// })
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @UseGuards(AuthGuard())
  @Get('/')
  getHello() {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Body() loginDto: LoginDto, @Req() req) {
    return this.authService.send('login', req.user);
  }
}
