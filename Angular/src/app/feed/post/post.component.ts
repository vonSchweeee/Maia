import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';

import { FeedService } from '../feed.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {

  dataPost = moment().format('HH:mm');
  @Input() post: Post;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.feedService.deletePost(this.post.postId).subscribe(() => console.log('deletado'));
  }

}
