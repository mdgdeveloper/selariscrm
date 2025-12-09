import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'basicSecret2025',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
