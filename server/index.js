const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {User} = require('./models/User');
const {auth} = require('./middlewares/auth');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');
const videoRouter = require('./routes/video');

dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookieParser())

const port = process.env.PORT
mongoose.connect(process.env.MONGO_URL)
.then((db)=>{
    console.log(db)
    console.log('db connected.')
}).catch((err)=>{
    console.log(err)
})

app.use('/api/users',userRouter)
app.use('/api/video',videoRouter)

app.listen(port,()=>console.log(`Example app listening on port ${port}`));