import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type LoginBody = {
  usuario?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
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

  if (!usuario || !password) {
    return Response.json(
      { message: "El usuario y la contraseña son obligatorios." },
      { status: 400 },
    );
  }

  try {
    const usuarioRegistrado = await prisma.user.findUnique({
      where: { usuario },
    });

    const credencialesValidas =
      usuarioRegistrado !== null &&
      (await verifyPassword(password, usuarioRegistrado.passwordHash));

    if (!credencialesValidas) {
      return Response.json(
        { message: "Usuario o contraseña incorrectos." },
        { status: 401 },
      );
    }

    return Response.json({
      message: "Inicio de sesión correcto.",
      usuario: {
        id: usuarioRegistrado.id,
        usuario: usuarioRegistrado.usuario,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    return Response.json(
      { message: "No se pudo iniciar sesión." },
      { status: 500 },
    );
  }
}
