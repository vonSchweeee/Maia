import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../feed/post.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  posts: Post[];

  ngOnInit(): void {
    this.posts = this.route.snapshot.data.posts;
    console.log(this.route.snapshot.data);
  }

}
