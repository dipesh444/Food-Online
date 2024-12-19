import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cart } from 'src/app/shared/model/cart';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{

  cart!:Cart;
  checkoutForm!:FormGroup;
  constructor(private _fb:FormBuilder,private _cartService:CartService){
  }

  ngOnInit(): void {
    this._cartService.getCartObservable().subscribe((cartData)=>{
      this.cart = cartData
    })
    this.createForm()
  }

  createForm() {
    this.checkoutForm = this._fb.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      address:[''],
      state:[''],
      phone:[''],
      city:['']
    })
  }

  onCheckOutClick(){
    const formValue=this.checkoutForm.value;
    const payload={
      user_id:'',
      name:`${formValue.firstName} ${formValue.lastName}`,
      email:formValue.email,
      address:formValue.address,
      city:formValue.city,
      state:formValue.state
    }

    let request={...this.cart,...payload};
    this._cartService.checkout(request).subscribe((data:any)=>{
      window.location=data['url']
      // console.log(data)
    },
    (error)=>{

    }
  )

  }
}
