import { Usuario } from '../shared/models/Usuario';
import { Comentario } from './comentario.model';

export class Post {
  constructor(
    public titulo: string,
    public texto: string,
    public tags: string[],
    public usuarioId?: number,
    public dataPub?: Date,
    public usuario?: Usuario,
    public comentarios?: Comentario[],
    public musicaId?: number,
    public albumId?: number,
    public id?: number,
    public quantCmt?: number,
    public quantFav?: number,
    public favoritado?: boolean
  ) { }

  // setUsuario(usuario: Usuario) {
  //   if (usuario.id)
  //   {
  //     this.usuario = usuario;
  //   }
  //   else
  //   {
  //     throw new Error('Id de usuário nulo');
  //   }
  // }
}
