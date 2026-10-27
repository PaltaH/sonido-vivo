import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Guitar, LogOut, ShoppingCart } from 'lucide-react';
import type { Rol } from '../../types';

interface PropiedadesEncabezado {
  rol: Rol;
  cantidadCarrito: number;
  alAbrirCarrito: () => void;
  cerrarSesion: () => void;
}

export default function Encabezado({
  rol,
  cantidadCarrito,
  alAbrirCarrito,
  cerrarSesion,
}: PropiedadesEncabezado) {
  const navegar = useNavigate();

  const manejarCierreSesion = () => {
    cerrarSesion();
    navegar('/login');
  };

  return (
    <>
      <div className="barra-superior">
        <span>SONIDO VIVO</span>
        <span>
          Sesión: <b>{rol}</b>
        </span>
      </div>

      <header className="barra-navegacion d-flex flex-column flex-lg-row">
        <Link to="/" className="marca">
          <Guitar />
          <span>
            SONIDO VIVO
            <small>Viña del Mar</small>
          </span>
        </Link>

        <nav className="d-flex flex-wrap justify-content-center">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/catalogo">Catálogo</NavLink>
          <NavLink to="/tienda">Tienda y retiros</NavLink>
          <NavLink to="/pedidos">Mis pedidos</NavLink>

          {rol !== 'CLIENTE' && (
            <NavLink to="/stock">Control de stock</NavLink>
          )}

          {rol === 'ADMIN' && (
            <NavLink to="/usuarios">Usuarios</NavLink>
          )}
        </nav>

        <div className="acciones-navegacion">
          <button
            type="button"
            className="boton-carrito"
            onClick={alAbrirCarrito}
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={19} />
            <span>{cantidadCarrito}</span>
          </button>

          <button type="button" className="cerrar-sesion" onClick={manejarCierreSesion}>
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </header>
    </>
  );
}
