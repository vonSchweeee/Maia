import {AnotacaoMusical} from "./AnotacaoMusical";
import {Usuario} from "./Usuario";
import {Musica} from "./Musica";

export class Tab extends AnotacaoMusical {
  public titulo: string;
  public texto: string;
  public textoHtml: string;
  public afinacao: string;
  public descricao: string;

  constructor(
    musicaId: number,
    usuarioId: number,
    usuario: Usuario, musica: Musica,
    id: number,
    titulo: string,
    texto: string,
    textoHtml: string,
    afinacao: string,
    descricao: string
  ) {
    super(musicaId, usuarioId, usuario, musica, id);
    this.titulo = titulo;
    this.texto = texto;
    this.textoHtml = textoHtml;
    this.afinacao = afinacao;
    this.descricao = descricao;
  }
}
