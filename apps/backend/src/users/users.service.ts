import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Usuario, Prisma } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Create a new user
  async createUser(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.prisma.usuario.create({
      data: { ...data, password: hashedPassword },
    });
  }

  // Find a user by ID
  async getUserById(id: number): Promise<Usuario | null> {
    return await this.prisma.usuario.findUnique({ where: { id } });
  }

  // Find a user by email
  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.prisma.usuario.findUnique({ where: { email } });
  }

  // Update a user by ID
  async updateUser(
    id: number,
    data: Prisma.UsuarioUpdateInput,
  ): Promise<Usuario> {
    return await this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  // Delete a user by ID
  async deleteUser(id: number): Promise<Usuario> {
    return await this.prisma.usuario.delete({ where: { id } });
  }

  // List all users
  async listUsers(): Promise<Usuario[]> {
    return await this.prisma.usuario.findMany();
  }
}
