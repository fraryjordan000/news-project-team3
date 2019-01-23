import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

import { ApiFetchService } from 'src/app/api-fetch.service';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, public http: ApiFetchService) { }

  ngOnInit() {
  }

}
