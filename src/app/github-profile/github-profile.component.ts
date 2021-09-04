import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log("On init")

    this.route.paramMap
        .subscribe(params => {
          //console.log(params);
          let userId: string = params.get('id') as string;
          let id = ConvertStringToNumber(userId);
          //alert(id);
        });
  }

  submit(){
    this.router.navigate(['/followers'], {
      queryParams: { page: 1, order: 'newest'}
    });
  }
}


function ConvertStringToNumber(input: string) { 
  if (!input) return NaN;

  if (input.trim().length==0) { 
      return NaN;
  }
  return Number(input);
}
