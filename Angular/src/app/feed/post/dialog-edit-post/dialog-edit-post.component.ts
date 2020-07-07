import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../post.model";

@Component({
  selector: 'app-dialog-edit-post',
  templateUrl: './dialog-edit-post.component.html',
  styleUrls: ['./dialog-edit-post.component.css']
})
export class DialogEditPostComponent implements OnInit {
  tag: string;
  post: Post;

  constructor(public dialogRef: MatDialogRef<DialogEditPostComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { post: Post }) { }

  ngOnInit(): void {
    this.post = {...this.data.post, tags: [...this.data.post.tags]};

    // Evitar erros de persistência no EF ao enviar a resposta
    delete this.post.usuario;
  }

  onDismiss() {
    this.dialogRef.close();
  }

  onRemoveTag(tag: string) {
    this.post.tags.splice(this.post.tags.indexOf(tag), 1);
  }

  onAddTag() {
    this.post.tags.push(''.concat(this.tag));
    this.tag = '';
  }
}
