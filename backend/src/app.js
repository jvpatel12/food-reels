const express  = require('express');
const cors = require('cors');


const cookiParer =require('cookie-parser');
const authRouter = require('./routers/auth.routers.js');  // import auth routes
const foodRouter = require('./routers/food.routers.js')
const app = express();


app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5175"],
    credentials:true
}))
app.use(express.json());
app.use(cookiParer()); // to parse cookies with incoming request

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/api/auth',authRouter); //prefix all auth routes with /api/auth
app.use('/api/food',foodRouter);
module.exports = app;