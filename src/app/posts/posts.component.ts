import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/badRequest-errors';
import { NotFoundError } from './../common/not-found-error';
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
        posts => { 
          //console.log(response);
          this.posts = posts as [] 
        });
  }

  createPost(input: HTMLInputElement){
    let post: IPost = { title: input.value, id: 1 };

    this.service.create(post)
      .subscribe(
        newPost => {
          post.id = newPost.id;
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
        updatedPost => {
          console.log(updatedPost);
        });
  }

  deletePost(post: IPost){
    let index: number = this.posts.indexOf(post);
    this.posts?.splice(index, 1);

    this.service.delete(post.id)
      .subscribe({
        error: err => {
          this.posts?.splice(index, 0, post);
          
          if(err instanceof NotFoundError)
            alert('This post has already been deleted.');
          else throw err;
        }
      });
  }
  
}
