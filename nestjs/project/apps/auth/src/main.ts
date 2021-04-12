import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    },
  );

  app.listen(() => console.log('Auth microservice is listening'));
}
bootstrap();
