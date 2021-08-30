import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts-component',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: IPost[] = [];
  private url: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
    this.http.get(this.url).subscribe(response => { 
      //console.log(response);
      this.posts = response as [];
    });
  }

  createPost(input: HTMLInputElement){
    let post: IPost = { title: input.value, id: 1 };

    this.http.post<IPost> (this.url, JSON.stringify(post))
      .subscribe(response => {
          post.id = response.id;
          this.posts?.splice(0,0, post);
        });
  }

  updatePost(post: IPost){
    this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
      .subscribe(response => {
          console.log(response);
        });
  }

  deletePost(post: IPost){
    this.http.delete(this.url + '/' + post.id)
      .subscribe(response => {
        let index: number = this.posts.indexOf(post);
        this.posts?.splice(index, 1);
          //console.log(response);
        });
  }

}

interface IPost {
  id: number;
  title: string;
}