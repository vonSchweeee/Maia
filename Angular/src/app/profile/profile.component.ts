import {Component, OnDestroy, OnInit} from '@angular/core';
import {Usuario} from "../shared/models/Usuario";
import {AuthService} from "../shared/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  usuarioSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.usuarioSubj.subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  ngOnDestroy() {
    if (this.usuarioSub) {
      this.usuarioSub.unsubscribe();
    }
  }

  onSelectPropic(fileSelector: HTMLInputElement) {
    console.log(fileSelector.files[0]);
  }
}
