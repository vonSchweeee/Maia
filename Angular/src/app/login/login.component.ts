import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('emailInput') inputEmail: ElementRef<MatInput>;

  constructor() { }

  ngAfterViewInit() {
    console.log(this.inputEmail);
    this.inputEmail.nativeElement.focus();
  }

}
