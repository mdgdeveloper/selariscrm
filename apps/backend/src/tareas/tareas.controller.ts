import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TareasService } from './tareas.service';
import { Prisma } from 'src/generated/prisma/client';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  create(@Body() data: Prisma.TareaCreateInput) {
    return this.tareasService.create(data);
  }

  @Get()
  findAll() {
    return this.tareasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tareasService.findOne(+id);
  }

  @Get('expediente/:expedienteId')
  findByExpedienteId(@Param('expedienteId') expedienteId: string) {
    return this.tareasService.findbyExpedienteId(+expedienteId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.TareaUpdateInput) {
    return this.tareasService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tareasService.remove(+id);
  }
}
