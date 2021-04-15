import { Module } from '@nestjs/common';
import { TempService } from './temp.service';
import { TempController } from './temp.controller';
import { MicroModule } from '@app/micro';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TempController],
  providers: [TempService],
  exports: [TempService],
})
export class TempModule {}
