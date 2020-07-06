import {AnotacaoMusical} from "./AnotacaoMusical";
import {Usuario} from "./Usuario";
import {Musica} from "./Musica";

export type instrumento = 'Baixo' | 'Violao' | 'Guitarra';

export class Tab extends AnotacaoMusical {
  public titulo: string;
  public texto: string;
  public textoHtml: string;
  public afinacao: string;
  public descricao: string;
  public instrumento: instrumento;

  constructor(
    musicaId: number,
    usuarioId: number,
    titulo: string,
    texto: string,
    textoHtml: string,
    afinacao: string,
    descricao: string,
    instrumento: instrumento,
    usuario?: Usuario,
    musica?: Musica,
    id?: number
  ) {
    super(musicaId, usuarioId, usuario, musica, id);
    this.titulo = titulo;
    this.texto = texto;
    this.textoHtml = textoHtml;
    this.afinacao = afinacao;
    this.descricao = descricao;
    this.instrumento = instrumento;
  }
}
