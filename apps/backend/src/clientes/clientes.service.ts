import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Cliente, Prisma } from '../generated/prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  // Create a new cliente
  async createCliente(data: Prisma.ClienteCreateInput): Promise<Cliente> {
    try {
      return await this.prisma.cliente.create({ data });
    } catch (error) {
      console.error('Error creating cliente:', error);
      throw error;
    }
  }

  // Find a cliente by ID
  async getClienteById(id: number): Promise<Cliente | null> {
    return await this.prisma.cliente.findUnique({ where: { id } });
  }

  // List all clientes
  async listClientes(): Promise<Cliente[]> {
    return await this.prisma.cliente.findMany();
  }

  // Find a cliente by name
  async findByName(nombre: string): Promise<Cliente | null> {
    return await this.prisma.cliente.findFirst({ where: { nombre } });
  }

  // Update a cliente by ID
  async updateCliente(
    id: number,
    data: Prisma.ClienteUpdateInput,
  ): Promise<Cliente> {
    return await this.prisma.cliente.update({
      where: { id },
      data,
    });
  }

  // Delete a cliente by ID
  async deleteCliente(id: number): Promise<Cliente> {
    return await this.prisma.cliente.delete({ where: { id } });
  }
}
