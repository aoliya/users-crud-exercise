const express = require('express');
const mysql = require("./db");

const cors = require('cors')


const app = express();

app.use(cors())

const userRoutes = require('./routes/user.routes');


//db connect
const connectDB = require('./db');
app.use(express.json())

app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.send("API is running")
})

// app.all('*', function (req, res, next) {
//     if (!req.get('Origin')) return next();
//     res.set('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.set('Access-Control-Allow-Headers', 'X-Requested-Width,Content-Type,x-auth-token');
//     next();
// })



app.listen(5000, console.log("Server is running on port 5000"))

