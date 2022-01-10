const express = require('express');
const app = express();
const port = 3000

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017')
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