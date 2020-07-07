import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import {fader, slider, stepper, transformer} from './route-animations';

import { AuthService } from './shared/auth/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {ToastService} from "./shared/services/toast.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    // fader,
    slider,
    // transformer,
    // stepper
  ]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private toast: ToastService) { }

  navbarVisible = false;

  ngOnInit() {
    this.authService.autoLogin();
    this.authService.usuarioSubj.subscribe(usuario => {
      if (!!usuario) {
        this.router.events.subscribe(e => {
          if (e instanceof NavigationEnd) {
            this.navbarVisible = !(e.url.includes('login') || e.url.includes('registro'));
          }
        });
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
