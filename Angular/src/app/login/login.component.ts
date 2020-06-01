import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatInput } from '@angular/material/input';

import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('emailInput', {static: true}) inputEmail: ElementRef<MatInput>;

  constructor(private authService: AuthService) { }

  ngAfterViewInit() {
    console.log(this.inputEmail);
    this.inputEmail.nativeElement.focus();
  }

  onLogin(form: NgForm) {
    const {email, senha} = form.value;
    console.log(form.value);
    this.authService.login(email, senha).subscribe();
  }

}
