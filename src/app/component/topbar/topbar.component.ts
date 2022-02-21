import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor( private userService: UserService,
               private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.user = undefined;
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
