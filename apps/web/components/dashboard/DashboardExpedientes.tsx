"use client";
import { Expediente } from "@/types/global"
import { expedienteSchema, ExpedienteFormData } from "@/data/schemas";
import { ExpedienteFormErrors } from "@/data/errors";
import { useState } from "react";
import z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import Link from "next/link";


type Props = {
  expedientes: Expediente[];
}

const DashboardExpedientes = (props: Props) => {
  const [expedientes, setExpedientes] = useState<Expediente[]>(props.expedientes || []);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ExpedienteFormData>({
    id: "",
    cliente: "",
    descripcion: "",
    fechaCreacion: new Date().toISOString().split("T")[0],
    estado: "abierto",
  });
  const [formErrors, setFormErrors] = useState<ExpedienteFormErrors>({});

  // Validation
  const validateForm = (): boolean => {
    try {
      expedienteSchema.parse(formData);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: ExpedienteFormErrors = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ExpedienteFormErrors] = err.message;
          }
        });
        setFormErrors(fieldErrors);
      }
      return false;
    }
  }

  const handleIpuntChange = (field: keyof ExpedienteFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Expedientes</CardTitle>
            <CardDescription>
              Gestiona todos tus expedientes desde este panel.
            </CardDescription>
          </div>

          {/* Dialog */}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Última Actividad</TableHead>
              <TableHead>Creado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expedientes.map((expediente) => (
              <TableRow key={expediente.id} className="cursor-pinter hover:bg-muted/50">
                <Link
                  href={`/dashboard/expedientes/${expediente.id}`}
                  className="contents"
                >
                  <TableHead>{expediente.cliente.nombre}</TableHead>
                  <TableHead>{expediente.descripcion}</TableHead>
                  <TableHead>{expediente.estado}</TableHead>
                  <TableHead>{expediente.updatedAt.toLocaleDateString()}</TableHead>
                  <TableHead>{expediente.createdAt.toLocaleDateString()}</TableHead>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </CardContent>
    </Card>
  )
}

export default DashboardExpedientes