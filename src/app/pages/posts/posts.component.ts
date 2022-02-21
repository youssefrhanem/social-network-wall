import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  selectedFile: any;
  text= '';
  posts: Array<any> = [];

  postSchema = {
    username: '',
    imageUrl: '',
    text: '',
    likes: [],
    comments:[{username:'', comment:''}]
  }

  constructor(private userService: UserService,
              private router: Router,
              private postService: PostsService,
              private storage: AngularFireStorage,) { }

  ngOnInit(): void {
    if(this.userService.user == undefined || this.userService.user == null){
      let str = localStorage.getItem('user');
      if(str != null) {
        this.userService.user = JSON.parse(str);
      } else {
        this.router.navigate(['/login']);
      }
    }

    this.postService.getPosts()
      .then((res: any)=>{
        this.posts = res;
        console.log(res)
      }).catch((err)=> {
        console.log(err);
    })
  }



  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  }

  post(){

    if(this.selectedFile != undefined || this.selectedFile != null) {
      this.uploadImage().then((imageUrl) =>{
        console.log(imageUrl);

        let postObj = {
          username: this.userService.user.username,
          text: this.text,
          imageUrl: imageUrl,
          likes: [],
          comments: []
        };
        this.posts.push(postObj);
        this.postService.saveNewPost(this.posts)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

      }).catch((err) => {
        console.log(err);
      })
    }
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`images/${n}`, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          let imageURL = fileRef.getDownloadURL();
          imageURL.subscribe((url: any) => {
            if (url) {
              console.log(url);
              resolve(url);
            }
          });
        })
      ).subscribe(
        (url)=>{
          if(url){
            console.log(url);
          }
        }
      );
    });
  }

}
