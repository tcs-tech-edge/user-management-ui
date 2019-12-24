import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Login } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http:HttpClient) { }

  getUserToValidateLogin(userName:String):Observable<Login>{
    return this._http.get<Login>('../../assets/login.json');
  }

}
