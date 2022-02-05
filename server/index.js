const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {User} = require('./models/User');
const {auth} = require('./middlewares/auth');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path')

const userRouter = require('./routes/user');
const videoRouter = require('./routes/video');
const subscribeRouter = require('./routes/subscribe');
const commentRouter = require('./routes/comment')

dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/uploads',express.static(path.join(__dirname,'../uploads')));//정적주소

const port = process.env.PORT
mongoose.connect(process.env.MONGO_URL)
.then((db)=>{
    console.log(db)
    console.log('db connected.')
}).catch((err)=>{
    console.log(err)
})

app.use('/api/users',userRouter);
app.use('/api/video',videoRouter);
app.use('/api/subscribe',subscribeRouter);
app.use('/api/comment',commentRouter);


app.listen(port,()=>console.log(`Example app listening on port ${port}`));