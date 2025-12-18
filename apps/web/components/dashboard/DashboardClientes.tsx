"use client";

import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus, Mail, User, FileText } from "lucide-react";
import { Cliente } from "@/types/global";

// Zod schema for client form validation
const clientSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellidos: z.string().min(1, "Los apellidos son requeridos"),
  email: z
    .string()
    .email("Email inválido")
    .optional()
    .or(z.literal("")),
  dni: z.string().optional(),
  notas: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;


// Mock data for demonstration

interface FormErrors {
  nombre?: string;
  apellidos?: string;
  email?: string;
  general?: string;
}

interface Props {
  clientes: Cliente[];
}

const DashboardClientes = (props: Props) => {
  const [clientes, setClientes] = useState<Cliente[]>(props.clientes || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ClientFormData>({
    nombre: "",
    apellidos: "",
    email: "",
    dni: "",
    notas: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    try {
      clientSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleInputChange = (field: keyof ClientFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {

      const res = await fetch(`/api/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",   // if NestJS uses cookies for auth
      });

      const newClient = await res.json();


      setClientes((prev) => [...prev, newClient]);
      setIsModalOpen(false);
      setFormData({
        nombre: "",
        apellidos: "",
        email: "",
        dni: "",
        notas: "",
      });
    } catch {
      setErrors({
        general: "Error al crear el cliente. Inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Clientes</CardTitle>
            <CardDescription>
              Gestiona la información de tus clientes
            </CardDescription>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Añadir Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Añadir Nuevo Cliente</DialogTitle>
                <DialogDescription>
                  Completa la información del nuevo cliente
                </DialogDescription>
              </DialogHeader>

              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="nombre">Nombre *</FieldLabel>
                    <Input
                      id="nombre"
                      placeholder="Nombre del cliente"
                      value={formData.nombre}
                      onChange={handleInputChange("nombre")}
                      disabled={isLoading}
                      className={errors.nombre ? "border-red-500" : ""}
                    />
                    {errors.nombre && (
                      <p className="text-sm text-red-600">{errors.nombre}</p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="apellidos">Apellidos *</FieldLabel>
                    <Input
                      id="apellidos"
                      placeholder="Apellidos del cliente"
                      value={formData.apellidos}
                      onChange={handleInputChange("apellidos")}
                      disabled={isLoading}
                      className={errors.apellidos ? "border-red-500" : ""}
                    />
                    {errors.apellidos && (
                      <p className="text-sm text-red-600">{errors.apellidos}</p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@ejemplo.com"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      disabled={isLoading}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="dni">DNI</FieldLabel>
                    <Input
                      id="dni"
                      placeholder="12345678A"
                      value={formData.dni}
                      onChange={handleInputChange("dni")}
                      disabled={isLoading}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="notas">Notas</FieldLabel>
                    <Input
                      id="notas"
                      placeholder="Información adicional..."
                      value={formData.notas}
                      onChange={handleInputChange("notas")}
                      disabled={isLoading}
                    />
                  </Field>
                </FieldGroup>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creando..." : "Crear Cliente"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Expedientes</TableHead>
              <TableHead>Última Actividad</TableHead>
              <TableHead>Creado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id} className="cursor-pointer hover:bg-muted/50">
                <Link
                  href={`/dashboard/clientes/${cliente.id}`}
                  className="contents"
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {cliente.nombre} {cliente.apellidos}
                        </div>
                        {cliente.dni && (
                          <div className="text-sm text-muted-foreground">
                            DNI: {cliente.dni}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {cliente.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1" />
                          {cliente.email}
                        </div>
                      )}
                      {cliente.notas && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FileText className="h-3 w-3 mr-1" />
                          {cliente.notas.slice(0, 30)}...
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Badge variant="outline">{cliente.expedientes.length}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(cliente.updatedAt).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(cliente.createdAt).toLocaleDateString("es-ES")}
                  </TableCell>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {clientes.length === 0 && (
          <div className="text-center py-6">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No hay clientes
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Comienza añadiendo un nuevo cliente
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardClientes;