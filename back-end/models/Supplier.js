const mongoose = require('mongoose')

const SupplierSchema = new mongoose.Schema(
    {
        Supplier:{
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
        collection: "Supplier"
    }
)

module.exports = mongoose.model("Supplier", SupplierSchema)