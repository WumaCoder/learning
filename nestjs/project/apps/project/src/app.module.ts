import { PassportModule } from '@nestjs/passport';
import { MicroModule } from '@app/micro';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TempModule } from './temp/temp.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { TempService } from './temp/temp.service';

@Module({
  imports: [
    TempModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, TempService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
