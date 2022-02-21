import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
/*
   reactive Forms (formGroups / formControl)
   formGroups is one or more form Control
   each form control associated to an input element
   to create a form groups we need to use formBuilder
*/

  constructor(private fb:FormBuilder, public userService:UserService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  get f(){
    return this.loginForm.controls;
  }

  login(){
    this.userService.getUser(this.loginForm.value.email).then(
      (res: any)=>{
      console.log(res);
      if(res.length == 0){
        this.snackBar.open('account dose not exist', 'ok');
      } else {
        if(res[0].password === this.loginForm.value.password){
          this.snackBar.open('Login Successful', 'ok');
          this.userService.user = res[0];
          localStorage.setItem('user', JSON.stringify(res[0]));
          this.router.navigate(['/posts']);
        } else {
          this.snackBar.open('Incorrect password', 'ok');
        }
      }
    }).catch( (err)=>{
      console.log(err);
    });
    }

}
