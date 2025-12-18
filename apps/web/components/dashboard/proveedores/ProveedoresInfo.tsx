"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Mail,
  Phone,
  Edit,
  Calendar,
  FileText,
  Building,
  Save,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { Proveedor } from "@/types/global";
import { z } from "zod";

// Zod schema for form validation
const proveedorSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  contacto: z.string().optional(),
  email: z.string().email("Formato de email inválido").optional().or(z.literal("")),
  telefono: z.string().optional(),
  notas: z.string().optional(),
  logo: z.string().url("URL del logo inválida").optional().or(z.literal("")),
});

type ProveedorFormData = z.infer<typeof proveedorSchema>;

interface FormErrors {
  nombre?: string;
  contacto?: string;
  email?: string;
  telefono?: string;
  notas?: string;
  logo?: string;
  general?: string;
}

interface ProveedorInfoProps {
  proveedor: Proveedor;
  showHeader?: boolean;
  compact?: boolean;
  className?: string;
  onUpdate?: (updatedProveedor: Proveedor) => void;
}

const ProveedorInfo: React.FC<ProveedorInfoProps> = ({
  proveedor,
  showHeader = true,
  compact = false,
  className = "",
  onUpdate,
}) => {
  const [currentProveedor, setCurrentProveedor] = useState<Proveedor>(proveedor);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Form data state
  const [formData, setFormData] = useState<ProveedorFormData>({
    nombre: currentProveedor.nombre,
    contacto: currentProveedor.contacto || "",
    email: currentProveedor.email || "",
    telefono: currentProveedor.telefono || "",
    notas: currentProveedor.notas || "",
    logo: currentProveedor.logo || "",
  });

  // Update local state when prop changes
  useEffect(() => {
    setCurrentProveedor(proveedor);
    setFormData({
      nombre: proveedor.nombre,
      contacto: proveedor.contacto || "",
      email: proveedor.email || "",
      telefono: proveedor.telefono || "",
      notas: proveedor.notas || "",
      logo: proveedor.logo || "",
    });
  }, [proveedor]);

  // Helper functions
  const formatDate = (dateString: string | Date): string => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Validation function
  const validateForm = (): boolean => {
    try {
      setErrors({});
      proveedorSchema.parse(formData);
      console.log("Form validation passed");
      return true;
    } catch (error) {
      console.log("Form validation failed:", error);

      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};

        error.issues.forEach((issue) => {
          const fieldPath = issue.path[0];

          if (fieldPath && typeof fieldPath === 'string') {
            if (fieldPath in formData) {
              fieldErrors[fieldPath as keyof FormErrors] = issue.message;
            }
          }
        });

        setErrors(fieldErrors);
      } else {
        setErrors({
          general: "Error de validación inesperado. Verifica todos los campos."
        });
      }

      return false;
    }
  };

  // Handle form submission
  const handleSave = async () => {
    console.log("handleSave called");
    setErrors({});

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    setIsSaving(true);

    try {
      console.log("Making API call to update proveedor...");

      const response = await fetch(`/api/proveedores/${currentProveedor.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      console.log("API Response:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Result:", result);

      // Create updated proveedor object
      const updatedProveedor: Proveedor = {
        ...currentProveedor,
        ...formData,
        updatedAt: new Date(),
      };

      // Update local state immediately
      setCurrentProveedor(updatedProveedor);

      // Call onUpdate callback if provided
      if (onUpdate) {
        onUpdate(updatedProveedor);
      }

      setIsEditModalOpen(false);
      console.log("Save completed successfully");
    } catch (error) {
      console.error("Save error:", error);
      setErrors({
        general: "Error al guardar los datos. Inténtalo de nuevo.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle form cancellation
  const handleCancel = () => {
    setFormData({
      nombre: currentProveedor.nombre,
      contacto: currentProveedor.contacto || "",
      email: currentProveedor.email || "",
      telefono: currentProveedor.telefono || "",
      notas: currentProveedor.notas || "",
      logo: currentProveedor.logo || "",
    });
    setErrors({});
    setIsEditModalOpen(false);
  };

  // Handle input changes
  const handleInputChange = (field: keyof ProveedorFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Clear general error when user modifies any field
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      {showHeader && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Building className="h-5 w-5" />
              {currentProveedor.nombre}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Registrado el {formatDate(currentProveedor.createdAt)}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        </CardHeader>
      )}

      <CardContent className={compact ? "space-y-3" : "space-y-6"}>
        {/* Company Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg">Información de la Empresa</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nombre</p>
              <p className="font-medium">{currentProveedor.nombre}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Persona de Contacto</p>
              {currentProveedor.contacto ? (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{currentProveedor.contacto}</span>
                </div>
              ) : (
                <span className="text-muted-foreground italic">No especificada</span>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-lg">Información de Contacto</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              {currentProveedor.email ? (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${currentProveedor.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {currentProveedor.email}
                  </a>
                </div>
              ) : (
                <span className="text-muted-foreground italic">No especificado</span>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
              {currentProveedor.telefono ? (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`tel:${currentProveedor.telefono}`}
                    className="text-blue-600 hover:underline"
                  >
                    {currentProveedor.telefono}
                  </a>
                </div>
              ) : (
                <span className="text-muted-foreground italic">No especificado</span>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Logo and Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-lg">Logo y Marca</h3>
          </div>

          <div className="pl-7">
            {currentProveedor.logo ? (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img
                    src={currentProveedor.logo}
                    alt={`Logo de ${currentProveedor.nombre}`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.classList.remove('hidden');
                    }}
                  />
                  <ImageIcon className="h-8 w-8 text-muted-foreground hidden" />
                </div>
                <div>
                  <p className="text-sm font-medium">Logo disponible</p>
                  <p className="text-xs text-muted-foreground break-all">{currentProveedor.logo}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border border-dashed rounded-lg bg-gray-50 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground italic">Logo no disponible</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Notes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold text-lg">Notas</h3>
          </div>

          <div className="pl-7">
            {currentProveedor.notas ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{currentProveedor.notas}</p>
              </div>
            ) : (
              <span className="text-muted-foreground italic">Sin notas</span>
            )}
          </div>
        </div>

        <Separator />

        {/* System Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-lg">Información del Sistema</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fecha de Registro</p>
              <p>{formatDate(currentProveedor.createdAt)}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
              <p>{formatDate(currentProveedor.updatedAt)}</p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Información del Proveedor</DialogTitle>
          </DialogHeader>

          {errors.general && (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            {/* Company Information Section */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Building className="h-4 w-4" />
                Información de la Empresa
              </h3>
              <Separator />

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="nombre">Nombre *</FieldLabel>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange('nombre')}
                    disabled={isSaving}
                    className={errors.nombre ? "border-red-500" : ""}
                  />
                  {errors.nombre && (
                    <p className="text-sm text-red-500">{errors.nombre}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="contacto">Persona de Contacto</FieldLabel>
                  <Input
                    id="contacto"
                    value={formData.contacto}
                    onChange={handleInputChange('contacto')}
                    disabled={isSaving}
                    className={errors.contacto ? "border-red-500" : ""}
                  />
                  {errors.contacto && (
                    <p className="text-sm text-red-500">{errors.contacto}</p>
                  )}
                </Field>
              </FieldGroup>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Información de Contacto
              </h3>
              <Separator />

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    disabled={isSaving}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange('telefono')}
                    disabled={isSaving}
                    className={errors.telefono ? "border-red-500" : ""}
                  />
                  {errors.telefono && (
                    <p className="text-sm text-red-500">{errors.telefono}</p>
                  )}
                </Field>
              </FieldGroup>
            </div>

            {/* Logo Section */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Logo
              </h3>
              <Separator />

              <Field>
                <FieldLabel htmlFor="logo">URL del Logo</FieldLabel>
                <Input
                  id="logo"
                  type="url"
                  value={formData.logo}
                  onChange={handleInputChange('logo')}
                  disabled={isSaving}
                  placeholder="https://ejemplo.com/logo.png"
                  className={errors.logo ? "border-red-500" : ""}
                />
                {errors.logo && (
                  <p className="text-sm text-red-500">{errors.logo}</p>
                )}
              </Field>
            </div>

            {/* Notes Section */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notas
              </h3>
              <Separator />

              <Field>
                <FieldLabel htmlFor="notas">Notas</FieldLabel>
                <Textarea
                  id="notas"
                  value={formData.notas}
                  onChange={handleInputChange('notas')}
                  disabled={isSaving}
                  rows={4}
                  className={errors.notas ? "border-red-500" : ""}
                />
                {errors.notas && (
                  <p className="text-sm text-red-500">{errors.notas}</p>
                )}
              </Field>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProveedorInfo;