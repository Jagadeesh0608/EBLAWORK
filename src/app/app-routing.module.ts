import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import {Auth2Guard}  from './services/auth2.guard'
const routes: Routes = [
  {
    path:'login',component:LoginComponent,canActivate: [Auth2Guard]
  },
  {
    path:'home',component:HomeComponent,canActivate: [AuthGuard]
  },
  {
    path:'', redirectTo:'/login',pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
