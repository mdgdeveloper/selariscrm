import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Notificacion, Prisma } from '../generated/prisma/client';

@Injectable()
export class NotificacionesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.NotificacionCreateInput): Promise<Notificacion> {
    const { expedienteId, tareaId, ...rest } =
      data as Prisma.NotificacionCreateInput & {
        expedienteId: number;
        tareaId: number;
      };
    return this.prisma.notificacion.create({
      data: {
        ...rest,
        expediente: { connect: { id: Number(expedienteId) } },
        tarea: { connect: { id: Number(tareaId) } },
      },
      include: {
        expediente: true,
        tarea: true,
      },
    });
  }

  findAll(): Promise<Notificacion[]> {
    return this.prisma.notificacion.findMany();
  }

  findOne(id: number): Promise<Notificacion | null> {
    return this.prisma.notificacion.findUnique({ where: { id } });
  }

  update(
    id: number,
    data: Prisma.NotificacionUpdateInput,
  ): Promise<Notificacion> {
    return this.prisma.notificacion.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<Notificacion> {
    return this.prisma.notificacion.delete({ where: { id } });
  }

  findbyExpedienteId(expedienteId: number): Promise<Notificacion[]> {
    return this.prisma.notificacion.findMany({
      where: { expedienteId },
    });
  }
}
