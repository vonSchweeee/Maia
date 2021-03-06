import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Usuario } from '../models/Usuario';
import { BASEURL } from '../settings/settings';
import {ImageSnippet} from "../utils/ImageSnippet";
import {ImageService} from "../services/image.service";

interface ILoginResponse {
  usuario: {
    id: number,
    email: string,
    nome: string,
    urlImagem?: string,
    role: 'adm' | 'user'
  };
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  usuarioSubj = new BehaviorSubject<Usuario>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private imageService: ImageService
    ) { }

  login(email: string, senha: string) {
    return this.http.post<ILoginResponse>(BASEURL + 'login', {email, senha})
      .pipe(catchError(this.handleError),
      tap(res => this.handleAuthentication(res, false)));
  }

  autoLogin() {
    const dadosUsuario = JSON.parse(localStorage.getItem('usuario'));
    if (! dadosUsuario) {
      return;
    }
    if (new Date() > new Date(dadosUsuario._tokenExp)) {
      localStorage.removeItem('usuario');
      return;
    }

    const usuario: Usuario = new Usuario(
      dadosUsuario.email, dadosUsuario.nome, dadosUsuario.urlImagem, dadosUsuario.id, dadosUsuario.role
    );
    usuario.token = dadosUsuario._token;

    if (usuario.token) {
      this._usuario = usuario;
      return this.usuarioSubj.next(usuario);
    }
  }

  logout() {
    this.usuarioSubj.next(null);
    this._usuario = null;
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    let errorMessage = 'Ocorreu um erro.';
    if (! error.error) {
      return throwError(errorMessage);
    }
    else {
      errorMessage = error.error;
      return throwError(errorMessage);
    }
  }

  private handleAuthentication(response: ILoginResponse, redirect: boolean) {
    const {id, email, nome, urlImagem, role} = response.usuario;
    const token = response.token;
    const usuario = new Usuario(email, nome, urlImagem, id, role);
    usuario.token = token;
    this.usuarioSubj.next(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    if (redirect) {
      this.router.navigate(['/feed']);
    }
  }

  get usuario() {

    if (this._usuario) {
      return new Usuario(
        this._usuario.email,
        this._usuario.nome,
        this._usuario.urlImagem,
        this._usuario.id
      );
    }
    else {
      return null;
    }
  }



  registrar(email: string, nome: string, senha: string) {
    const body = {email, nome, senha};
    return this.http.post<ILoginResponse>(BASEURL + 'registro', body)
      .pipe(tap(res => this.handleAuthentication(res, false)));
  }


  async updatePropic(image: ImageSnippet): Promise<Usuario> {
    return new Promise(((resolve, reject) => {
      this.imageService.uploadPropicUsuario(image, this.usuarioSubj.value.nome)
        .then(urlImagem => {
          this.http.patch<Usuario>(`${BASEURL}usuarios/propic`,
            {
              id: this.usuarioSubj.value.id,
              urlImagem
            }
          ).pipe(tap(res => {
            this.usuarioSubj.next(res);
            return resolve(res);
          })).subscribe();
        });
    }));
  }
}
