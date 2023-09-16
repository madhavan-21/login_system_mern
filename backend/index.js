const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
const cookieParser = require('cookie-parser');
const authRoutes = require("./Routes/Auth");
const homeRoutes = require("./Routes/Home");
const User = require('./Models/userSchema')




app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/home',homeRoutes)
require('./db');


app.listen(PORT, () => {
    console.log(`server runing on ${PORT}`);
})