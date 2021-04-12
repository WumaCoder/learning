import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiParam } from '@nestjs/swagger';
import { timeout } from 'rxjs/operators';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MATH_SERVICE') private mathService: ClientProxy,
  ) {}

  @ApiParam({
    name: 'a',
    example: 1,
  })
  @ApiParam({
    name: 'b',
    example: 2,
  })
  @Get('/:a,:b')
  getHello(@Param('a') a: number, @Param('b') b: number) {
    const payload = [a, b];
    const res = this.mathService.send<number>('accumulate', payload);

    res.subscribe({
      error(err) {
        console.log(err);
      },
    });

    return res.pipe(timeout(5000));
  }
}
