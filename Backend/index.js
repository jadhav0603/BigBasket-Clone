const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')

const vegetablesRouter = require('./routes/vegetables.router')
const offerRouter = require('./routes/offer.router')
const basketRouter = require('./routes/basket.router')
const searchData = require('./routes/search.router')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', vegetablesRouter)
app.use('/offers', offerRouter)
app.use('/basket', basketRouter)
app.use('/search', searchData)

// Route to fetch all data from the bankDetails collection

app.listen(process.env.PORT, async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log('connected to MongoDB'))
        .catch((error)=> console.log('MongoDB connection Error : ', error))
       
        console.log('server successfully connected to mongoDB')
        console.log(`server successfully running on ${process.env.PORT}`)
    }
    catch(error){
        console.log(error)
    }
})