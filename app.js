const express = require('express');
const bodyParser = require('body-parser');

//Routes
const authRoutes = require('./route/authRoutes');
const userRoutes = require('./route/userRoutes');
const departmentsRoutes = require('./route/departmentsRoutes');
const courseRoutes = require('./route/courseRoutes');
const studentRoutes = require('./route/studentRoutes');
const feedbackRoutes = require('./route/feedbackRoutes');


const app = express();

app.use(bodyParser.json());
const cors = require ('cors');

app.use(cors({
    origin: '*',  // Or use '*' to allow all origins (not recommended for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
    credentials: true,  // If you're using cookies with requests
  }));


app.get ('/', function(req, res){
    res.send('Marlon Alba, Miss u');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dept', departmentsRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/feedback', feedbackRoutes)

const PORT = 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT} `);
});