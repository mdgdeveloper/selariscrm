import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ClientesModule } from './clientes/clientes.module';
import { ExpedientesModule } from './expedientes/expedientes.module';
import { DocumentosModule } from './documentos/documentos.module';
import { TareasModule } from './tareas/tareas.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      // 💡 Loads the .env file from the root of the NestJS app (apps/api)
      isGlobal: true,
      envFilePath: '.env', // Assumes .env is in the root of the app
    }),
    PrismaModule,
    AuthModule,
    ProveedoresModule,
    ClientesModule,
    ExpedientesModule,
    DocumentosModule,
    TareasModule,
    NotificacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
