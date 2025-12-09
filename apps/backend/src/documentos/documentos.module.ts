import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({ dest: './uploads' })],
  providers: [DocumentosService, PrismaService],
  controllers: [DocumentosController],
  exports: [DocumentosService],
})
export class DocumentosModule {}
