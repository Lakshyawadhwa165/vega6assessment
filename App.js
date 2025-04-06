const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./Project/Login/LoginRoutes.js');
const blogRoutes = require('./Project/Blog/BlogRoutes.js');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', authRoutes);
app.use('/api', blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
