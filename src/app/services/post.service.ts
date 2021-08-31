import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../posts/IPost';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../app-errors';
import { NotFoundError } from '../not-found-errors';
import { BadRequestError } from '../badRequest-errors';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url: string = "https://jsonplaceholder.typicode.com/posts";
  
  constructor(private http: HttpClient) { 
  }
 
  getPosts() {
    return this.http.get(this.url);
  }
  
  createPost(post: IPost){
    return this.http.post<IPost> (this.url, JSON.stringify(post)).pipe(
      catchError(this.handlerError));
  }

  updatePost(post: IPost){
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}));
  }

  deletePost(id: any){
    return this.http.delete(this.url + '/' + id).pipe(
      catchError(this.handlerError));
  } 

  private handlerError(error: Response){

    if (error.status === 400)
      return throwError(new BadRequestError(error));

    if (error.status === 404)
      return throwError(new NotFoundError(error));

    return throwError(new AppError(error));

  }

}
