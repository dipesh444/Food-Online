import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Food } from "../model/food";
import { Observable } from 'rxjs';
import { FOODS_BY_TAG_URL, FOODS_BY_TAGS_URL, FOODS_SEARCH_URL, FOODS_URL } from "../../shared/constant/url";
import { Tag } from '../model/tag';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAllFoodList():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL)
  }
  getFoodBySerach(search:string):Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_SEARCH_URL+search)
  }

  getFoodByTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_BY_TAGS_URL)
  }
  getFoodByTagName(tag:string):Observable<Food[]>{
    return tag==='All' ? this.getAllFoodList(): this.http.get<Food[]>(FOODS_BY_TAG_URL+tag)
  }
}
