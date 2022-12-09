const express = require('express');
const bodyParser = require('body-parser');

app = express();
app.use(bodyParser.json());

// URL query - Body - Header
app.post('/q-b-h', (req, res)=>{
    let nameq = req.query.name;
    let idq = req.query.id;
    let nameh = req.header("name");
    let passwordh = req.header("password");
    let jsonData = req.body;
    let jsonString = JSON.stringify(jsonData);

    res.send(`This is ${nameq} and Id : ${idq} From Query. \n This is ${nameh} and Pass : ${passwordh} From Header. \n This is ${jsonString} From Body.`);
});


app.listen(5000, ()=>{
    console.log('Server running successfully on 5000 port');
});
