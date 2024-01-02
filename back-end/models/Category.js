const mongoose = require('mongoose')

const CategoriesSchema = new mongoose.Schema(
    {
        category:{
            require: true,
            type: String,
        },
    },{
        timestamps: true,
    },{
        collection: "Category"
    }
)

module.exports = mongoose.model("Category", CategoriesSchema)