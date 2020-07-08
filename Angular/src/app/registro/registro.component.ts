import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';
import {ToastService} from "../shared/services/toast.service";

@Component({
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  errorMessage: string;
  loading = false;

  constructor(private authService: AuthService, private toast: ToastService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar(f: NgForm) {
    this.loading = true;
    const { email, nome, senha, confirmSenha } = f.value;
    if (senha !== confirmSenha) {
      this.loading = false;
      return this.errorMessage = "As senhas não coincidem.";
    }
    this.errorMessage = null;

    this.authService.registrar(email, nome, senha).subscribe(res => {
      this.toast.toast(`Usuário ${res.usuario.nome} registrado com sucesso!`, 1500, "OK").afterDismissed()
        .subscribe(() => {
          this.loading = false;
          this.router.navigate(['/feed']);
        });
    }, erro => {
      console.log(erro);
      this.toast.toast(`Erro ao registrar usuário!`, 3500, "OK", true);
      this.loading = false;
    });
  }
}
