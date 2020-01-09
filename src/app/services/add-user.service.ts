import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<User[]> {
    // return this._http.get<User[]>("http://mybackend.com/api/users");

    const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('user1:secret1')});
    return this._http.get<User[]>('http://localhost:8080/user/list', {headers});
  }

  addUser(u: User): Observable<number> {
    const hh = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Basic ' + btoa('user1:secret1')
    });

    // return this._http.post("http://mybackend.com/api/users", u, {
    return this._http.post('http://localhost:8080/user/add', u, {
      headers: hh,
      observe: 'response'
    }).pipe(
      map(res => res.status),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

}
