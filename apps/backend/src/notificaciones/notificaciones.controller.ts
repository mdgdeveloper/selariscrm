import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { Prisma } from 'src/generated/prisma/client';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post()
  create(@Body() data: Prisma.NotificacionCreateInput) {
    return this.notificacionesService.create(data);
  }

  @Get()
  findAll() {
    return this.notificacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacionesService.findOne(+id);
  }

  @Get('expediente/:expedienteId')
  findByExpedienteId(@Param('expedienteId') expedienteId: string) {
    return this.notificacionesService.findbyExpedienteId(+expedienteId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.NotificacionUpdateInput,
  ) {
    return this.notificacionesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacionesService.remove(+id);
  }
}
