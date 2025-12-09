import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpedientesService } from './expedientes.service';
import { Prisma } from 'src/generated/prisma/client';

@Controller('expedientes')
export class ExpedientesController {
  constructor(private readonly expedientesService: ExpedientesService) {}

  @Post()
  create(@Body() data: Prisma.ExpedienteCreateInput) {
    return this.expedientesService.create(data);
  }

  @Get()
  findAll() {
    return this.expedientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expedientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.ExpedienteUpdateInput) {
    return this.expedientesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expedientesService.remove(+id);
  }
}
