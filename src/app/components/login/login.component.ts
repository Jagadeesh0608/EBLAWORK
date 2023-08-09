import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  showPassword: boolean = false;
  invalidLogin:any;
  constructor(private formBuilder: FormBuilder,
    private httpClient:HttpClient,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let loggedInData = this.loginForm.value
      this.httpClient.get('assets/users.json').subscribe(res => {
        console.log(res,this.loginForm.value)
        let usersData:any = res;
         usersData.forEach((user:any)=> {
         if(user.userName == loggedInData.username) {
          if(user.password == loggedInData.password) {
            sessionStorage.setItem('token',this.generatingToken(100))
             this.router.navigate(['home']);
             this.invalidLogin = false;
            return 
          } else {
            this.invalidLogin = true
          }
          return
         } else {
          this.invalidLogin = true
         }
      })
      })
    }
  }
  generatingToken(length:any) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}
