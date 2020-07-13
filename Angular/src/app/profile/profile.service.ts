import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../shared/models/Usuario";
import {BASEURL} from "../shared/settings/settings";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  fetchUsuarioById(id: number) {
    return this.http.get<Usuario>(`${BASEURL}usuario/id/${id}`);
  }
}
