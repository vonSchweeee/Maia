import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-screen',
  templateUrl: './post-screen.component.html',
  styleUrls: ['./post-screen.component.css']
})
export class PostScreenComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  post: Post;

  ngOnInit(): void {
    this.post = this.route.snapshot.data.post;
  }

}
