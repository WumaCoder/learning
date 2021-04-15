import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroService } from './micro.service';

@Module({})
export class MicroModule {
  static serviceList = [];
  static forRoot(opts): DynamicModule {
    this.serviceList = this.serviceList.concat(opts);
    return {
      module: MicroModule,
      imports: [ClientsModule.register(this.serviceList)],
      providers: [MicroService],
      exports: [MicroService],
    };
  }

  static register(opts): DynamicModule {
    this.serviceList = this.serviceList.concat(opts);
    return {
      module: MicroModule,
      providers: [MicroService],
      exports: [MicroModule],
    };
  }
}
