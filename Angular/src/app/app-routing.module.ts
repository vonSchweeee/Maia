import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedComponent } from './feed/feed.component';
import { PostResolverService } from './feed/post-screen/post-resolver.service';
import { PostScreenComponent } from './feed/post-screen/post-screen.component';
import { LoginComponent } from './login/login.component';
import { SearchResolverService } from './search/search-resolver.service';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './shared/auth/auth.guard';
import {LetrasComponent} from './letras/letras.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
  {path: 'posts', canActivate: [AuthGuard], children: [
    {path: 'tag/:id', component: SearchComponent, resolve: { posts: SearchResolverService }},
    {path: ':id', component: PostScreenComponent, resolve: { post: PostResolverService }},
  ]},
  {path: 'letras', canActivate: [AuthGuard], children: [
    {path: '', component: LetrasComponent}
  ]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
