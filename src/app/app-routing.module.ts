import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeadlinesComponent } from './headlines/headlines.component';
import { SearchComponent } from './search/search.component';
import { LikesComponent } from './likes/likes.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: 'headlines', component: HeadlinesComponent, canActivate: [AuthService] },
  { path: 'search', component: SearchComponent, canActivate: [AuthService] },
  { path: 'likes', component: LikesComponent, canActivate: [AuthService] },
  { path: 'login', component: LoginComponent, canActivate: [AuthService] },
  { path: '', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
