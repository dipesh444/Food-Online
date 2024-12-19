import { Component, OnInit } from '@angular/core';
import { FoodService } from "../../shared/services/food.service";
import { Food } from 'src/app/shared/model/food';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from "@angular/router";
import { CartService } from 'src/app/shared/services/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  foods!:Food[];
  foodObservable!:Observable<Food[]>
  constructor(private foodService:FoodService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private cartService:CartService
  ){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params)=>{
      if (params['key']) {
        this.foodObservable= this.foodService.getFoodBySerach(params['key']);
      }else if(params['tag']){
        this.foodObservable= this.foodService.getFoodByTagName(params['tag']);
      } else{
        this.foodObservable= this.foodService.getAllFoodList();

      }
      this.foodObservable.subscribe((food:Food[])=>{
        this.foods = food;    
       })
    })
  }

  addToCart(food:Food){
    this.cartService.addToCart(food)
  }
}
