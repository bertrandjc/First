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
  private url: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private service: PostService) { 
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        response => { //console.log(response);
          this.posts = response as [];
    });
  }

  createPost(input: HTMLInputElement){
    let post: IPost = { title: input.value, id: 1 };

    this.service.create(post)
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
        else throw error;        
      });
  }

  updatePost(post: IPost){
    this.service.update(post)
      .subscribe(
        response => {
          console.log(response);
        });
  }

  deletePost(post: IPost){
    let id: number = post.id;
    this.service.delete(id)
      .subscribe(
        response => {
          let index: number = this.posts.indexOf(post);
          this.posts?.splice(index, 1);
          console.log(response);
        }, 
        (error: AppError) => {
          if(error instanceof NotFoundError)
            alert('This post has already been deleted.');
          else throw error;
        });
  }
  
}
