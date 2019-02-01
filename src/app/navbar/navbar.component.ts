import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  icon: boolean = false;


  constructor(public auth: AuthService, private router: Router, public breakpointobserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.breakpointobserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        this.icon = state.matches;

      });
  }

  logout() {
    this.auth.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }


}
