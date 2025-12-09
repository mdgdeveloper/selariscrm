import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import type { Prisma } from 'src/generated/prisma/client';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async createCliente(@Body('data') data: Prisma.ClienteCreateInput) {
    return await this.clientesService.createCliente(data);
  }

  @Get(':id')
  async getClienteById(@Param('id') id: string) {
    return await this.clientesService.getClienteById(Number(id));
  }

  @Get()
  async getAllClientes() {
    return await this.clientesService.listClientes();
  }

  @Patch(':id')
  async updateCliente(
    @Param('id') id: string,
    @Body('data') data: Prisma.ClienteUpdateInput,
  ) {
    return await this.clientesService.updateCliente(Number(id), data);
  }
}
