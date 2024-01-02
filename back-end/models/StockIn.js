const mongoose = require('mongoose')

const StockInSchema = new mongoose.Schema(
    {
        ProductName:{
            require: true,
            type: String,
        },
        Category:{
            require: true,
            type: String,
        },
        Supplier:{
            require: true,
            type: String,
        },
        Quantity:{
            require: true,
            type: String,
        },
        BuyingPrice:{
            require: true,
            type: String,
        },
    },{
        timestamps: true,
    },{
        collection: "StockIn"
    }
)

module.exports = mongoose.model("StockIn", StockInSchema)