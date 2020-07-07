import { Injectable } from '@angular/core';
import {v4 as uuid} from "uuid";
import {HttpClient} from "@angular/common/http";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PartituraService {

  constructor(private http: HttpClient, private storage: AngularFireStorage) { }

  uploadPdf(pdf: File, artista: string | string[], nomeMusica: string, nomeUsuario: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const idArquivo = uuid();
      let task: AngularFireUploadTask;

      let path: string;
      if (typeof (artista) === "string")
        path = `pdf/partituras/${artista}/${nomeMusica}/${nomeUsuario}/${idArquivo}`;
      else {
        const artistasPath = artista.join('+');
        path = `pdf/partituras/${artistasPath}/${nomeMusica}/${nomeUsuario}/${idArquivo}`;
      }

      const ref = this.storage.ref(path);
      task = this.storage.upload(path, pdf);

      task.snapshotChanges().pipe(
        finalize(async () => {
          const url = await ref.getDownloadURL().toPromise();
          if (typeof (url) === "string")
            return resolve(url);
          else {
            reject("Não foi possível obter a url.");
          }
        }),
      ).subscribe();

    });
  }
}
