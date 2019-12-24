import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AddUserService } from '../services/add-user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  uList:User[];

  constructor(private _userSvc:AddUserService, private _router:Router) { }

  ngOnInit() {
    this._userSvc.getUsers().subscribe(userList => {
      this.uList = userList;
    })
  }

  getUserList():User[]{
    return this.uList;
  }

  goToAddUser(){
    this._router.navigateByUrl('addUser');
  }
}
