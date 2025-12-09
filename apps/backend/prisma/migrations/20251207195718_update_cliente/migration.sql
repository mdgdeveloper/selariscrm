-- CreateEnum
CREATE TYPE "EstadoCivil" AS ENUM ('SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO');

-- CreateEnum
CREATE TYPE "CategoriaEmpleo" AS ENUM ('EMPLEADO_CUENTA_AJENA', 'AUTONOMO', 'DESEMPLEADO', 'JUBILADO');

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "ahorrosDisponibles" DOUBLE PRECISION,
ADD COLUMN     "categoriaEmpleo" "CategoriaEmpleo",
ADD COLUMN     "cuotasMensualesDeudas" DOUBLE PRECISION,
ADD COLUMN     "deudaCoche" DOUBLE PRECISION,
ADD COLUMN     "deudaOtrasHipotecas" DOUBLE PRECISION,
ADD COLUMN     "deudaPrestamosPersonales" DOUBLE PRECISION,
ADD COLUMN     "deudaTarjetasCredito" DOUBLE PRECISION,
ADD COLUMN     "direccionActual" TEXT,
ADD COLUMN     "estadoCivil" "EstadoCivil",
ADD COLUMN     "fechaNacimiento" TIMESTAMP(3),
ADD COLUMN     "ingresosNetosMensuales" DOUBLE PRECISION,
ADD COLUMN     "nacionalidad" TEXT,
ADD COLUMN     "numHijos" INTEGER,
ADD COLUMN     "otrosIngresos" DOUBLE PRECISION,
ADD COLUMN     "telefono" TEXT,
ADD COLUMN     "tiempoViviendo" INTEGER,
ADD COLUMN     "tipoEmpleo" TEXT;
