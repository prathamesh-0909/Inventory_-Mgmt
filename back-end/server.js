const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
require('./models/Retailer')
require('./models/Product')
require('./models/Category')
require('./models/Supplier')
require('./models/Customer')
require('./models/StockIn')
require('./models/StockOut')

const mongoString = `mongodb+srv://karan:karanjadhav@cluster0.d0oscuw.mongodb.net/store?retryWrites=true&w=majority`

mongoose.connect(mongoString, {
    useNewUrlParser: true,
})
.then(() => console.log('database connected succesfully'));

app.use(cors({origin: '*'}));
app.use(express.json());

const RetailerModel = mongoose.model('Retailer');
const ProductsModel = mongoose.model('Products');
const CategoryModel = mongoose.model('Category');
const SupplierModel = mongoose.model('Supplier');
const CustomerModel = mongoose.model('Customer');
const StockInModel = mongoose.model('StockIn');
const StockOutModel = mongoose.model('StockOut');

app.get('/login/:RetailerId&:Password', async (req, res) => {
    let display, RetailerList = await RetailerModel.find({RetailerId: `${req.params.RetailerId}`});
    try{
        RetailerList[0].Password === req.params.Password ? display = { errorId: 'hidden', errorPassword: 'hidden', retailer: RetailerList}
                                                         : display = { errorId: 'hidden', errorPassword: 'visible', retailer: RetailerList}
    }catch{
        display = { errorId: 'visible', errorPassword: 'hidden', retailer: RetailerList}
    }finally{
        res.json(display)
    }
})

app.get('/Users', async (req, res) => {
    let UserList = await RetailerModel.find()
    res.json(UserList)
})

app.delete('/deleteUser/:id', async (req, res) => {
    await RetailerModel.findOneAndDelete({_id: req.params.id})
})

app.post('/addUser', async (req, res) => {
    await RetailerModel.create({
        RetailerName: req.body.RetailerName,
        RetailerId: req.body.RetailerId,
        Role: req.body.Role,
        ContactNumber: req.body.ContactNumber,
        Password: req.body.Password,
    })
})

app.get('/category', async (req, res) => {
    let CategoryList = await CategoryModel.find()
    res.json(CategoryList)
})

app.post('/addCategory', async (req, res) => {
    await CategoryModel.create({
        category: req.body.category,
    })
})

app.delete('/deleteCategory/:category', async (req, res) => {
    await CategoryModel.findOneAndDelete({category: req.params.category})
})

app.put('/updateCategory/:category', async (req, res) => {
    await CategoryModel.findOneAndUpdate({category: req.params.category}, {category: req.body.category})
})

app.get('/supplier', async (req, res) => {
    let supplierList = await SupplierModel.find()
    res.json(supplierList)
})

app.post('/addsupplier', async (req, res) => {
    await SupplierModel.create({
        Supplier: req.body.Supplier,
        Contact: req.body.Contact,
    })
})

app.delete('/deletesupplier/:Supplier', async (req, res) => {
    await SupplierModel.findOneAndDelete({Supplier: req.params.Supplier})
})

app.put('/updatesupplier/:Supplier', async (req, res) => {
    await SupplierModel.findOneAndUpdate({Supplier: req.params.Supplier},{
        Supplier: req.body.Supplier,
        Contact: req.body.Contact
    })
})

app.get('/products', async (req, res) => {
    let ProductList = await ProductsModel.find()
    res.json(ProductList)
})

app.post('/addProduct', async (req, res) => {
    await ProductsModel.create({
        ProductName: req.body.ProductName,
        Category: req.body.Category,
        inStock: req.body.inStock,
        BuyingPrice: req.body.BuyingPrice,
        SellingPrice: req.body.SellingPrice,
    })
})

app.put('/updateProduct/:_id', async (req, res) => {
    await ProductsModel.findOneAndUpdate({_id: req.params._id},{
        ProductName: req.body.ProductName,
        Category: req.body.Category,
        inStock: req.body.inStock,
        BuyingPrice: req.body.BuyingPrice,
        SellingPrice: req.body.SellingPrice,
    })
})

app.delete('/deleteProduct/:ProductName', async (req, res) => {
    await ProductsModel.findOneAndDelete({ProductName: req.params.ProductName})
})

app.post('/StockIn', async (req, res) => {
    await StockInModel.create({
        ProductName: req.body.ProductName,
        Category: req.body.Category,
        Supplier: req.body.Supplier,
        Quantity: req.body.Quantity,
        BuyingPrice: req.body.BuyingPrice,
    })
})

app.get('/StockIn/get', async (req, res) => {
    let StockInList = await StockInModel.find()
    res.json(StockInList)
})

app.delete('/deleteStockIn/:ProductName', async (req, res) => {
    await StockInModel.findOneAndDelete({ProductName: req.params.ProductName})
})

app.post('/StockOut', async (req, res) => {
    await StockOutModel.create({
        ProductName: req.body.ProductName,
        Category: req.body.Category,
        Customer: req.body.Customer,
        Quantity: req.body.Quantity,
        SellingPrice: req.body.SellingPrice,
    })
})

app.get('/StockOut/get', async (req, res) => {
    let StockOutList = await StockOutModel.find()
    res.json(StockOutList)
})

app.delete('/deleteStockOut/:ProductName', async (req, res) => {
    await StockOutModel.findOneAndDelete({ProductName: req.params.ProductName})
})

app.get('/Customer', async (req, res) => {
    let CustomerList = await CustomerModel.find()
    res.json(CustomerList)
})

app.post('/addCustomer', async (req, res) => {
    await CustomerModel.create({
        Customer: req.body.Customer,
        Contact: req.body.Contact,
    })
})

app.delete('/deleteCustomer/:Customer', async (req, res) => {
    await CustomerModel.findOneAndDelete({Customer: req.params.Customer})
})

app.put('/updateCustomer/:Customer', async (req, res) => {
    await CustomerModel.findOneAndUpdate({Customer: req.params.Customer},{
        Customer: req.body.Customer,
        Contact: req.body.Contact
    })
})

app.listen(8000, () => {
    console.log("server has started in the port 8000")
})