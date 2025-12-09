import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Expediente, Prisma } from '../generated/prisma/client';

@Injectable()
export class ExpedientesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ExpedienteCreateInput): Promise<Expediente> {
    const { clienteId, brokerId, ...rest } =
      data as Prisma.ExpedienteCreateInput & {
        clienteId: number;
        brokerId: number;
      };

    return this.prisma.expediente.create({
      data: {
        ...rest,
        cliente: { connect: { id: clienteId } },
        broker: { connect: { id: brokerId } },
      },
      include: { cliente: true },
    });
  }

  findAll(): Promise<Expediente[]> {
    return this.prisma.expediente.findMany();
  }

  findOne(id: number): Promise<Expediente | null> {
    return this.prisma.expediente.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.ExpedienteUpdateInput): Promise<Expediente> {
    return this.prisma.expediente.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<Expediente> {
    return this.prisma.expediente.delete({ where: { id } });
  }
}
