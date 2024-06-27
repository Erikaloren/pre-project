// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';

// interface UserData {
//  name: string |null;
//  email: string |null;
//  password: string |null;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class  UserService {
//   constructor(private http: HttpClient) {}

//   createUser(userData: UserData) {
//     const apiUrl = 'http://localhost:3002/usuarios'; 
//     console.log("servicio:", userData)
//     return this.http.post<any>(apiUrl, userData);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
  name?: string;
  email?: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(userData: UserData) {
    const apiUrl = 'http://localhost:3002/usuarios';
    console.log("servicio:", userData)
    return this.http.post<any>(apiUrl, userData);
  }
}
