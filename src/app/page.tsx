import Link from "next/link";

export default function Home() {
  return (
    <main className="home-page">
      <div className="space-dust" aria-hidden="true" />
      <nav className="home-nav" aria-label="Navegación principal">
        <Link className="brand home-brand" href="/">
          <span className="brand-mark">P</span>
          <span>PORTAL <b>ACCESS</b></span>
        </Link>
      </nav>
      <section className="home-hero">
        <span className="eyebrow"><i /> C-137 SECURE NETWORK</span>
        <h1>Tu aventura comienza <em>aquí.</em></h1>
        <p>Accede a tu cuenta o regístrate para explorar el portal y comenzar tu próxima aventura interdimensional.</p>
        <div className="home-actions">
          <Link className="home-primary" href="/login">Iniciar sesión <span>→</span></Link>
          <Link className="home-secondary" href="/registro">Crear una cuenta</Link>
        </div>
      </section>
      <div className="portal-label" aria-hidden="true"><span>∞</span><b>PORTAL ESTABLE</b><small>DIMENSIÓN C-137</small></div>
    </main>
  );
}
