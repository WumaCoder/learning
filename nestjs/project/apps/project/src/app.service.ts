import { Injectable } from '@nestjs/common';
import { TempService } from './temp/temp.service';

@Injectable()
export class AppService {
  constructor(private readonly tempService: TempService) {}
  getHello(): string {
    return 'Hello World!' + this.tempService.findOne(1);
  }
}
