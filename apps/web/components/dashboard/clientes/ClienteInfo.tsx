"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Cliente, EstadoCivil, CategoriaEmpleo } from "@/types/global";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  CreditCard,
  FileText,
  Calendar,
  Clock,
  Phone,
  MapPin,
  Building,
  DollarSign,
  X,
} from "lucide-react";
import ClienteFormModal from "./ClienteFormModal";

// Updated Zod schema for complete client validation
const clientSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellidos: z.string().min(1, "Los apellidos son requeridos"),
  fechaNacimiento: z.string().optional(),
  nacionalidad: z.string().optional(),
  estadoCivil: z.nativeEnum(EstadoCivil).optional(),
  numHijos: z.number().min(0).optional(),
  dni: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  direccionActual: z.string().optional(),
  tiempoViviendo: z.number().min(0).optional(),
  tipoEmpleo: z.string().optional(),
  categoriaEmpleo: z.nativeEnum(CategoriaEmpleo).optional(),
  ingresosNetosMensuales: z.number().min(0).optional(),
  ahorrosDisponibles: z.number().min(0, "Los ahorros no pueden ser negativos").optional(),
  otrosIngresos: z.number().min(0, "Los otros ingresos no pueden ser negativos"),
  deudaPrestamosPersonales: z.number().min(0).optional(),
  deudaCoche: z.number().min(0).optional(),
  deudaTarjetasCredito: z.number().min(0).optional(),
  deudaOtrasHipotecas: z.number().min(0).optional(),
  cuotasMensualesDeudas: z.number().min(0).optional(),
  notas: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

export interface FormErrors {
  nombre?: string;
  apellidos?: string;
  fechaNacimiento?: string;
  nacionalidad?: string;
  estadoCivil?: string;
  numHijos?: string;
  email?: string;
  telefono?: string;
  dni?: string;
  direccionActual?: string;
  tiempoViviendo?: string;
  tipoEmpleo?: string;
  categoriaEmpleo?: string;
  ingresosNetosMensuales?: string;
  ahorrosDisponibles?: string;
  otrosIngresos?: string;
  deudaPrestamosPersonales?: string;
  deudaCoche?: string;
  deudaTarjetasCredito?: string;
  deudaOtrasHipotecas?: string;
  cuotasMensualesDeudas?: string;
  notas?: string;
  general?: string;
}

interface ClienteInfoProps {
  cliente: Cliente;
  showHeader?: boolean;
  compact?: boolean;
  className?: string;
  onUpdate?: (updatedCliente: Cliente) => void;
}

