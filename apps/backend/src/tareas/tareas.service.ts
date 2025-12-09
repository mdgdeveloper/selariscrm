import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Tarea, Prisma } from '../generated/prisma/client';

@Injectable()
export class TareasService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TareaCreateInput): Promise<Tarea> {
    const { expedienteId, ...rest } = data as Prisma.TareaCreateInput & {
      expedienteId: number;
    };
    return this.prisma.tarea.create({
      data: {
        ...rest,
        expediente: { connect: { id: Number(expedienteId) } },
      },
      include: { expediente: true },
    });
  }

  findAll(): Promise<Tarea[]> {
    return this.prisma.tarea.findMany();
  }

  findOne(id: number): Promise<Tarea | null> {
    return this.prisma.tarea.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.TareaUpdateInput): Promise<Tarea> {
    return this.prisma.tarea.update({
      where: { id },
      data,
    });
  }

  findbyExpedienteId(expedienteId: number): Promise<Tarea[]> {
    return this.prisma.tarea.findMany({
      where: { expedienteId },
    });
  }

  remove(id: number): Promise<Tarea> {
    return this.prisma.tarea.delete({ where: { id } });
  }
}
