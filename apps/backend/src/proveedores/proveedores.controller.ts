import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import type { Prisma } from 'src/generated/prisma/client';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  async createProveedor(
    @Body('nombre') nombre: string,
    @Body('telefono') telefono: string,
    @Body('email') email: string,
    @Body('contacto') contacto: string,
    @Body('notas') notas: string,
    @Body('logo') logo: string,
  ) {
    const data: Prisma.ProveedorCreateInput = {
      nombre,
      telefono,
      email,
      contacto,
      notas,
      logo,
    };
    return await this.proveedoresService.createProveedor(data);
  }

  @Get(':id')
  async getProveedorById(@Param('id') id: string) {
    return await this.proveedoresService.getProveedorById(Number(id));
  }

  @Get()
  async getAllProveedores() {
    return await this.proveedoresService.listProveedores();
  }

  @Patch(':id')
  async updateProveedor(
    @Param('id') id: string,
    @Body('nombre') nombre: string,
    @Body('telefono') telefono: string,
    @Body('email') email: string,
    @Body('contacto') contacto: string,
    @Body('notas') notas: string,
    @Body('logo') logo: string,
  ) {
    const data: Prisma.ProveedorUpdateInput = {
      nombre,
      telefono,
      email,
      contacto,
      notas,
      logo,
    };
    return await this.proveedoresService.updateProveedor(Number(id), data);
  }
}
