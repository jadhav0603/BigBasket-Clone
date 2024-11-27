const express = require('express');
const mongoose = require('mongoose')
const basketModels = require('../models/basket');

const router = express.Router();

router.post('/', async (req, res) => {
    const { id, name, image, icon, original_price, discount, fresho, kg } = req.body;
    try {
        const existedProduct = await basketModels.findOne({ $and: [{ name }, { image }] });

        if (existedProduct) {
            return res.status(400).json({ error: "Product is already added in your basket" });
        }

        const newBasketData = new basketModels({ name, image, icon, original_price, discount, fresho, kg });
        await newBasketData.save();

        return res.status(201).json({ message: 'Product is successfully added on your Basket', product: newBasketData });
    } 
    catch (error) {
        console.error('Error adding product to basket:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/getData', async(req,res)=>{
    try{
        const basketData = await mongoose.connection.collection('baskets').find({}).toArray();
        res.status(200).json(basketData)
    }catch(error){
        res.status(400).json({error:'cant fetch basket Data.'})
    }
})


router.delete('/deleteData' , async(req,res)=>{
    const {name, image} = req.body
    try{
        const existedData = await basketModels.findOne({$or:[{name},{image}]})
        if(!existedData){
            return res.status(404).json({error: 'Data not found'})
        }

        await basketModels.deleteOne(req.body)
        res.status(200).json({message:'Product deleted successfully'})
    }
    catch(error){
        res.status(500).json({error_msg : error})
    }
})


router.get('/count', async(req,res)=>{
    try{
        const count = await basketModels.countDocuments({})
        res.status(200).send({count})
    }catch(error){
        res.status(500).send(error)
    }
})


router.delete('/checkout', async (req, res) => {
    try {
        await basketModels.deleteMany({});
        res.status(200).json({ message: 'All data deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete data', details: error });
    }
});



module.exports = router;