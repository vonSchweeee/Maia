export class Musica {
  constructor(
    public titulo: string,
    public duracao: string,
    public urlSpotify: string,
    public single: boolean = false,
    public faixa?: number,
    public dataLanc?: Date,
    public urlImagem?: string,
    public mediaNota?: number,
    public id?: number,
    public quantAvaliacoes?: number
  ) { }
}
