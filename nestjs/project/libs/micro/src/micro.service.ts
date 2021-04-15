import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroModule } from '@app/micro';

@Injectable()
export class MicroService {
  @Inject('MATH_SERVICE') public mathService: ClientProxy;
}
