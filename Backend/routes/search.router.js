const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')


router.get('/:searchTerm', async (req, res) => {
    const { searchTerm } = req.params;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    const collectionsArray = ['bestSeller', 'beverage', 'fruit&veg', 'vegetables', 'yourDailyStaples'];
    
    try{
        const searchData = collectionsArray.map(async(ele)=>{

            const Collection_Name = mongoose.connection.db.collection(ele)
    
            const data = await Collection_Name.find({product_name:{$regex: searchTerm, $options:'i'}}).toArray();

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


