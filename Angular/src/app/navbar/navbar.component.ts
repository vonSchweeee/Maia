import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { Usuario } from '../shared/models/Usuario';
import {MusicaService} from "../musica/musica.service";
import {SearchService} from "../search/search.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  usuarioSub: Subscription;
  searching = false;
  searchSub: Subscription;
  pesquisa = '';
  admin = false;

  constructor(private authService: AuthService, private router: Router, private searchService: SearchService) {
    this.admin = authService.usuarioSubj.value.isAdm;
  }

  ngOnInit() {
    this.usuarioSub = this.authService.usuarioSubj
      .subscribe(usuario => this.usuario = usuario);
    this.searchSub = this.searchService.searchSubj.subscribe(value => this.pesquisa = value);
  }

  ngOnDestroy() {
    if (this.usuarioSub)
      this.usuarioSub.unsubscribe();
    if (this.searchSub)
      this.searchSub.unsubscribe();

  }

  onLogout() {
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
          this.router.navigate([`/posts/tag/${this.pesquisa.replace('#', '')}`]);
        }
        else {
          this.router.navigate(['/musicas'], {queryParams: { nome: this.pesquisa }});
        }
      }
    }
  }

  onCancelSearch() {
    this.searching = false;
    this.searchService.searchSubj.next(null);
  }

  onKeyPress($event: KeyboardEvent) {
    if ($event.key !== "Enter")
      return;
    else {
      this.onSearch();
    }
  }

  onNavigate() {
    this.searchService.searchSubj.next(null);
    this.searching = false;
  }
}
