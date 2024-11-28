require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const TeacherUserRoutes = require('./routes/teacherUserRoutes');
const StudentUserRoutes = require('./routes/studentUserRoutes');
const AdminUserRoutes = require('./routes/administrateurUserRoutes');
courseRoutes = require('./routes/courseRoutes');

dotenv.config({path: './.env'})

const app = express();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(()=> console.log('DB connection successfull'));

// Middleware pour parser les données JSON dans le body
app.use(cors());
app.use(express.json());

app.use('/api/v1/teacherUsers', TeacherUserRoutes); 
app.use('/api/v1/studentUsers', StudentUserRoutes); 
app.use('/api/v1/adminUsers', AdminUserRoutes); 
app.use('/api/v1/courses', courseRoutes);

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});
