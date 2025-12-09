import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Documento, Prisma } from '../generated/prisma/client';

@Injectable()
export class DocumentosService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.DocumentoCreateInput): Promise<Documento> {
    return this.prisma.documento.create({ data });
  }
}
