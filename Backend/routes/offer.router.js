const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')


const db = mongoose.connection;
router.get('/:key', async (req, res) => {
    try {
        const key = req.params.key;
        // console.log("key =>",key)
        const bankData = await db.collection(key).find({}).toArray();
        res.json(bankData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


module.exports = router