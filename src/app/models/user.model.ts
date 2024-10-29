export class User {
  id : string;
  usuario: string;
  email: string;
  telefono: string;
  contrasena: string;
  foto: string;


  constructor(id: string, usuario: string, email: string, telefono: string, contrasena: string, foto: string) {
    this.id = id;
    this.usuario = usuario;
    this.email = email;
    this.foto = foto;
    this.telefono = telefono;
    this.contrasena = contrasena;
  }
}
