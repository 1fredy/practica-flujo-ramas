"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";

type FormErrors = {
  usuario?: string;
  password?: string;
  confirmPassword?: string;
};

type RegistroResponse = {
  message?: string;
  usuario?: {
    id: number;
    usuario: string;
    createdAt: string;
  };
};

export default function RegistroPage() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const newErrors: FormErrors = {};
    const usuarioNormalizado = usuario.trim();

    if (!usuarioNormalizado) {
      newErrors.usuario = "El usuario es obligatorio.";
    } else if (usuarioNormalizado.length < 3) {
      newErrors.usuario =
        "El usuario debe tener al menos 3 caracteres.";
    } else if (usuarioNormalizado.length > 30) {
      newErrors.usuario =
        "El usuario no puede superar los 30 caracteres.";
    } else if (/\s/.test(usuarioNormalizado)) {
      newErrors.usuario =
        "El usuario no puede contener espacios.";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (password.length < 8) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword =
        "Debes confirmar la contraseña.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    setMessage("");
    setIsSuccess(false);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuarioNormalizado,
          password,
        }),
      });

      const data = (await response.json()) as RegistroResponse;

      if (!response.ok) {
        setMessage(
          data.message ?? "No se pudo registrar el usuario.",
        );
        return;
      }

      setMessage(
        data.message ?? "Usuario registrado correctamente.",
      );
      setIsSuccess(true);

      setUsuario("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch {
      setMessage(
        "No se pudo conectar con el servidor. Inténtalo nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <Link
          href="/"
          className="mb-5 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          ← Volver al inicio
        </Link>

        <h1 className="text-center text-3xl font-bold text-gray-900">
          Crear cuenta
        </h1>

        <p className="mt-2 text-center text-sm text-gray-600">
          Crea un usuario y una contraseña
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <label
              htmlFor="usuario"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Usuario
            </label>

            <input
              id="usuario"
              name="usuario"
              type="text"
              value={usuario}
              onChange={(event) => {
                setUsuario(event.target.value);

                if (errors.usuario) {
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    usuario: undefined,
                  }));
                }
              }}
              autoComplete="username"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              placeholder="Escribe tu usuario"
            />

            {errors.usuario && (
              <p className="mt-1 text-sm text-red-600">
                {errors.usuario}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);

                if (errors.password) {
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    password: undefined,
                  }));
                }
              }}
              autoComplete="new-password"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              placeholder="Mínimo 8 caracteres"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Confirmar contraseña
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);

                if (errors.confirmPassword) {
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    confirmPassword: undefined,
                  }));
                }
              }}
              autoComplete="new-password"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              placeholder="Repite tu contraseña"
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {message && (
            <p
              className={`rounded-lg px-4 py-3 text-center text-sm ${
                isSuccess
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting
              ? "Registrando..."
              : "Crear nuevo usuario"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  );
}