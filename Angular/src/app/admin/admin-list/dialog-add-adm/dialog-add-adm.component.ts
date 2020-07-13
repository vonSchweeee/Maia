import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminService} from "../../admin.service";
import {Usuario} from "../../../shared/models/Usuario";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-dialog-add-adm',
  templateUrl: './dialog-add-adm.component.html',
  styleUrls: ['./dialog-add-adm.component.css']
})
export class DialogAddAdmComponent implements OnInit {

  pesquisa: string;
  timeOut: NodeJS.Timeout;
  cancelTimeOut = false;
  usuarios: Usuario[];
  nenhumResultado = false;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAddAdmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private admService: AdminService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  }

  onDismiss() {
    this.dialogRef.close();
  }

  onInputKeyPress(event: KeyboardEvent) {
    clearTimeout(this.timeOut);
    if (event.key === "Enter") {
      this.cancelTimeOut = true;
      this.admService.fetchUsuariosByNome(this.pesquisa)
        .subscribe(usuarios => {
          this.usuarios = usuarios;
          if (! this.usuarios.length)
            this.nenhumResultado = true;
          else
            this.nenhumResultado = false;

          this.cancelTimeOut = false;
        });
    }
    if (! this.cancelTimeOut) {
      this.timeOut = setTimeout(() => {
        this.admService.fetchUsuariosByNome(this.pesquisa)
          .subscribe(usuarios => {
            this.usuarios = usuarios;
            if (! this.usuarios.length)
              this.nenhumResultado = true;
            else
              this.nenhumResultado = false;
          });
      }, 2000);
    }
  }

  onAddAdm(usuario: Usuario) {
    this.admService.setUsuarioAsAdm(usuario)
      .subscribe(() => {
        this.toast.toast("Administrador adicionado com sucesso!", 1500);
        this.dialogRef.close(usuario);
      },
      error => {
        this.toast.toast("Erro ao alterar cargo do usuário.", 2500, "OK", true);
        this.loading = false;
      });
  }
}
