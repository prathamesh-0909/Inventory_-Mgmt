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
        Customer:{
            require: true,
            type: String,
        },
        Quantity:{
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
        collection: "StockOut"
    }
)

module.exports = mongoose.model("StockOut", StockInSchema)