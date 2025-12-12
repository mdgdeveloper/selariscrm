"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import Image from "next/image"

// Zod schema for form validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("Por favor ingresa un correo electrónico válido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginState {
  loading: boolean;
  success: boolean;
}

const LoginBlock = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loginState, setLoginState] = useState<LoginState>({
    loading: false,
    success: false,
  });
  const router = useRouter();

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Validate form with Zod
    if (!validateForm()) {
      return;
    }

    setLoginState(prev => ({ ...prev, loading: true, success: false }));

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors({
          general: data.message || 'Error en el inicio de sesión'
        });
        return;
      }

      const data = await response.json();

      console.log('Login successful:', data);

      // Store auth token if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        console.log('Token stored successfully');
      }

      // Show success state briefly before redirect
      setLoginState(prev => ({ ...prev, success: true, loading: false }));

      // Add a small delay to show success message
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to dashboard
      console.log('Attempting to navigate to dashboard...');
      router.push('/dashboard');

      // Alternative: try using window.location for debugging
      // window.location.href = '/dashboard';
    } catch (err) {
      console.error('Login error:', err);
      setErrors({
        general: 'Ha ocurrido un error inesperado. Inténtalo de nuevo.'
      });
    } finally {
      setLoginState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Clear general error when user modifies any field
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
  };


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-md">
        <Card>
          <CardHeader>
            <div className="flex flex-col items-center">
              <Image src="/logo.png" alt="SelarisCRM Logo" width={90} height={50} className="mt-5 mb-8" />
              <CardTitle className="text-xl">Accede con tu cuenta SelarisCRM</CardTitle>
              <CardDescription>Introduce tu correo y tu contraseña para acceder</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {errors.general && (
              <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {errors.general}
              </div>
            )}

            {loginState.success && (
              <div className="mb-4 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                ¡Inicio de sesión exitoso! Redirigiendo...
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    disabled={loginState.loading}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    disabled={loginState.loading}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </Field>

                <Field>
                  <Button
                    className="w-full cursor-pointer"
                    type="submit"
                    disabled={loginState.loading || loginState.success}
                  >
                    {loginState.success ? '¡Éxito! Redirigiendo...' : loginState.loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginBlock