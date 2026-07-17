"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [email, setEmail] = useState("aldair@gmail.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (email !== "aldair@gmail.com" || password !== "1234") {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      window.setTimeout(() => router.push("/portal"), 450);
    }, 900);
  }

  return (
    <main className="login-page">
      <div className="space-dust" aria-hidden="true" />
      <section className="login-shell" aria-label="Inicio de sesión">
        <Link className="back-home" href="/">← Volver al inicio</Link>
        <Link className="brand" href="/" aria-label="Volver a la página principal"><span className="brand-mark">P</span><span>PORTAL <b>ACCESS</b></span></Link>
        <div className="login-copy">
          <span className="eyebrow"><i /> C-137 SECURE NETWORK</span>
          <h1>Bienvenido de<br />vuelta, <em>viajero.</em></h1>
          <p>Tu próxima aventura interdimensional está a un inicio de sesión de distancia.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico</label>
          <div className="field">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4zM4 7l8 6 8-6" /></svg>
            <input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="aldair@gmail.com" autoComplete="email" required />
          </div>
          <div className="label-row"><label htmlFor="password">Contraseña</label><button type="button" className="text-button">¿Olvidaste tu contraseña?</button></div>
          <div className="field">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3" /></svg>
            <input id="password" name="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••" autoComplete="current-password" required />
            <button className="eye" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.5"/></svg></button>
          </div>
          <label className="remember"><input type="checkbox" defaultChecked /><span /> Mantener sesión iniciada</label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className={`submit ${status}`} type="submit" disabled={status !== "idle"}>
            {status === "idle" && <>Entrar al portal <span>→</span></>}
            {status === "loading" && <>Abriendo portal <i className="spinner" /></>}
            {status === "success" && <>¡Acceso concedido! <span>✓</span></>}
          </button>
        </form>
        <p className="signup">¿Nuevo en esta dimensión? <Link href="/registro">Crear una cuenta</Link></p>
        <p className="security"><span>✦</span> CONEXIÓN CIFRADA · FEDERACIÓN GALÁCTICA</p>
      </section>
      <div className="portal-label" aria-hidden="true"><span>∞</span><b>PORTAL ESTABLE</b><small>DIMENSIÓN C-137</small></div>
    </main>
  );
}
