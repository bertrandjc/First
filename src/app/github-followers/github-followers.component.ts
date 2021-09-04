import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from '../services/github-followers.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  //followers: Observable<Follower[]> | undefined;
  followers: any | undefined;
  filter$: Observable<string> | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService) { 

  }

  ngOnInit(): void {

 /*  this.route.paramMap
    .subscribe(param=> {
      let id = param.get
    });

  this.route.queryParamMap.subscribe(); */

  // let id = this.route.snapshot.paramMap.get('id');
  // let page = this.route.snapshot.paramMap.get('page');
  
  /*   combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .pipe(map(combined => {
      let id = combined[0].get('id');
      let page = combined[1].get('page');
     
      return this.service.getAll();
    }))
    .subscribe(followers => this.followers = followers);  */
    
    this.service.getAll()
    .subscribe(followers => this.followers = followers);

  }

}

/* export interface Follower {
  id: number,
  login: string,
  html_url : string
}
 */