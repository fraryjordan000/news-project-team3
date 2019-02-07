import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeadlinesComponent } from './headlines/headlines.component';
import { SearchComponent } from './search/search.component';
import { LikesComponent } from './likes/likes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleComponent } from './shared/article/article.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';


import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';


import {
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule,
  MatSelectModule,
  MatFormFieldModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeadlinesComponent,
    SearchComponent,
    LikesComponent,
    NavbarComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatTabsModule,
    NgxSpinnerModule,
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
