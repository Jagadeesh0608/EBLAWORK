import { Component, OnInit } from '@angular/core';
import { AutoLogoutService } from 'src/app/services/auto-logout.service';
@Component({
  selector: 'app-auto-logout',
  templateUrl: './auto-logout.component.html',
  styleUrls: ['./auto-logout.component.css']
})
export class AutoLogoutComponent implements OnInit {

  constructor(private autologoutService:AutoLogoutService) { }

  ngOnInit(): void {
    localStorage.setItem('lastAction', Date.now().toString())
  }

}
