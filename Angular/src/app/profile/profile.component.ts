import {Component, OnDestroy, OnInit} from '@angular/core';
import {Usuario} from "../shared/models/Usuario";
import {AuthService} from "../shared/auth/auth.service";
import {Subscription} from "rxjs";
import {ImageSnippet} from "../shared/utils/ImageSnippet";
import {ToastService} from "../shared/services/toast.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  usuarioSub: Subscription;

  constructor(private authService: AuthService, private toast: ToastService) { }

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

  async onSelectPropic(fileSelector: HTMLInputElement) {
    const file: File = fileSelector.files[0];
    const reader = new FileReader();

    await new Promise<string | ArrayBuffer>((resolve, reject) => {

      reader.readAsText(file);

      reader.onload = (e: any) => {

        if (typeof(reader.result) === typeof('') && typeof(e.target.result) === typeof('')) {
          const image = new ImageSnippet(e.target.result as string, reader.result as string, file);
          this.authService.updatePropic(image).then(res => {
            this.toast.toast("Foto de perfil atualizada com sucesso!");
          });
        }
      };
      reader.onerror = error => reject(error);

    });
  }
}
