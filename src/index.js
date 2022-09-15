const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();
//connect to DB
mongoose.connect("mongodb://localhost:27017/blog-data",{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false }, () => {
    console.log('Connection Established...')
})


app.listen(3000, () => console.log('Server running......'));

