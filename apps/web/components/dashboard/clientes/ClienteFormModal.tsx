import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { CategoriaEmpleo, EstadoCivil } from '@/types/global'
import { Building, DollarSign, Edit3, FileText, Mail, Save, User, X } from 'lucide-react'
import React from 'react'
import { ClientFormData, FormErrors } from './ClienteInfo'

interface Props {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  formData: ClientFormData;
  handleInputChange: (field: keyof ClientFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: keyof ClientFormData, value: string) => void;
  errors: FormErrors;
  isSaving: boolean;
  handleCancel: () => void;
  handleSave: () => void;
}


const ClienteFormModal = ({ isEditModalOpen, setIsEditModalOpen, formData, handleInputChange, handleSelectChange, errors, isSaving, handleCancel, handleSave }: Props) => {


  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit3 className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>
            Modifica la información del cliente
          </DialogDescription>
        </DialogHeader>

        {errors.general && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errors.general}
          </div>
        )}

        <form className="space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <User className="h-4 w-4 mr-2" />
              Información Personal
            </h3>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="edit-nombre">Nombre *</FieldLabel>
                  <Input
                    id="edit-nombre"
                    placeholder="Nombre del cliente"
                    value={formData.nombre}
                    onChange={handleInputChange("nombre")}
                    disabled={isSaving}
                    className={errors.nombre ? "border-red-500" : ""}
                  />
                  {errors.nombre && (
                    <p className="text-sm text-red-600">{errors.nombre}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-apellidos">Apellidos *</FieldLabel>
                  <Input
                    id="edit-apellidos"
                    placeholder="Apellidos del cliente"
                    value={formData.apellidos}
                    onChange={handleInputChange("apellidos")}
                    disabled={isSaving}
                    className={errors.apellidos ? "border-red-500" : ""}
                  />
                  {errors.apellidos && (
                    <p className="text-sm text-red-600">{errors.apellidos}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-dni">DNI/NIE</FieldLabel>
                  <Input
                    id="edit-dni"
                    placeholder="12345678A"
                    value={formData.dni}
                    onChange={handleInputChange("dni")}
                    disabled={isSaving}
                  />
                  {errors.dni && (
                    <p className="text-sm text-red-600">{errors.dni}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-fechaNacimiento">Fecha de Nacimiento</FieldLabel>
                  <Input
                    id="edit-fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento || " "}
                    onChange={handleInputChange("fechaNacimiento")}
                    disabled={isSaving}
                  />
                  {errors.fechaNacimiento && (
                    <p className="text-sm text-red-600">{errors.fechaNacimiento}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-estadoCivil">Estado Civil</FieldLabel>
                  <Select
                    value={formData.estadoCivil || " "}
                    onValueChange={(value) => handleSelectChange("estadoCivil", value)}
                    disabled={isSaving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ninguno">Ninguno</SelectItem>
                      {Object.values(EstadoCivil).map((estado) => (
                        <SelectItem key={estado} value={estado}>
                          {estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.estadoCivil && (
                    <p className="text-sm text-red-600">{errors.estadoCivil}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-nacionalidad">Nacionalidad</FieldLabel>
                  <Input
                    id="edit-nacionalidad"
                    placeholder="Nacionalidad"
                    value={formData.nacionalidad}
                    onChange={handleInputChange("nacionalidad")}
                    disabled={isSaving}
                  />
                  {errors.nacionalidad && (
                    <p className="text-sm text-red-600">{errors.nacionalidad}</p>
                  )}
                </Field>
              </div>
            </FieldGroup>
          </div>

          <Separator />

          {/* Información de Contacto */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Información de Contacto
            </h3>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="edit-email">Email</FieldLabel>
                  <Input
                    id="edit-email"
                    type="email"
                    placeholder="email@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    disabled={isSaving}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-telefono">Teléfono</FieldLabel>
                  <Input
                    id="edit-telefono"
                    placeholder="+34 123 456 789"
                    value={formData.telefono}
                    onChange={handleInputChange("telefono")}
                    disabled={isSaving}
                  />
                  {errors.telefono && (
                    <p className="text-sm text-red-600">{errors.telefono}</p>
                  )}
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="edit-direccion">Dirección</FieldLabel>
                <Textarea
                  id="edit-direccion"
                  placeholder="Dirección completa..."
                  value={formData.direccionActual}
                  onChange={handleInputChange("direccionActual")}
                  disabled={isSaving}
                  rows={2}
                />
                {errors.direccionActual && (
                  <p className="text-sm text-red-600">{errors.direccionActual}</p>
                )}
              </Field>
            </FieldGroup>
          </div>

          <Separator />

          {/* Información Laboral */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Información Laboral
            </h3>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="edit-tipoEmpleo">Tipo de Empleo</FieldLabel>
                  <Input
                    id="edit-tipoEmpleo"
                    placeholder="Profesión u ocupación"
                    value={formData.tipoEmpleo}
                    onChange={handleInputChange("tipoEmpleo")}
                    disabled={isSaving}
                  />
                  {errors.tipoEmpleo && (
                    <p className="text-sm text-red-600">{errors.tipoEmpleo}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-categoriaEmpleo">Categoría de Empleo</FieldLabel>
                  <Select
                    value={formData.categoriaEmpleo || " "}
                    onValueChange={(value) => handleSelectChange("categoriaEmpleo", value)}
                    disabled={isSaving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ninguna">Ninguna</SelectItem>
                      {Object.values(CategoriaEmpleo).map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categoriaEmpleo && (
                    <p className="text-sm text-red-600">{errors.categoriaEmpleo}</p>
                  )}
                </Field>
              </div>
            </FieldGroup>
          </div>

          <Separator />

          {/* Información Financiera */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Información Financiera
            </h3>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="edit-ingresosNetosMensuales">Ingresos Mensuales (€)</FieldLabel>
                  <Input
                    id="edit-ingresosMensuales"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.ingresosNetosMensuales || ""}
                    onChange={handleInputChange("ingresosNetosMensuales")}
                    disabled={isSaving}
                  />
                  {errors.ingresosNetosMensuales && (
                    <p className="text-sm text-red-600">{errors.ingresosNetosMensuales}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-ahorrosDisponibles">Ahorros (€)</FieldLabel>
                  <Input
                    id="edit-ahorrosDisponibles"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.ahorrosDisponibles || ""}
                    onChange={handleInputChange("ahorrosDisponibles")}
                    disabled={isSaving}
                  />
                  {errors.ahorrosDisponibles && (
                    <p className="text-sm text-red-600">{errors.ahorrosDisponibles}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-deudaPrestamosPersonales">Deudas Prestamos Personales(€)</FieldLabel>
                  <Input
                    id="edit-deudaPrestamosPersonales"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.deudaPrestamosPersonales || ""}
                    onChange={handleInputChange("deudaPrestamosPersonales")}
                    disabled={isSaving}
                  />
                  {errors.deudaPrestamosPersonales && (
                    <p className="text-sm text-red-600">{errors.deudaPrestamosPersonales}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-deudaCoche">Deuda Coche (€)</FieldLabel>
                  <Input
                    id="edit-deudaCoche"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.deudaCoche || ""}
                    onChange={handleInputChange("deudaCoche")}
                    disabled={isSaving}
                  />
                  {errors.deudaCoche && (
                    <p className="text-sm text-red-600">{errors.deudaCoche}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-deudaTarjetasCredito">Deuda Tarjetas Credito (€)</FieldLabel>
                  <Input
                    id="edit-deudaTarjetasCredito"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.deudaTarjetasCredito || ""}
                    onChange={handleInputChange("deudaTarjetasCredito")}
                    disabled={isSaving}
                  />
                  {errors.deudaTarjetasCredito && (
                    <p className="text-sm text-red-600">{errors.deudaTarjetasCredito}</p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="edit-deudaOtrasHipotecas">Deuda Otras Hipotecas (€)</FieldLabel>
                  <Input
                    id="edit-deudaOtrasHipotecas"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.deudaOtrasHipotecas || ""}
                    onChange={handleInputChange("deudaOtrasHipotecas")}
                    disabled={isSaving}
                  />
                  {errors.deudaOtrasHipotecas && (
                    <p className="text-sm text-red-600">{errors.deudaOtrasHipotecas}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-gastosMensuales">Gastos Mensuales en Deuda(€)</FieldLabel>
                  <Input
                    id="edit-gastosMensuales"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.cuotasMensualesDeudas || ""}
                    onChange={handleInputChange("cuotasMensualesDeudas")}
                    disabled={isSaving}
                  />
                  {errors.cuotasMensualesDeudas && (
                    <p className="text-sm text-red-600">{errors.cuotasMensualesDeudas}</p>
                  )}
                </Field>
              </div>
            </FieldGroup>
          </div>

          <Separator />

          {/* Información Adicional */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Información Adicional
            </h3>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="edit-notas">Notas</FieldLabel>
                <Textarea
                  id="edit-notas"
                  placeholder="Notas internas..."
                  value={formData.notas}
                  onChange={handleInputChange("notas")}
                  disabled={isSaving}
                  rows={3}
                />
                {errors.notas && (
                  <p className="text-sm text-red-600">{errors.notas}</p>
                )}
              </Field>
            </FieldGroup>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ClienteFormModal