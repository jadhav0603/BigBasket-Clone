const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')

const vegetable = require('../models/vegetables')
const seller = require('../models/bestSellers')


// Create a route to fetch data
router.get('/vegetables', async (req, res) => {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 4;
    try {
        const veggies = await vegetable.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json(veggies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vegetables", error: error.message });
    }
});


router.get('/bestSeller', async (req, res) => {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 4;
    try {
        const bestSeller = await seller.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json(bestSeller);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vegetables", error: error.message });
    }
});

const db = mongoose.connection;
router.get('/slider', async (req,res)=>{
    try{
        const slideData = await db.collection('slider').find({}).toArray();
        res.status(200).json(slideData);
    }catch(error){
        res.status(500).json({ error: 'Failed to fetch data' });
    }
})

router.get('/beverage', async (req,res)=>{
    try{
        const Data = await db.collection('beverage').find({}).toArray();
        res.json(Data);
    }catch(error){
        res.status(500).json({ error: 'Failed to fetch data' });
    }
})

router.get('/', async (req,res)=>{
    try{
        const Data = await db.collection('beverage').find({}).toArray();
        res.json(Data);
    }catch(error){
        res.status(500).json({ error: 'Failed to fetch data' });
    }
})


router.get('/:searchTerm', async (req, res) => {
    const { searchTerm } = req.params;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    const collectionsArray = ['bestSeller', 'beverage', 'fruit&veg', 'vegetables', 'yourDailyStaples'];
    
    try{
        const searchData = collectionsArray.map(async(ele)=>{

            const Collection_Name = mongoose.connection.db.collection(ele)
    
            const data = await Collection_Name.find({product_name:{$regex: searchVal, $options:'i'}}).toArray();

            return data.length > 0 ? { ele, data } : null
        })

        const result = (await Promise.all(searchData)).filter(Boolean);

        if(!result || result.length === 0){
            return res.status(400).json({error:"result not available"})
        }

        res.status(200).json(result)
    }
    catch(error){
        res.status(500).json({err_msg: error})
    }
});



module.exports = router


