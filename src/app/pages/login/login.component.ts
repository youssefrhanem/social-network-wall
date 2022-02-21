import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
              private snackBar: MatSnackBar) { }

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
        console.log('account dose not exist')
        this.snackBar.open('account dose not exist', 'ok');
      }else {
        if(res[0].password === this.loginForm.value.password){
          console.log('matched')
          this.snackBar.open('Login Successful', 'ok');
        } else {
          console.log('Incorrect password')
          this.snackBar.open('Incorrect password', 'ok');
        }
      }
    }).catch( (err)=>{
      console.log(err);
    });
    }

}
