export type Rol = 'CLIENTE' | 'VENDEDOR' | 'ADMIN';

export type Producto = {
  Codigo: string;
  Categoria: string;
  Nombre: string;
  Marca: string;
  Modelo: string;
  Stock: number;
  Precio: number;
  Imagen: string;
};

export type Usuario = {
  id: number;
  nombreUsuario: string;
  correo: string;
  contrasena: string;
  rol: Rol;
  estado: 'Activo' | 'Inactivo';
};
