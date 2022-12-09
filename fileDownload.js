const express = require('express');
const path = require('path');

const app = express();

app.get('/download', (req, res)=>{
    const file = __dirname + '/uploads/pic1.jpg';

    res.download(file); //'./uploads/file1.png'
});

app.listen(5000, (req, res)=>{
    console.log('Server running successfully');
});