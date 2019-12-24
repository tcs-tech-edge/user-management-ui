import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class MemDbService implements InMemoryDbService{
  createDb(){
    let users = [
      
    ];

    return {
      users:users
    }
  }
}
