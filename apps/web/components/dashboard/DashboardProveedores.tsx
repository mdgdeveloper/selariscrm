"use client";
import { Proveedor } from "@/types/global";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Link from "next/link";
import { Plus, User } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const proveedorSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  contacto: z.string().min(1, "El contacto es requerido"),
  email: z.string().email("Por favor ingresa un correo electrónico válido"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  notas: z.string().optional(),
});

type ProveedorFormData = z.infer<typeof proveedorSchema>;

interface FormErrors {
  nombre?: string;
  contacto?: string;
  email?: string;
  telefono?: string;
  notas?: string;
  general?: string;
}

interface Props {
  proveedores: Proveedor[];
}
const DashboardProveedores = (props: Props) => {
  const [proveedores, setProveedores] = useState<Proveedor[]>(props.proveedores);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProveedorFormData>({
    nombre: "",
    contacto: "",
    email: "",
    telefono: "",
    notas: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    try {
      proveedorSchema.parse(formData);
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
      } else {
        console.error("Validation error:", error);
      }
      return false;
    }
  }

  const handleInputChange = (field: keyof ProveedorFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });

    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }

    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/proveedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const newProveedor = await response.json();

      if (response.ok) {
        setProveedores((prev) => [...prev, newProveedor]);
        setIsModalOpen(false);
        setFormData({
          nombre: "",
          contacto: "",
          email: "",
          telefono: "",
          notas: "",
        });
      } else {
        setErrors({ general: newProveedor.message || 'Error al añadir el proveedor' });
      }
    } catch (error) {
      setErrors({ general: 'Error al añadir el proveedor: ' + (error instanceof Error ? error.message : String(error)) });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Proveedores</CardTitle>
            <CardDescription>Lista de todos los proveedores</CardDescription>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Añadir Proveedor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Añadir Nuevo Proveedor</DialogTitle>
                <DialogDescription>Completa la informacion del nuevo proveedor</DialogDescription>
              </DialogHeader>
              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md mb-4">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
                    <Input
                      id="nombre"
                      placeholder="Nombre del proveedor"
                      value={formData.nombre}
                      onChange={handleInputChange("nombre")}
                      disabled={isLoading}
                      className={errors.nombre ? "border-red-500" : ""}
                    />
                    {errors.nombre && (
                      <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="contacto">Contacto</FieldLabel>
                    <Input
                      id="contacto"
                      placeholder="Nombre del contacto"
                      value={formData.contacto}
                      onChange={handleInputChange("contacto")}
                      disabled={isLoading}
                      className={errors.contacto ? "border-red-500" : ""}
                    />
                    {errors.contacto && (
                      <p className="mt-1 text-sm text-red-600">{errors.contacto}</p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email del proveedor"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      disabled={isLoading}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>
                    <Input
                      id="telefono"
                      placeholder="Teléfono del proveedor"
                      value={formData.telefono}
                      onChange={handleInputChange("telefono")}
                      disabled={isLoading}
                      className={errors.telefono ? "border-red-500" : ""}
                    />
                    {errors.telefono && (
                      <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="notas">Notas</FieldLabel>
                    <Textarea
                      id="notas"
                      placeholder="Notas del proveedor"
                      value={formData.notas}
                      onChange={handleInputChange("notas")}
                      disabled={isLoading}
                      className={errors.notas ? "border-red-500" : ""}
                    />
                    {errors.notas && (
                      <p className="mt-1 text-sm text-red-600">{errors.notas}</p>
                    )}
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
                  <Button
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Guardando...' : 'Guardar Proveedor'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {/* Dialog for Form */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead>Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proveedores.map((proveedor) => (
              <TableRow key={proveedor.id} className="cursor-pointer hover:bg-muted/50" >
                <Link
                  href={`/dashboard/proveedores/${proveedor.id}`}
                  className="contents"
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {proveedor.nombre}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{proveedor.contacto}</TableCell>
                  <TableCell>{proveedor.email}</TableCell>
                  <TableCell>{proveedor.telefono}</TableCell>
                  <TableCell>{proveedor.notas ? proveedor.notas : <span className="text-muted-foreground italic">Sin notas</span>}</TableCell>
                  <TableCell>
                    <span className="text-blue-600 underline">Editar</span>
                  </TableCell>

                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card >
  )
}

export default DashboardProveedores