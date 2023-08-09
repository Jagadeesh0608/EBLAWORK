import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRoute:any
  navbar: boolean = false;
  constructor(private route:ActivatedRoute, private router: Router) {
  
  router.events.pipe(filter((event:any) => event instanceof NavigationEnd))
  .subscribe((event:any) => 
   {
      this.currentRoute = event.url;
      if(this.currentRoute === '/login') {
        this.navbar= false;
      } else {
        this.navbar= true
      }        
      console.log(event);
   });
  }
  title = 'EBLA_WORK';
  isLoggedIn:boolean | undefined;
  
}
