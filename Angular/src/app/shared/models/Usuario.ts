export class Usuario {
  constructor(
    public email: string,
    public nome: string,
    public senha: string,
    public urlImagem?: string,
    public usuarioId?: number,
    ) { }
}
