import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService
      .send('validateUser', {
        username,
        password,
      })
      .toPromise();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
