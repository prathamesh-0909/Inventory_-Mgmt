const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema(
    {
        Customer:{
            require: true,
            type: String,
        },
        Contact:{
            require: true,
            type: String,
        },
    },{
        timestamps: true,
    },{
        collection: "Customer"
    }
)

module.exports = mongoose.model("Customer", CustomerSchema)