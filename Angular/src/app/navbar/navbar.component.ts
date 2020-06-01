import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth/auth.service';
import { Usuario } from '../shared/models/Usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: Usuario;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.usuario = this.authService.usuario;
  }

  onLogout() {
    console.log('saiu hein');
    this.authService.logout();
  }

}
