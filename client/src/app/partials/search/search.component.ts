import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { FoodService } from "../../shared/services/food.service";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
searchTearm!:string
constructor(private activatedRoute:ActivatedRoute,
            private route:Router,
            private foodService:FoodService
){

}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params['key']) {
        this.searchTearm = params['key']
      }
    })
  }
  search(key:string) {
    if (key) {
      this.route.navigateByUrl("/search/"+key)
    } else {
      this.route.navigateByUrl("/home")

    }
  }

}
