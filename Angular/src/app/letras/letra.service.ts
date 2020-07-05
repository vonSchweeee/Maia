import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Letra} from "../shared/models/Letra";
import {BASEURL} from "../shared/settings/settings";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LetraService {

  constructor(private http: HttpClient) { }

  public fetchLetras(musicaId: number): Observable<Letra[]> {
    return this.http.get<Letra[]>(`${BASEURL}letras?musicaId=${musicaId}`);
  }
}
