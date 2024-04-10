const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

const app = express();

app.use(express.json());
app.unsubscribe(express.urlencoded({ extended: false }));


app.use(cors({
    origin: 'http://localhost:19006'
}));



// test server working
app.get('/', (req, res) => {
    res.send('Server Test Request: Showed');
});


// set Data
app.post('/api/product', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});

// View all Data
app.get('/api/product', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});

// View user Data
app.get('/api/product/:id', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});

// View user Data by name
app.get('/api/product/name/:name', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const { name } = req.params;
        const product = await Product.find({ name: new RegExp(`^${name}`) });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});

// update user Data
app.put('/api/product/:id', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ messege: "Data Not Found" });
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});


// Delete user Data
app.delete('/api/product/:id', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ messege: "Data Not Found" });
        }
        res.status(200).json("Data deleted Successfully");
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});

mongoose.connect('mongodb+srv://kavidubim2gamaethige:Hunter12045@cluster0.idjji0v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to the database!');
        app.listen(3000, () => {
            console.log('server is running on port 3000');
        });

    }).catch(() => {
        console.log("Connection Failed!!");
    });