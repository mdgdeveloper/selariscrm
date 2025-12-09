import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import type { Rol } from 'src/generated/prisma/enums';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createUser(
    @Body('email') email: string,
    @Body('nombre') nombre: string,
    @Body('apellidos') apellidos: string,
    @Body('password') password: string,
    @Body('rol') rol: Rol,
  ) {
    const data = {
      email,
      nombre,
      apellidos,
      password,
      rol,
    };
    return await this.usersService.createUser(data);
  }
}
