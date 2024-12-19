import express from "express";
import  cors from "cors";
import  foodRouter  from "./routes/food.route";
import stripeRouter from "./routes/stripe.route"
import UserRouter from "./routes/user.route"
import { dbConnect } from "./config/db";
const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))
dbConnect()
app.use('/api/foods',foodRouter)
app.use('/api/payment',stripeRouter)
app.use('/api/user',UserRouter)
app.listen(5000,()=>{
    console.log('server liste ning on port 5000');
})
