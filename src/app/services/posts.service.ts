import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {rejects} from "assert";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  saveNewPost(postObj: any) {
    return new Promise((resolve, rejects) => {
      this.http.post('http://localhost:3000/posts', postObj)
        .subscribe((res) => {
            resolve(res);
          }, (err) => {
            rejects(err);
          }
        );
    })
  }

  getPosts() {
    return new Promise((resolve, rejects) =>{
      this.http.get('http://localhost:3000/posts')
        .subscribe(
          (res)=>{
            resolve(res);
          },
          (err) => {
            rejects(err);
          }
        );
    })
  }


  updateLikes(postObj:any){
    return new Promise((resolve, reject)=>{
      this.http.put('http://localhost:3000/posts/' + postObj.id, postObj).subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    });
  }

  updateComments(postObj:any){
    return new Promise((resolve, reject)=>{
      this.http.put('http://localhost:3000/posts/' + postObj.id, postObj).subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    });
  }


}
