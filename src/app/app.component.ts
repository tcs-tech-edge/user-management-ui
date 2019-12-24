import { Component, OnInit } from '@angular/core';
import { NavbarService } from './services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  links: Array<{ text: string, path: string }>;
  isLoggedIn = false;

  constructor(private router: Router, private navbarService: NavbarService){

  }

  ngOnInit(){
    this.links = this.navbarService.getLinks();
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  logout() {
    console.log("logOut clicked");
    
    this.navbarService.updateLoginStatus(false);
    this.router.navigate(['login']);
  }
}
