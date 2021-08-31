import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../posts/IPost';
import { throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../app-errors';
import { NotFoundError } from '../not-found-errors';
import { BadRequestError } from '../badRequest-errors';

export class DataService {
      
  constructor(private url: string = "", private http: HttpClient) { 
  }
 
  getAll() {
    return this.http.get(this.url);
  }
  
  create(ressource: any){
    return this.http.post<any> (this.url, JSON.stringify(ressource)).pipe(
      catchError(this.handlerError));
  }

  update(ressource: any){
    return this.http.patch(this.url + '/' + ressource.id, JSON.stringify({isRead: true}));
  }

  delete(id: any){
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
