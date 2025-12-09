import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { Prisma } from 'src/generated/prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post()
  create(@Body() data: Prisma.DocumentoCreateInput) {
    return this.documentosService.create(data);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { expedienteId: number },
  ) {
    console.log('=== UPLOAD DEBUG ===');
    console.log('File:', file);
    console.log('Body:', body);
    console.log('Body keys:', Object.keys(body || {}));
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const data: Prisma.DocumentoCreateInput = {
      nombre: file.originalname,
      tipo_mime: file.mimetype,
      url: `/uploads/${file.filename}`,
      expediente: {
        connect: {
          id: Number(body.expedienteId),
        },
      },
    };

    return this.documentosService.create(data);
  }
}
