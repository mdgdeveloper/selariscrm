import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import type { Prisma } from 'src/generated/prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('proveedores')
@UseGuards(JwtAuthGuard)
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  async createProveedor(@Body('data') data: Prisma.ProveedorCreateInput) {
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
    @Body('data') data: Prisma.ProveedorUpdateInput,
  ) {
    return await this.proveedoresService.updateProveedor(Number(id), data);
  }
}
