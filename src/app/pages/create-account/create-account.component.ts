import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              public userService: UserService) { }

  ngOnInit(): void {
  }

  createAccountForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get f() {
    return this.createAccountForm.controls;
  }


  create(){
    //console.log(this.createAccountForm.value);
    this.userService.createNewUser(this.createAccountForm.value).then((res) => {
      console.log(res);
      this.userService.user = res;
      localStorage.setItem('user', JSON.stringify(res))
      this.router.navigate(['/posts']);
    }).catch((err) => {
      console.log(err);
      // this.router.navigate(['/'])
    });
  }

}
