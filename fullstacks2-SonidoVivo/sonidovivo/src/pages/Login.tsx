import { useNavigate } from 'react-router-dom';
import { Guitar, Music2 } from 'lucide-react';
import FormularioLogin from '../components/organisms/LoginForm';

interface PropiedadesInicioSesion {
  alIniciarSesion: (correo: string, contrasena: string) => string | null;
}

export default function InicioSesion({ alIniciarSesion }: PropiedadesInicioSesion) {
  const navegar = useNavigate();

  function manejarInicioSesion(correo: string, contrasena: string) {
    const error = alIniciarSesion(correo, contrasena);
    if (!error) navegar('/');
    return error;
  }

  return (
    <main className="contenedor-login">
      <section className="tarjeta-login">
        <div className="logo-login">
          <Guitar size={34} />
          <span>SONIDO VIVO</span>
        </div>

        <h1>Iniciar sesión</h1>
        <p className="texto-secundario">Ingresa con tu cuenta para acceder según tu perfil.</p>

        <FormularioLogin alIniciarSesion={manejarInicioSesion} />

        <p className="nota-demo">
          <Music2 size={15} />
          El sistema valida las credenciales y asigna el perfil automáticamente.
        </p>
      </section>
    </main>
  );
}
