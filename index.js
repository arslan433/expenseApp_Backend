const express = require('express')
// const Mongoclient = require('mongodb').MongoClient
const cors = require('cors')
// const multer = require('multer')
// const { MongoClient } = require('mongodb')
const mongoose = require('mongoose');
const Product = require('./product.model')

const app = express()
app.use(cors())
app.use(express.json())



//post api 
app.post('/api/products' , async(req ,res ) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch{
        res.status(500).json({message : error.message})
    }
} )


//get All Api`s
app.get('/api/products' , async(req , res ) => {
    try{
        const product = await Product.find({})
        res.status(200).json(product)
    }catch{
        res.status(500).json({message : error.message})
 
    }
})


// get single id
app.get('/api/products/:id' , async(req , res ) =>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


//update api 
app.put('/api/products/:id' , async (req,res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id , req.body)

        if(!product) {
            res.status(404).json({message : "Product Not Found"})
        }
        const UpdatedProduct = await Product.findById(id)
        res.status(200).json(UpdatedProduct)

    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


// delete Api/

app.delete('/api/products/:id'  , async(req, res ) =>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product) {
            return res.status(404).json({message : "Product not found"})
        }
        res.status(200).json({message : "Product Deleted Successfully"})

    } catch (error) {
        res.status(500).json({message : error.message})
    }
})




//connect to mongodb

mongoose.connect('mongodb+srv://admin:admin@expenseapp.sehkevl.mongodb.net/ExpenseApi-API?retryWrites=true&w=majority&appName=expenseApp')
.then(()=>{
    console.log("Connection is successful")
    app.listen(3000, () =>{
       console.log("Server is running on 3000 port" )
    })
})
.catch(()=>{
    console.log("Connection Failed")
}) 


