-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'BROKER', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "EstadoExpediente" AS ENUM ('ABIERTO', 'EN_PROCESO', 'CERRADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT,
    "dni" TEXT,
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "contacto" TEXT,
    "email" TEXT,
    "telefono" TEXT,
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expediente" (
    "id" SERIAL NOT NULL,
    "estado" "EstadoExpediente" NOT NULL DEFAULT 'ABIERTO',
    "descripcion" TEXT,
    "datos" JSONB,
    "clienteId" INTEGER NOT NULL,
    "brokerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expediente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo_mime" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "expedienteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha_limite" TIMESTAMP(3),
    "completada" BOOLEAN NOT NULL DEFAULT false,
    "expedienteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" SERIAL NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "expedienteId" INTEGER NOT NULL,
    "tareaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Expediente" ADD CONSTRAINT "Expediente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expediente" ADD CONSTRAINT "Expediente_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_expedienteId_fkey" FOREIGN KEY ("expedienteId") REFERENCES "Expediente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_expedienteId_fkey" FOREIGN KEY ("expedienteId") REFERENCES "Expediente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_expedienteId_fkey" FOREIGN KEY ("expedienteId") REFERENCES "Expediente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "Tarea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
