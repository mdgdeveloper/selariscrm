import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProveedoresService, PrismaService],
  controllers: [ProveedoresController],
  exports: [ProveedoresService],
})
export class ProveedoresModule {}