const ClienteInfo: React.FC<ClienteInfoProps> = ({
  cliente,
  showHeader = true,
  compact = false,
  className = "",
  onUpdate,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ClientFormData>({
    nombre: cliente.nombre,
    apellidos: cliente.apellidos,
    fechaNacimiento: cliente.fechaNacimiento || "",
    nacionalidad: cliente.nacionalidad || "",
    estadoCivil: cliente.estadoCivil,
    numHijos: cliente.numHijos || 0,
    dni: cliente.dni || "",
    telefono: cliente.telefono || "",
    email: cliente.email || "",
    direccionActual: cliente.direccionActual || "",
    tiempoViviendo: cliente.tiempoViviendo || 0,
    tipoEmpleo: cliente.tipoEmpleo || "",
    categoriaEmpleo: cliente.categoriaEmpleo,
    ingresosNetosMensuales: cliente.ingresosNetosMensuales || 0,
    ahorrosDisponibles: cliente.ahorrosDisponibles || 0,
    otrosIngresos: cliente.otrosIngresos || 0,
    deudaPrestamosPersonales: cliente.deudaPrestamosPersonales || 0,
    deudaCoche: cliente.deudaCoche || 0,
    deudaTarjetasCredito: cliente.deudaTarjetasCredito || 0,
    deudaOtrasHipotecas: cliente.deudaOtrasHipotecas || 0,
    cuotasMensualesDeudas: cliente.cuotasMensualesDeudas || 0,
    notas: cliente.notas || "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [gastosMensuales, setGastosMensuales] = useState<number | null>(null);
  const [currentCliente, setCurrentCliente] = useState<Cliente>(cliente);

  const validateForm = (): boolean => {
    try {
      setErrors({});
      clientSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};

        error.issues.forEach((issue) => {
          const fieldPath = issue.path[0];

          // Type-safe field error assignment
          if (fieldPath && typeof fieldPath === 'string') {
            // Check if the field exists in our FormErrors type
            if (fieldPath in formData) {
              fieldErrors[fieldPath as keyof FormErrors] = issue.message;
            }
          }
        });
        console.log("Validation errors:", fieldErrors); // Debug log
        setErrors(fieldErrors);
      } else {
        // Handle unexpected errors
        console.error("Unexpected validation error:", error);
        setErrors({
          general: "Error de validación inesperado. Verifica todos los campos."
        });
      }

      return false;
    }
  };

  const handleInputChange = (field: keyof ClientFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;

    // Handle number fields
    if (['anosExperiencia', 'ingresosMensuales', 'ahorros', 'deudas', 'propiedades', 'otrosIngresos', 'gastosMensuales'].includes(field)) {
      const numValue = value === '' ? null : parseFloat(value);
      setFormData((prev) => ({ ...prev, [field]: isNaN(numValue as number) ? null : numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    // Clear field-specific error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Clear general error when user modifies any field
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const handleSelectChange = (field: keyof ClientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific error when user selects
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Clear general error when user modifies any field
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const handleSave = async () => {
    setErrors({});


    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      // Change fechaNacimiento to ISO string or null
      const fechaNacimientoISO = formData.fechaNacimiento
        ? new Date(formData.fechaNacimiento).toISOString()
        : null;

      const updatedFormData = {
        ...formData,
        fechaNacimiento: fechaNacimientoISO,
      };
      const response = await fetch(`/api/clientes/${cliente.id}`, {
        method: "PUT", // Changed from POST to PUT for updates
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFormData),
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedClienteFromApi = await response.json();

      // Create updated cliente object
      const updatedCliente: Cliente = {
        ...cliente,
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      console.log("Updated cliente:", updatedCliente); // Debug log
      setCurrentCliente(updatedCliente);

      // Call onUpdate callback if provided
      if (onUpdate) {
        onUpdate(updatedCliente);
      }

      setIsEditModalOpen(false);
    } catch (error) {
      setErrors({
        general: "Error al guardar los datos. Inténtalo de nuevo.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      fechaNacimiento: cliente.fechaNacimiento || "",
      nacionalidad: cliente.nacionalidad || "",
      estadoCivil: cliente.estadoCivil,
      numHijos: cliente.numHijos || 0,
      dni: cliente.dni || "",
      telefono: cliente.telefono || "",
      email: cliente.email || "",
      direccionActual: cliente.direccionActual || "",
      tiempoViviendo: cliente.tiempoViviendo || 0,
      tipoEmpleo: cliente.tipoEmpleo || "",
      categoriaEmpleo: cliente.categoriaEmpleo,
      ingresosNetosMensuales: cliente.ingresosNetosMensuales || 0,
      ahorrosDisponibles: cliente.ahorrosDisponibles || 0,
      otrosIngresos: cliente.otrosIngresos || 0,
      deudaPrestamosPersonales: cliente.deudaPrestamosPersonales || 0,
      deudaCoche: cliente.deudaCoche || 0,
      deudaTarjetasCredito: cliente.deudaTarjetasCredito || 0,
      deudaOtrasHipotecas: cliente.deudaOtrasHipotecas || 0,
      cuotasMensualesDeudas: cliente.cuotasMensualesDeudas || 0,
      notas: cliente.notas || "",
    });
    setErrors({});
    setIsEditModalOpen(false);
  };
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj);
  };

  const formatDateShort = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(dateObj);
  };

  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined || amount === null) return "No especificado";
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return "No especificado";
    return num.toString();
  };

  const getEstadoCivilLabel = (estado: EstadoCivil | undefined) => {
    if (!estado) return "No especificado";
    const labels = {
      [EstadoCivil.SOLTERO]: "Soltero/a",
      [EstadoCivil.CASADO]: "Casado/a",
      [EstadoCivil.DIVORCIADO]: "Divorciado/a",
      [EstadoCivil.VIUDO]: "Viudo/a",
    };
    return labels[estado];
  };

  const getCategoriaEmpleoLabel = (categoria: CategoriaEmpleo | undefined) => {
    if (!categoria) return "No especificado";
    const labels = {
      [CategoriaEmpleo.EMPLEADO]: "Empleado",
      [CategoriaEmpleo.AUTONOMO]: "Autónomo",
      [CategoriaEmpleo.JUBILADO]: "Jubilado",
      [CategoriaEmpleo.DESEMPLEADO]: "Desempleado",
    };
    return labels[categoria];
  };

  const getInitials = (nombre: string, apellidos: string) => {
    return `${nombre.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
  };

  if (compact) {
    return (
      <Card className={`w-full ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {getInitials(cliente.nombre, cliente.apellidos)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">
                {cliente.nombre} {cliente.apellidos}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {cliente.email || "Sin email"}
              </div>
            </div>
            {cliente.dni && (
              <Badge variant="outline" className="text-xs">
                {cliente.dni}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      {showHeader && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-semibold text-primary">
                  {getInitials(currentCliente.nombre, currentCliente.apellidos)}
                </span>
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl">
                  {currentCliente.nombre} {currentCliente.apellidos}
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Cliente desde {formatDateShort(new Date(currentCliente.createdAt))}
                </CardDescription>
              </div>
            </div>
            <ClienteFormModal
              isEditModalOpen={isEditModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              errors={errors}
              isSaving={isSaving}
              handleCancel={handleCancel}
              handleSave={handleSave}
            />
          </div>
        </CardHeader>
      )}

      <CardContent className="space-y-6">
        {/* Información Personal */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Información Personal</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-6">
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Nombre
              </div>
              <div className="text-sm">
                {currentCliente.nombre || <span className="text-muted-foreground italic">No especificado</span>}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Apellidos
              </div>
              <div className="text-sm">
                {currentCliente.apellidos || <span className="text-muted-foreground italic">No especificado</span>}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                <CreditCard className="h-3 w-3 mr-1" />
                DNI/NIE
              </div>
              <div className="text-sm">
                {currentCliente.dni ? (
                  <Badge variant="outline">{currentCliente.dni}</Badge>
                ) : (
                  <span className="text-muted-foreground italic">No especificado</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Fecha de Nacimiento
              </div>
              <div className="text-sm">
                {currentCliente.fechaNacimiento ?
                  formatDate(new Date(currentCliente.fechaNacimiento)) :
                  <span className="text-muted-foreground italic">No especificada</span>
                }
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Estado Civil
              </div>
              <div className="text-sm">
                {currentCliente.estadoCivil ? (
                  <Badge variant="secondary">{currentCliente.estadoCivil}</Badge>
                ) : (
                  <span className="text-muted-foreground italic">No especificado</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Nacionalidad
              </div>
              <div className="text-sm">
                {currentCliente.nacionalidad || <span className="text-muted-foreground italic">No especificada</span>}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Información de Contacto */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Información de Contacto</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                Correo Electrónico
              </div>
              <div className="text-sm">
                {currentCliente.email ? (
                  <a
                    href={`mailto:${currentCliente.email}`}
                    className="text-primary hover:underline"
                  >
                    {currentCliente.email}
                  </a>
                ) : (
                  <span className="text-muted-foreground italic">No especificado</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                Teléfono
              </div>
              <div className="text-sm">
                {currentCliente.telefono ? (
                  <a
                    href={`tel:${currentCliente.telefono}`}
                    className="text-primary hover:underline"
                  >
                    {currentCliente.telefono}
                  </a>
                ) : (
                  <span className="text-muted-foreground italic">No especificado</span>
                )}
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                Dirección
              </div>
              <div className="text-sm">
                {currentCliente.direccionActual ? (
                  <div className="bg-muted/30 p-3 rounded-md">
                    {currentCliente.direccionActual}
                  </div>
                ) : (
                  <span className="text-muted-foreground italic">No especificada</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Información Laboral */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Información Laboral</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-6">
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Profesión/Ocupación
              </div>
              <div className="text-sm">
                {currentCliente.tipoEmpleo || <span className="text-muted-foreground italic">No especificada</span>}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Categoría de Empleo
              </div>
              <div className="text-sm">
                {currentCliente.categoriaEmpleo ? (
                  <Badge variant="outline">{currentCliente.categoriaEmpleo}</Badge>
                ) : (
                  <span className="text-muted-foreground italic">No especificada</span>
                )}
              </div>
            </div>

          </div>
        </div>

        <Separator />

        {/* Información Financiera */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Información Financiera</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-6">
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Ingresos Mensuales
              </div>
              <div className="text-sm">
                {currentCliente.ingresosNetosMensuales !== null && currentCliente.ingresosNetosMensuales !== undefined ? (
                  <Badge variant="default" className="text-green-700 bg-green-100">
                    {formatCurrency(currentCliente.ingresosNetosMensuales)}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground italic">No especificado</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Ahorros
              </div>
              <div className="text-sm">
                {currentCliente.ahorrosDisponibles !== null && currentCliente.ahorrosDisponibles !== undefined ? (
                  <Badge variant="outline" className="text-blue-700">
                    {formatCurrency(currentCliente.ahorrosDisponibles)}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground italic">No especificado</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Deudas - Préstamos Personales
              </div>
              <div className="text-sm">
                {currentCliente.deudaPrestamosPersonales !== null && currentCliente.deudaPrestamosPersonales !== undefined ? (
                  <Badge variant="destructive">
                    {formatCurrency(currentCliente.deudaPrestamosPersonales)}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground italic">No especificado</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Deuda Coche
              </div>
              <div className="text-sm">
                {currentCliente.deudaCoche !== null && currentCliente.deudaCoche !== undefined ? (
                  <Badge variant="secondary">
                    {formatCurrency(currentCliente.deudaCoche)}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground italic">No especificado</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Deuda Tarjetas de Crédito
              </div>
              <div className="text-sm">
                {currentCliente.deudaTarjetasCredito !== null && currentCliente.deudaTarjetasCredito !== undefined ? (
                  <Badge variant="outline" className="text-green-600">
                    {formatCurrency(currentCliente.deudaTarjetasCredito)}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground italic">No especificado</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Gastos Mensuales
              </div>
              <div className="text-sm">
                {currentCliente.cuotasMensualesDeudas !== null && currentCliente.cuotasMensualesDeudas !== undefined ? (
                  <Badge variant="outline" className="text-red-600">
                    {formatCurrency(currentCliente.cuotasMensualesDeudas)}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground italic">No especificado</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Notas */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Notas</h3>
          </div>

          <div className="pl-6">
            <div className="text-sm whitespace-pre-wrap bg-muted/30 p-3 rounded-md min-h-[60px]">
              {currentCliente.notas ? (
                <span className="text-muted-foreground">{currentCliente.notas}</span>
              ) : (
                <span className="text-muted-foreground italic">Sin notas</span>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Información del Sistema */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Información del Sistema</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Fecha de Registro
              </div>
              <div className="text-sm">
                {formatDate(new Date(currentCliente.createdAt))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Última Actualización
              </div>
              <div className="text-sm">
                {formatDate(new Date(currentCliente.updatedAt))}
              </div>
            </div>
          </div>
        </div>

        {/* Status del Cliente */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              ID del Cliente: #{currentCliente.id}
            </div>
            <Badge variant="default">
              Cliente Activo
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClienteInfo;
