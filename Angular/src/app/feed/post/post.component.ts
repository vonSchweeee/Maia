import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  dataPost = moment().format('HH:mm');

  constructor() { }

  ngOnInit(): void {
  }

}
