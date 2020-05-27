import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Usuario } from '../shared/models/Usuario';

@Component({
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private http: HttpClient) { }

  usuario = new Usuario('', '', '');

  ngOnInit(): void {
  }

  registrar() {
    this.http.post<Usuario>('https://localhost:5001/usuario', this.usuario).subscribe(usuario => {
      console.log(usuario);
    }, erro => console.log);
  }

}
