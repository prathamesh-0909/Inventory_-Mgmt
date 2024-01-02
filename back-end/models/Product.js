const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        ProductName:{
            require: true,
            type: String,
        },
        Category:{
            require: true,
            type: String,
        },
        inStock:{
            require: true,
            type: String,
        },
        BuyingPrice:{
            require: true,
            type: String,
        },
        SellingPrice:{
            require: true,
            type: String,
        },
    },{
        timestamps: true,
    },{
        collection: "Products"
    }
)

module.exports = mongoose.model("Products", ProductSchema)