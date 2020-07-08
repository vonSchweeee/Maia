import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import {catchError, finalize, tap} from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { ImageSnippet } from '../utils/ImageSnippet';
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private storage: AngularFireStorage) {}

  uploadImageArtista(image: ImageSnippet, nomeArtista: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let task: AngularFireUploadTask;

      nomeArtista = this.normalizarString(nomeArtista);

      const idImagem = uuid();
      const path = `img/artistas/${nomeArtista}/${idImagem}`;
      const ref = this.storage.ref(path);
      task = this.storage.upload(path, image.file);

      task.snapshotChanges().pipe(
        finalize(async () => {
          const url = await ref.getDownloadURL().toPromise();
          if (typeof(url) === "string")
            return resolve(url);
          else {
            reject("Não foi possível obter a url.");
          }
        }),
      ).subscribe();
    });
  }

  uploadImageAlbum(image: ImageSnippet, nomeAlbum: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let task: AngularFireUploadTask;
      nomeAlbum = this.normalizarString(nomeAlbum);

      const idImagem = uuid();
      const path = `img/artistas/${nomeAlbum}/${idImagem}`;
      const ref = this.storage.ref(path);
      task = this.storage.upload(path, image.file);

      task.snapshotChanges().pipe(
        finalize(async () => {
          const url = await ref.getDownloadURL().toPromise();
          if (typeof(url) === "string")
            return resolve(url);
          else {
            reject("Não foi possível obter a url.");
          }
        }),
      ).subscribe();
    });
  }

  uploadImageSingle(image: ImageSnippet, nomeMusica: string, nomeArtista: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let task: AngularFireUploadTask;
        nomeMusica = this.normalizarString(nomeMusica);

        const idImagem = uuid();
        const path = `img/artistas/${nomeArtista}/singles/${nomeMusica}/${idImagem}`;
        const ref = this.storage.ref(path);
        task = this.storage.upload(path, image.file);

        task.snapshotChanges().pipe(
          finalize(async () => {
            const url = await ref.getDownloadURL().toPromise();
            if (typeof (url) === "string")
              return resolve(url);
            else {
              reject("Não foi possível obter a url.");
            }
          }),
        ).pipe(catchError(erro => throwError(erro)))
          .subscribe();
      }
      catch (e) {
        reject(e);
      }
    });
  }

  // Função para substituir qualquer caractere special, acento, espaço ou qualquer coisa
  // diferenciada por um caractere normal, e espaço por traço.
  private normalizarString(stringParaNormalizar: string): string {
    return stringParaNormalizar.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z ]/g, "")
      .trim().replace(/\s+/g, '-').toLowerCase();
  }

  uploadPropicUsuario(image: ImageSnippet, nomeUsuario: string) {
    return new Promise((resolve, reject) => {
      try {
        let task: AngularFireUploadTask;

        const idImagem = uuid();
        nomeUsuario = this.normalizarString(nomeUsuario);
        const path = `img/usuarios/${nomeUsuario}/${idImagem}`;
        const ref = this.storage.ref(path);
        task = this.storage.upload(path, image.file);

        task.snapshotChanges().pipe(
          finalize(async () => {
            const url = await ref.getDownloadURL().toPromise();
            if (typeof (url) === "string")
              return resolve(url);
            else {
              reject("Não foi possível obter a url.");
            }
          }),
        ).pipe(catchError(erro => throwError(erro)))
          .subscribe();
      }
      catch (e) {
        reject(e);
      }
    });
  }
}
