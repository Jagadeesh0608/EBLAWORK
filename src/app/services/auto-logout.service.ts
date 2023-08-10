import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
   MINUTES_UNITL_AUTO_LOGOUT = 5 // in mins
  CHECK_INTERVAL = 15000 // in ms
  STORE_KEY = 'lastAction';
  constructor(private router: Router,
    private authService:AuthService) {
    console.log('object created');
    this.check();
    this.initListener();
    this.initInterval();
  }
  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, this.CHECK_INTERVAL);
  }
  check() {
    const now = Date.now();
    const timeleft:any = parseInt(this.getLastAction()) + this.MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout) {
      localStorage.clear();
      sessionStorage.clear()
      this.authService.setIsloggedIn(false)
      this.router.navigate(['/login']);
    }
  }
  public getLastAction():any {
   let data = localStorage.getItem(this.STORE_KEY);
   return data
  }
  public setLastAction(lastAction: number) {
    localStorage.setItem(this.STORE_KEY, lastAction.toString());
  }
}
