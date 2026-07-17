import Link from "next/link";
import Image from "next/image";
import portalBackground from "../../../public/assets/portal-valhalla.png";

export const metadata = {
  title: "Valhalla | Portal Access",
  description: "Bienvenido al portal interdimensional",
};

export default function PortalPage() {
  return (
    <main className="valhalla-page">
      <Image
        className="valhalla-background"
        src={portalBackground}
        alt=""
        fill
        priority
        placeholder="blur"
        quality={72}
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="valhalla-overlay" aria-hidden="true" />
      <div className="valhalla-particles" aria-hidden="true" />

      <nav className="valhalla-nav">
        <Link className="brand home-brand" href="/">
          <span className="brand-mark">P</span>
          <span>PORTAL <b>ACCESS</b></span>
        </Link>
        <Link className="portal-exit" href="/">Salir del portal</Link>
      </nav>

      <section className="valhalla-welcome">
        <span className="valhalla-status"><i /> DIMENSIÓN SINCRONIZADA</span>
        <p className="valhalla-kicker">WUBBA LUBBA DUB DUB</p>
        <h1>
          <span>Bienvenido al</span>
          <strong>Valhalla</strong>
          <em>Fredy</em>
        </h1>
        <p className="valhalla-copy">Tu aventura interdimensional comienza ahora.</p>
      </section>
    </main>
  );
}
