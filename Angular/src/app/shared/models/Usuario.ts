export class Usuario {
  private _token: string;
  private _tokenExp: Date;
  constructor(
    public email: string,
    public nome: string,
    public urlImagem?: string,
    public id?: number,
    public role?: 'adm' | 'user'
    ) { }

  set token(jwt: string) {
    this._token = jwt;
    const tokenInfo = JSON.parse(atob(jwt.split('.')[1]));
    this._tokenExp = new Date(+tokenInfo.exp * 1000);
  }

  get token() {
    if (new Date() > this._tokenExp) {
      return null;
    }
    return this._token;
  }

  get isAdm() {
    if (this.role === 'adm')
      return true;
    else
      return false;
  }

}
