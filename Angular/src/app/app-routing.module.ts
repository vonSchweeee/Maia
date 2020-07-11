import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FeedComponent} from './feed/feed.component';
import {PostResolverService} from './feed/post-screen/post-resolver.service';
import {PostScreenComponent} from './feed/post-screen/post-screen.component';
import {LoginComponent} from './login/login.component';
import {SearchResolverService} from './search/search-resolver.service';
import {SearchComponent} from './search/search.component';
import {AuthGuard} from './shared/auth/auth.guard';
import {LetrasComponent} from './letras/letras.component';
import {AdminGuard} from './shared/auth/admin.guard';
import {AdminComponent} from './admin/admin.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {MusicasManagementComponent} from './admin/musicas-management/musicas-management.component';
import {ArtistasManagementComponent} from './admin/artistas-management/artistas-management.component';
import {AlbunsManagementComponent} from './admin/albuns-management/albuns-management.component';
import {ListaArtistaManagementComponent} from './admin/artistas-management/lista-artista-management/lista-artista-management.component';
import {AddArtistaComponent} from './admin/artistas-management/add-artista/add-artista.component';
import {ListaMusicaManagementComponent} from './admin/musicas-management/lista-musica-management/lista-musica-management.component';
import {AddMusicaComponent} from './admin/musicas-management/add-musica/add-musica.component';
import {ListaAlbumManagementComponent} from './admin/albuns-management/lista-album-management/lista-album-management.component';
import {AddAlbumComponent} from './admin/albuns-management/add-album/add-album.component';
import {RegistroComponent} from "./registro/registro.component";
import {MusicaComponent} from './musica/musica.component';
import {LetraComponent} from "./letras/letra/letra.component";
import {AddLetraComponent} from "./letras/add-letra/add-letra.component";
import {LetraResolverService} from "./letras/letra/letra-resolver.service";
import {AddLetraResolverService} from "./letras/add-letra/add-letra-resolver.service";
import {LetrasResolverService} from "./letras/letras-resolver.service";
import {TabsComponent} from "./tabs/tabs.component";
import {TabsResolverService} from "./tabs/tabs-resolver.service";
import {TabComponent} from "./tabs/tab/tab.component";
import {TabsMusicaComponent} from "./tabs/tabs-musica/tabs-musica.component";
import {AddTabComponent} from "./tabs/add-tab/add-tab.component";
import {TabResolverService} from "./tabs/tab/tab-resolver.service";
import {TabsMusicaResolverService} from "./tabs/tabs-musica/tabs-musica-resolver.service";
import {AddTabResolverService} from "./tabs/add-tab/add-tab-resolver.service";
import {SearchMusicaComponent} from "./search-musica/search-musica.component";
import {SearchMusicaResolverService} from "./search-musica/search-musica-resolver.service";
import {PartiturasResolverService} from "./partituras/partituras-resolver.service";
import {PartiturasComponent} from "./partituras/partituras.component";
import {PartituraComponent} from "./partituras/partitura/partitura.component";
import {PartituraResolverService} from "./partituras/partitura/partitura-resolver.service";
import {PartiturasMusicaResolverService} from "./partituras/partituras-musica/partituras-musica-resolver.service";
import {PartiturasMusicaComponent} from "./partituras/partituras-musica/partituras-musica.component";
import {AddPartituraComponent} from "./partituras/add-partitura/add-partitura.component";
import {AddPartituraResolverService} from "./partituras/add-partitura/add-partitura-resolver.service";
import {ProfileComponent} from "./profile/profile.component";
import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";
import {MusicaEditResolverService} from "./admin/musicas-management/musica-edit-resolver.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
  {
    path: 'posts', canActivate: [AuthGuard], children: [
      {path: 'tag/:id', component: SearchComponent, resolve: {posts: SearchResolverService}},
      {path: 'id/:id', component: PostScreenComponent, resolve: {post: PostResolverService}},
    ]
  },
  {
    path: 'letras', canActivate: [AuthGuard], children: [
      {path: '', component: LetrasComponent, resolve: {musicas: LetrasResolverService}},
      {path: 'id/:id', component: LetraComponent, resolve: {letras: LetraResolverService}},
      {path: 'add/id/:id', component: AddLetraComponent, resolve: {response: AddLetraResolverService}},
    ]
  },
  {
    path: 'tabs', canActivate: [AuthGuard], children: [
      {path: '', component: TabsComponent, resolve: {tabs: TabsResolverService}},
      {path: 'id/:id', component: TabComponent, resolve: { tab: TabResolverService }},
      {path: 'musica/:id', component: TabsMusicaComponent, resolve: { tabs: TabsMusicaResolverService }},
      {path: 'add/musica/:id', component: AddTabComponent, resolve: { musica: AddTabResolverService }}
    ]
  },
  {
    path: 'partituras', canActivate: [AuthGuard], children: [
      {path: '', component: PartiturasComponent, resolve: {partituras: PartiturasResolverService}},
      {path: 'id/:id', component: PartituraComponent, resolve: { partitura: PartituraResolverService }},
      {path: 'musica/:id', component: PartiturasMusicaComponent, resolve: { partituras: PartiturasMusicaResolverService }},
      {path: 'add/musica/:id', component: AddPartituraComponent, resolve: { musica: AddPartituraResolverService }}
    ]
  },
  {
    path: 'admin', canActivate: [AdminGuard], component: AdminComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: AdminDashboardComponent},
      {
        path: 'artistas', children: [
          {path: '', component: ArtistasManagementComponent},
          {path: 'lista', component: ListaArtistaManagementComponent},
          {path: 'add', component: AddArtistaComponent}
        ]
      },
      {
        path: 'albuns', children: [
          {path: '', component: AlbunsManagementComponent},
          {path: 'lista', component: ListaAlbumManagementComponent},
          {path: 'add', component: AddAlbumComponent}
        ]
      },
      {
        path: 'musicas', children: [
          {path: '', component: MusicasManagementComponent},
          {path: 'lista', component: ListaMusicaManagementComponent},
          {path: 'add', component: AddMusicaComponent},
          {path: 'editar/:id', component: AddMusicaComponent, resolve: { musica: MusicaEditResolverService}}
        ]
      },
    ]
  },
  {path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'registro', component: RegistroComponent},
  {path: 'musicas', canActivate: [AuthGuard], component: SearchMusicaComponent, resolve: {musicas: SearchMusicaResolverService}},
  {path: 'musica/:id', canActivate: [AuthGuard], component: MusicaComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
