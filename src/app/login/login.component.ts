import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Login } from '../model/login.model';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSubmitted: boolean = false;
  invalidUser: boolean = false;
  wrongPassword: boolean = false;

  private lgn: Login = new Login();

  isLoggedIn = false;

  constructor(private router:Router,
    private _lgService: LoginService,
    private navbarService: NavbarService) { 
      this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  ngOnInit() {
  }

  validateAndLogin(loginForm: NgForm) {

    this.formSubmitted = true;
    this.invalidUser = false;
    this.wrongPassword = false;

    if (loginForm.valid) {

      let userName = loginForm.controls['emailId'].value;
      let password = loginForm.controls['password'].value;

      this._lgService.getUserToValidateLogin(userName).subscribe(userInfoObject => {
        console.log("Username from service is: " + userInfoObject.emailId);
        console.log("Password from service is: " + userInfoObject.password);

        if (userInfoObject.password == undefined) {
          console.log("INVALID USER");
          this.invalidUser = true;
        } else {
          console.log("VALID USER");

          if (password == userInfoObject.password) {
            this.navbarService.updateLoginStatus(true);
            this.navbarService.updateNavAfterAuth();
            this.router.navigateByUrl('addUser');
          } else {
            console.log("WRONG PASSWORD");
            this.wrongPassword = true;
          }
        }
      }
      );
    }
  }

  getValidationMessages(state: any, thingName?: string) {
    let thing: string = state.path || thingName;
    let messages: string[] = [];
    if (state.errors) {
        for (let errorName in state.errors) {
            switch (errorName) {
                case "required":
                    messages.push(`You must enter a ${thing}`);
                    break;
                case "pattern":
                    messages.push(`The ${thing} is not valid`);
                    break;
            }
        }
    }
    return messages;
  }

}
