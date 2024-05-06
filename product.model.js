const { Timestamp } = require('mongodb')
const mongoose =  require('mongoose')
const Productschema = mongoose.Schema (
    {
        name :{
            type : String ,
            default : "null"
        },
        
        price :{
            type : Number ,
            default : 0 
            
        },
          income :  {
            type : Number ,
            default : 0 

        }
       
    },
    {
        timestamps : true,
    }
)

const Product = mongoose.model("Product" , Productschema)
module.exports = Product