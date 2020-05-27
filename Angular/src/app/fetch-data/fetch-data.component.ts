import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { Usuario } from '../shared/models/Usuario';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public usuarios: Usuario[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Usuario[]>(baseUrl + 'usuario').subscribe(result => {
      this.usuarios = result;
    }, error => console.error(error));
  }
}
