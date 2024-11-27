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


router.get('/search', async (req, res) => {
    const { searchTerm } = req.query;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    const collections = ['bestSeller', 'beverage', 'fruit&veg', 'vegetables', 'yourDailyStaples'];
    try {
        const promises = collections.map(async (collectionName) => {
            const collection = mongoose.connection.collection(collectionName);
            const data = await collection.find({ name: { $regex: searchTerm, $options: 'i' } }).toArray();
            return { collectionName, data };
        });

        const results = await Promise.all(promises);
        const filteredResults = results.filter(result => result.data.length > 0);

        res.json(filteredResults);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router


