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
const db = require('./config/keys_dev').mongoURI;


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


// Server static assets if in production
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));

    app.get('*', (req ,res) =>
    {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));