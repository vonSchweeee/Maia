import {Musica} from "./Musica";
import {Usuario} from "./Usuario";

export abstract class AnotacaoMusical {
  public id?: number;
  public musicaId: number;
  public musica?: Musica;
  public usuarioId: number;
  public usuario?: Usuario;


  constructor(musicaId: number, usuarioId: number, usuario?: Usuario, musica?: Musica, id?: number) {
    this.musicaId = musicaId;
    this.musica = musica;
    this.usuarioId = usuarioId;
    this.usuario = usuario;
    this.musica = musica;
    this.id = id;
  }
}
