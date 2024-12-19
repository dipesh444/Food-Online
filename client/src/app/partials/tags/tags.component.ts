import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from 'src/app/shared/model/tag';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags!:Tag[]
  constructor(private foodService:FoodService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ){

  }

ngOnInit(): void {
  this.getTags()
}

getTags(){
  this.foodService.getFoodByTags().subscribe((tags:Tag[])=>{
    this.tags = tags;
  })
}
activeTag(tag:Tag){
 return this.router.url.includes(tag.name)
}
}
