import { Router } from "express";
import asyncHandler from "express-async-handler";
import { food_list } from "../data";
import { FoodModel } from "../shared/models/food";
const router = Router();

router.get('/',asyncHandler(async(req,res)=>{
    const foodItem = await FoodModel.find()
    res.send(foodItem)
}))

router.get('/search/:searchkey',asyncHandler(async(req,res)=>{
    const searchkey = req.params.searchkey;
    const searchRegex = RegExp(searchkey,'i');
    const foodItems =await FoodModel.find({name:{$regex:searchRegex}})
    res.send(foodItems)
}))

router.get('/tags',asyncHandler(async(req,res)=>{
    const tags = await FoodModel.aggregate([
        {
            $unwind:'$tags'
        },
        {
            $group:{
                _id:'$tags',
                count:{$sum:1}
            }
        },
        {
            $project:{
                _id:0,
                name:'$_id',
                count:"$count"
            }
        }
    ]).sort({count:-1})

    const all = {
        name:'All',
        count: await FoodModel.countDocuments()
    }

    tags.unshift(all)
    res.send(tags)
}))

router.get('/tag/:tagName',asyncHandler(async(req,res)=>{
    const searchkey = req.params.tagName;
    const searchRegex = RegExp(searchkey,'i');
    const foods = await FoodModel.find({tags:searchRegex});
    res.send(foods)
}))

router.get('/create-food-items',asyncHandler(async(req,res)=>{
    const foodCount = await FoodModel.countDocuments()
    if (foodCount>0) {
        res.send("items already insertd into the collection");
        return
    }
await FoodModel.create(food_list);
res.send('items inserted successfully')

}))
export default router