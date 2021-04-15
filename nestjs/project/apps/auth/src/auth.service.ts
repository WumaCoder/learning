import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private readonly users = {
    root: {
      username: 'root',
      password: '1234',
      name: '管理员',
    },
  };

  constructor(private readonly jwtService: JwtService) {}

  validateUser(username: string, password: string) {
    const user = this.users[username];
    if (!user) {
      throw new RpcException('not user');
    }
    if (user.password !== password) {
      throw new RpcException('password not eq');
    }
    return user;
  }

  login(user) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
