import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Prisma, Proveedor } from '../generated/prisma/client';

@Injectable()
export class ProveedoresService {
  constructor(private prisma: PrismaService) {}

  // Create a new proveedor
  async createProveedor(data: Prisma.ProveedorCreateInput): Promise<Proveedor> {
    return await this.prisma.proveedor.create({ data });
  }

  // Find a proveedor by ID
  async getProveedorById(id: number): Promise<Proveedor | null> {
    return await this.prisma.proveedor.findUnique({ where: { id } });
  }

  // List all proveedores
  async listProveedores(): Promise<Proveedor[]> {
    return await this.prisma.proveedor.findMany();
  }

  // Find a proveedor by name
  async findByName(nombre: string): Promise<Proveedor | null> {
    return await this.prisma.proveedor.findFirst({ where: { nombre } });
  }

  // Update a proveedor by ID
  async updateProveedor(
    id: number,
    data: Prisma.ProveedorUpdateInput,
  ): Promise<Proveedor> {
    return await this.prisma.proveedor.update({
      where: { id },
      data,
    });
  }

  // Delete a proveedor by ID
  async deleteProveedor(id: number): Promise<Proveedor> {
    return await this.prisma.proveedor.delete({ where: { id } });
  }
}
