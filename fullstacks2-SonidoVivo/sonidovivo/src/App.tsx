import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import type { Producto, Rol, Usuario } from './types';
import { repositorioProductos } from './data/productRepository';
import Encabezado from './components/organisms/Header';
import InicioSesion from './pages/Login';
import Inicio from './pages/Home';
import Catalogo from './pages/Catalog';
import Tienda from './pages/Store';
import Pedidos from './pages/Orders';
import Inventario from './pages/Stock';
import Usuarios from './pages/Users';
import DetalleProducto from './pages/ProductDetail';
import Boton from './components/atoms/Button';
import { usuariosIniciales } from './data/Usuarios';

export default function Aplicacion() {
  const [sesion, establecerSesion] = useState<{ rol: Rol; correo: string } | null>(null);
  const [productos, establecerProductos] = useState<Producto[]>(() => repositorioProductos.obtenerTodos());
  const [usuarios, establecerUsuarios] = useState<Usuario[]>(usuariosIniciales);
  const [carrito, establecerCarrito] = useState<{ producto: Producto; cantidad: number }[]>([]);
  const [carritoAbierto, establecerCarritoAbierto] = useState(false);
  const ubicacion = useLocation();

  function iniciarSesion(correo: string, contrasena: string): string | null {
    const usuario = usuarios.find(
      (elemento) =>
        elemento.correo.toLowerCase() === correo.trim().toLowerCase() &&
        elemento.contrasena === contrasena,
    );

    if (!usuario) return 'Correo o contraseña incorrectos.';
    if (usuario.estado !== 'Activo') return 'Esta cuenta está inactiva.';

    establecerSesion({ rol: usuario.rol, correo: usuario.correo });
    return null;
  }

  function cerrarSesion() {
    establecerSesion(null);
    establecerCarrito([]);
  }

  function agregarAlCarrito(producto: Producto) {
    if (producto.Stock < 1) return;

    establecerCarrito((anterior) => {
      const encontrado = anterior.find((elemento) => elemento.producto.Codigo === producto.Codigo);

      if (encontrado) {
        if (encontrado.cantidad >= producto.Stock) {
          alert('Límite de stock alcanzado.');
          return anterior;
        }

        return anterior.map((elemento) =>
          elemento.producto.Codigo === producto.Codigo
            ? { ...elemento, cantidad: elemento.cantidad + 1 }
            : elemento,
        );
      }

      return [...anterior, { producto, cantidad: 1 }];
    });
  }

  function reabastecer(codigo: string) {
    const productoActual = productos.find((producto) => producto.Codigo === codigo);
    if (!productoActual) return;
    establecerProductos(repositorioProductos.actualizar(codigo, { Stock: productoActual.Stock + 1 }));
  }

  function crearProducto(producto: Producto): string | null {
    try {
      establecerProductos(repositorioProductos.crear(producto));
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : 'No se pudo agregar el producto.';
    }
  }

  function actualizarProducto(codigo: string, producto: Producto): string | null {
    try {
      establecerProductos(repositorioProductos.actualizar(codigo, producto));
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : 'No se pudo actualizar el producto.';
    }
  }

  function eliminarProducto(codigo: string): string | null {
    try {
      establecerProductos(repositorioProductos.eliminar(codigo));
      establecerCarrito((anterior) => anterior.filter((elemento) => elemento.producto.Codigo !== codigo));
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : 'No se pudo eliminar el producto.';
    }
  }

  function confirmarPedido() {
    if (!carrito.length) return;

    const stockInsuficiente = carrito.some(
      (elemento) => productos.find((producto) => producto.Codigo === elemento.producto.Codigo)!.Stock < elemento.cantidad,
    );

    if (stockInsuficiente) {
      alert('El stock cambió. Revisa tu carrito.');
      return;
    }

    const codigoPedido = 'SV-' + Math.floor(1000 + Math.random() * 9000);
    let productosActualizados = productos;

    for (const elemento of carrito) {
      const producto = productosActualizados.find((actual) => actual.Codigo === elemento.producto.Codigo);
      if (producto) {
        productosActualizados = repositorioProductos.actualizar(producto.Codigo, {
          Stock: producto.Stock - elemento.cantidad,
        });
      }
    }

    establecerProductos(productosActualizados);
    establecerCarrito([]);
    establecerCarritoAbierto(false);
    alert(`Pedido confirmado (demo). Código: ${codigoPedido}`);
  }

  const cantidadCarrito = carrito.reduce((total, elemento) => total + elemento.cantidad, 0);
  const esLogin = ubicacion.pathname === '/login';

  if (!sesion && !esLogin) return <Navigate to="/login" replace />;
  if (sesion && esLogin) return <Navigate to="/" replace />;

  const rol = sesion?.rol || 'CLIENTE';

  return (
    <>
      {sesion && (
        <Encabezado
          rol={rol}
          cantidadCarrito={cantidadCarrito}
          alAbrirCarrito={() => establecerCarritoAbierto(true)}
          cerrarSesion={cerrarSesion}
        />
      )}

      <Routes>
        <Route path="/login" element={<InicioSesion alIniciarSesion={iniciarSesion} />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo productos={productos} alAgregar={agregarAlCarrito} />} />
        <Route path="/producto/:codigo" element={<DetalleProducto productos={productos} alAgregar={agregarAlCarrito} />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route
          path="/stock"
          element={
            rol === 'ADMIN' || rol === 'VENDEDOR' ? (
              <Inventario
                productos={productos}
                alReabastecer={reabastecer}
                alCrear={crearProducto}
                alActualizar={actualizarProducto}
                alEliminar={eliminarProducto}
                rol={rol}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/usuarios"
          element={
            rol === 'ADMIN' ? (
              <Usuarios
                usuarios={usuarios}
                alCambiarEstado={(id) =>
                  establecerUsuarios((anteriores) =>
                    anteriores.map((usuario) =>
                      usuario.id === id
                        ? { ...usuario, estado: usuario.estado === 'Activo' ? 'Inactivo' : 'Activo' }
                        : usuario,
                    ),
                  )
                }
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {carritoAbierto && (
        <div className="fondo-modal" onClick={() => establecerCarritoAbierto(false)}>
          <section className="modal-carrito" onClick={(evento) => evento.stopPropagation()}>
            <div className="encabezado-carrito">
              <h2>Carrito de compras</h2>
              <button onClick={() => establecerCarritoAbierto(false)}>✕</button>
            </div>

            {carrito.length === 0 ? (
              <p className="texto-secundario vacio">Tu carrito está vacío.</p>
            ) : (
              carrito.map((elemento) => (
                <div className="linea-carrito" key={elemento.producto.Codigo}>
                  <span>
                    {elemento.producto.Nombre}
                    <small>
                      {elemento.cantidad} × {elemento.producto.Precio.toLocaleString('es-CL')} CLP
                    </small>
                  </span>
                  <b>{(elemento.cantidad * elemento.producto.Precio).toLocaleString('es-CL')} CLP</b>
                  <button
                    onClick={() =>
                      establecerCarrito((anterior) =>
                        anterior.filter((actual) => actual.producto.Codigo !== elemento.producto.Codigo),
                      )
                    }
                  >
                    Quitar
                  </button>
                </div>
              ))
            )}

            <div className="total-carrito">
              <span>Total</span>
              <b>
                {carrito
                  .reduce((total, elemento) => total + elemento.cantidad * elemento.producto.Precio, 0)
                  .toLocaleString('es-CL')} CLP
              </b>
            </div>

            <Boton className="ancho-completo" disabled={!carrito.length} onClick={confirmarPedido}>
              Confirmar pedido
            </Boton>
          </section>
        </div>
      )}
    </>
  );
}
