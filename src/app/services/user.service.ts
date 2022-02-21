import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public createNewUser(dataObject:any){
    return new Promise((resolve, rejects) =>{
      this.http.post('http://localhost:3000/users',dataObject).subscribe(
        (res)=> {
          resolve(res);
        },
        (err) => {
          rejects(err);
        }
      )
    })
  }


  public getUser(email:string){
    return new Promise((resolve, rejects) => {
      this.http.get('http://localhost:3000/users?email='+email).subscribe(
        (res)=>{
        resolve(res);
      },
        (err) =>{
          rejects(err);
        })
    })
  }


}
