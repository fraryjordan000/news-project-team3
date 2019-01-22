import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeadlinesComponent } from './headlines/headlines.component';
import { SearchComponent } from './search/search.component';
import { LikesComponent } from './likes/likes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeadlinesComponent,
    SearchComponent,
    LikesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
