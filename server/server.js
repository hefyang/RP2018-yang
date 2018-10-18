const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

//import route
const users = require('./routes/api/users');
const exams = require('./routes/api/exam');

const app = express();

//DB config
const db = require('./config/keys').mongoURI;


//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config

require('./config/passport')(passport);





// Use routes
app.use('/api/users', users);
app.use('/api/exams', exams);




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));