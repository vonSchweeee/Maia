import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { PostScreenComponent } from './feed/post-screen/post-screen.component';
import { PostWriterComponent } from './feed/post-writer/post-writer.component';
import { CommentComponent } from './feed/post/comment/comment.component';
import { PostComponent } from './feed/post/post.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistroComponent } from './registro/registro.component';
import { SearchComponent } from './search/search.component';
import { AuthInterceptorService } from './shared/auth/auth-interceptor.service';
import {CommentFormComponent} from "./feed/post/comment-form/comment-form.component";


@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      RegistroComponent,
      LoginComponent,
      FeedComponent,
      NavbarComponent,
      PostComponent,
      PostScreenComponent,
      SearchComponent,
      PostWriterComponent,
      CommentComponent,
     CommentFormComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MaterialModule,
   ],
   providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
