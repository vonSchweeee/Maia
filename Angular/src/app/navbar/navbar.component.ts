import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { Usuario } from '../shared/models/Usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  usuarioSub: Subscription;
  mobileView = false;
  searching = false;
  pesquisa = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuarioSub = this.authService.usuarioSubj
      .subscribe(usuario => this.usuario = usuario);
    this.mobileView = window.screen.width < 530;
  }

  ngOnDestroy() {
    if (this.usuarioSub) {
      this.usuarioSub.unsubscribe();
    }
  }

  onLogout() {
    console.log('saiu hein');
    this.authService.logout();
  }

  onSearch() {
    if (! this.searching) {
      this.searching = ! this.searching;
      setTimeout(() => {
        (document.querySelector('.input-pesquisa') as HTMLInputElement).focus();
      }, 250);
    }
    else {
      if (! this.pesquisa) {
        this.searching = ! this.searching;
      }
      else {
        if (this.pesquisa.startsWith('#')) {
          this.router.navigate([`/posts/tag/${this.pesquisa.replace('#', '')}`])
        }
        else {
          console.log('usuario');
        }
      }
    }
  }

}
