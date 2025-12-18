export enum EstadoExpediente {
  ABIERTO = 'ABIERTO',
  EN_PROCESO = 'EN_PROCESO',
  CERRADO = 'CERRADO',
}

export enum Rol {
  ADMIN = 'ADMIN',
  BROKER = 'BROKER',
  ASSISTANT = 'ASSISTANT',
}

export enum EstadoCivil {
  SOLTERO = 'SOLTERO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUDO = 'VIUDO',
}

export enum CategoriaEmpleo {
  EMPLEADO = 'EMPLEADO_CUENTA_AJENA',
  AUTONOMO = 'AUTONOMO',
  DESEMPLEADO = 'DESEMPLEADO',
  JUBILADO = 'JUBILADO',
}

// Base types for related entities
export interface Cliente {
  id: number;
  nombre: string;
  apellidos: string;
  fechaNacimiento?: string;
  nacionalidad?: string;
  estadoCivil?: EstadoCivil;
  numHijos?: number;
  dni?: string;
  telefono?: string;
  email?: string;
  direccionActual?: string;
  tiempoViviendo?: number;
  tipoEmpleo?: string;
  categoriaEmpleo: CategoriaEmpleo;
  // Información financiera
  ingresosNetosMensuales?: number;
  ahorrosDisponibles?: number;
  otrosIngresos?: number;
  deudaPrestamosPersonales?: number;
  deudaCoche?: number;
  deudaTarjetasCredito?: number;
  deudaOtrasHipotecas?: number;
  cuotasMensualesDeudas?: number;
  // Información adicional
  notas?: string;
  createdAt: string;
  updatedAt: string;
  expedientes: Expediente[]
}

export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  rol: Rol;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tarea {
  id: number;
  titulo: string;
  descripcion?: string;
  fecha_limite?: Date;
  completada: boolean;
  expedienteId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Documento {
  id: number;
  nombre: string;
  tipo_mime: string;
  url: string;
  expedienteId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notificacion {
  id: number;
  mensaje: string;
  leida: boolean;
  expedienteId: number;
  tareaId: number;
  createdAt: Date;
}

// Main Expediente type
export interface Expediente {
  id: number;
  estado: EstadoExpediente;
  descripcion?: string;
  datos?: unknown; // JSON field - can be typed more specifically if needed
  clienteId: number;
  brokerId: number;
  broker: Usuario;
  tareas: Tarea[];
  documentos: Documento[];
  notificaciones: Notificacion[];
  createdAt: Date;
  updatedAt: Date;
}

// Utility types for creating/updating expedientes
export interface CreateExpedienteData {
  estado?: EstadoExpediente;
  descripcion?: string;
  datos?: unknown;
  clienteId: number;
  brokerId: number;
}

export interface UpdateExpedienteData {
  estado?: EstadoExpediente;
  descripcion?: string;
  datos?: unknown;
  clienteId?: number;
  brokerId?: number;
}

// Type for expediente with optional relations (for API responses)
export interface ExpedienteWithOptionalRelations {
  id: number;
  estado: EstadoExpediente;
  descripcion?: string;
  datos?: unknown;
  clienteId: number;
  brokerId: number;
  cliente?: Cliente;
  broker?: Usuario;
  tareas?: Tarea[];
  documentos?: Documento[];
  notificaciones?: Notificacion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Proveedor {
  id: number;
  nombre: string;
  contacto?: string;
  email?: string;
  telefono?: string;
  notas?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}