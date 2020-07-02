import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';

@Component({
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  errorMessage: string;
  loading = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  registrar(f: NgForm) {
    this.loading = true;
    const { email, nome, senha, confirmSenha } = f.value;
    if (senha !== confirmSenha)
      return this.errorMessage = "As senhas não coincidem.";
    this.errorMessage = null;

    this.authService.registrar(email, nome, senha).subscribe(res => {
      this.openSnackBar(`Usuário ${res.usuario.nome} registrado com sucesso!`, 'Ok.', 1500);
    }, erro => {
      console.log(erro);
      this.openSnackBar(`Erro ao registrar usuário!`, 'Ok.', 3500, true);
      this.loading = false;
    });
  }

  openSnackBar(message: string, action: string, duration: number, error: boolean = false) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: [error ? 'snackbar-error' : 'snackbar-success']
    });
    if (! error)
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/feed']);
      }, 1100);
  }
}
