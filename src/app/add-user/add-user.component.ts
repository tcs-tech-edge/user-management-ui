import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AddUserService } from '../services/add-user.service';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  private user:User = new User();

  constructor(private _userSvc:AddUserService, private _router:Router) { }

  ngOnInit() {
  }

  formSubmitted:boolean = false;
  responseReceived:boolean = false;
  addUserResponse:String = "";

  addUser(userForm:NgForm){
    console.log("Inside Add User");

    this.formSubmitted = true;
    if(userForm.valid){
      
      let uArray:User[] = new Array<User>();

      this._userSvc.getUsers().subscribe(userList => {
        uArray = userList;
      })

      console.log("Existing User length = "+uArray.length);

      let newUser = new User();
      newUser.id = uArray.length + 1;
      newUser.firstName = userForm.controls['fname'].value;
      newUser.lastName = userForm.controls['lname'].value;

      this._userSvc.addUser(newUser).subscribe(statusCode => {
        console.log("The response is: "+statusCode);
        this.responseReceived = true;
        this.addUserResponse = "User added successfully";
        this._router.navigateByUrl('listUser');
      });

      userForm.reset();
      this.formSubmitted = false;
    }
  }


  getValidationMessages(state: any, thingName?: string) {
    let thing: string = state.path || thingName;

    if(thing == "fname"){
      thing = "First Name";
    }else if(thing == "lname"){
      thing = "Last Name";
    }

    let messages: string[] = [];
    if (state.errors) {
        for (let errorName in state.errors) {
            switch (errorName) {

                case "required":
                    messages.push(`You must enter a ${thing}`);
                    break;
                case "pattern":
                    messages.push(`${thing} is not valid. Accepts only alphabets and space`);
                    break;
            }
        }
    }
    return messages;
  }
}
