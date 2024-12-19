import Stripe from "stripe";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { SECRET_KEY } from "../config/constant";
import { Iorder, OrderModel, OrderSchema } from "../shared/models/order";
const router = Router();

const stripe = new Stripe(SECRET_KEY)
router.post('/checkout',asyncHandler(async(req,res)=>{
    let payload = req.body
    let line_items = [];
    for(let item in payload.items){
       let foods=payload['items'][item]; 
       line_items.push({
        price_data:{
            currency:"USD",
            product_data:{
                name:foods.food.name
            },
            unit_amount:foods.price*100,
        },
        quantity:foods.quantity
       })
    }
    //order collections
    const orderRequest:Iorder = {
        products:line_items,
        user_id:payload.user_id,
        name:payload.name,
        email:payload.email,
        address:payload.address,
        city:payload.city
    }
    await OrderModel.create(orderRequest)
    //order collections ends

    const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:"payment",
        shipping_address_collection:{
            allowed_countries:["IN","US","CN"]
        },
        success_url:`${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${req.headers.origin}/cancel`
    })

    const response = {
        url:''
    }
    if (session.url) {
        response.url = session.url;
    }
    res.send(response)
}))

export default router