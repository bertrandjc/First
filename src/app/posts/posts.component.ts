import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AppError } from '../app-errors';
import { BadRequestError } from '../badRequest-errors';
import { NotFoundError } from '../not-found-errors';
import { PostService } from '../services/post.service';
import { IPost } from './IPost';

@Component({
  selector: 'posts-component',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: IPost[] = [];
  private url: string = "https://aaajsonplaceholder.typicode.com/posts";

  constructor(private service: PostService) { 
  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(
        response => { //console.log(response);
          this.posts = response as [];
    }, error => {
          alert('An unexpected error occurred in getData!');
          console.log(error);
    });
  }

  createPost(input: HTMLInputElement){
    let post: IPost = { title: input.value, id: 1 };

    this.service.createPost(post)
      .subscribe(
        response => {
          post.id = response.id;
          this.posts?.splice(0,0, post);
      }, 
      (error: AppError) => {
        if(error instanceof BadRequestError){
          alert('Bad request!');
          //this.form.setErrors(error.originalError.json())  
        }
        else {
          alert('An unexpected error occurred!');
          console.log(error);
        }         
      });
  }

  updatePost(post: IPost){
    this.service.updatePost(post)
      .subscribe(
        response => {
          console.log(response);
        }, 
        error => {
          alert('An unexpected error occurred!');
          console.log(error);
      });
  }

  deletePost(post: IPost){
    let id: number = 14045555;   //post.id;
    this.service.deletePost('aa')
      .subscribe(
        response => {
          let index: number = this.posts.indexOf(post);
          this.posts?.splice(index, 1);
          console.log(response);
        }, 
        (error: AppError) => {
          if(error instanceof NotFoundError)
            alert('This post has already been deleted.');
          else {
            alert('An unexpected error occurred!');
            console.log(error);
          }         
        });
  }
  
}
