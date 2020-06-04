import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('emailInput', {static: true}) inputEmail: ElementRef<MatInput>;
  private userSub: Subscription;
  loading = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngAfterViewInit() {
    console.log(this.inputEmail);
    this.inputEmail.nativeElement.focus();
  }

  ngOnInit() {
    this.userSub = this.authService.usuarioSubj.subscribe(usuario => {
      if (usuario) {
        this.openSnackBar(`Seja bem-vindo, ${usuario.nome}!`, 'Ok.');
      }
    });
  }

  onLogin(form: NgForm) {
    const {email, senha} = form.value;
    this.loading = true;
    this.authService.login(email, senha).subscribe(usuario => {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }, erro => {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000
    });
    setTimeout(() => {
      this.router.navigate(['/feed']);
    }, 1100);
  }
  ngOnDestroy() {
  if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
