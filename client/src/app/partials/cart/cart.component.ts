import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/model/cart';
import { Food } from 'src/app/shared/model/food';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart!:Cart;
  buttonName='Checkout'
  constructor(private cartService:CartService,private router:Router) {

  }

  ngOnInit(): void {
    
    this.cartService.getCartObservable().subscribe((cartData)=>{
      this.cart = cartData;
      console.log(this.cart);
      
    })
  }

  onAddClick(item:Food){
    this.cartService.addToCart(item)
  }
  onSubClick(item:Food){
    this.cartService.removeItem(item)
  }
  onNextClick(){
    this.router.navigate(['/checkout'])
  }
}
