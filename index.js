const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config();

const port = process.env.PORT
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('db connected.')
}).catch((err)=>{
    console.log(err)
})

app.get('/',(req,res)=>
{
    res.send('hello madafaka');
})

app.listen(port,()=>console.log(`Example app listening on port ${port}`));