import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:any
  constructor() { }
  setIsloggedIn(val:any) {
    this.loggedIn = val;
  }
  isLoggedIn() {
    return this.loggedIn
  }
}
