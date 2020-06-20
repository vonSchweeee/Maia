import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { ImageSnippet } from '../utils/ImageSnippet';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private storage: AngularFireStorage) {}

  uploadImageArtista(image: ImageSnippet, nomeArtista: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let task: AngularFireUploadTask;

      // Função para substituir qualquer caractere special, acento, espaço ou qualquer coisa
      // diferenciada por um caractere normal, e espaço por traço.
      nomeArtista = nomeArtista.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z ]/g, "")
        .trim().replace(/\s+/g, '-').toLowerCase();

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

}
