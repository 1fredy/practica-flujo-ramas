import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type RegistroBody = {
  usuario?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  let body: RegistroBody;

  try {
    body = (await request.json()) as RegistroBody;
  } catch {
    return Response.json(
      { message: "Los datos enviados no son válidos." },
      { status: 400 },
    );
  }

  const usuario =
    typeof body.usuario === "string"
      ? body.usuario.trim().toLowerCase()
      : "";

  const password =
    typeof body.password === "string" ? body.password : "";

  if (!usuario) {
    return Response.json(
      { message: "El usuario es obligatorio." },
      { status: 400 },
    );
  }

  if (usuario.length < 3 || usuario.length > 30) {
    return Response.json(
      {
        message:
          "El usuario debe tener entre 3 y 30 caracteres.",
      },
      { status: 400 },
    );
  }

  if (/\s/.test(usuario)) {
    return Response.json(
      { message: "El usuario no puede contener espacios." },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return Response.json(
      {
        message:
          "La contraseña debe tener al menos 8 caracteres.",
      },
      { status: 400 },
    );
  }

  try {
    const usuarioExistente = await prisma.user.findUnique({
      where: { usuario },
    });

    if (usuarioExistente) {
      return Response.json(
        { message: "Ese nombre de usuario ya está registrado." },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);

    const nuevoUsuario = await prisma.user.create({
      data: {
        usuario,
        passwordHash,
      },
      select: {
        id: true,
        usuario: true,
        createdAt: true,
      },
    });

    return Response.json(
      {
        message: "Usuario registrado correctamente.",
        usuario: nuevoUsuario,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    return Response.json(
      { message: "No se pudo registrar el usuario." },
      { status: 500 },
    );
  }
}