const express = require('express');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination:(req, file, callBack)=>{
        callBack(null, './uploads');
    },
    filename: (req, file, callBack)=>{
        callBack(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if(file.mimetype === "image/png" || file.mimetype === "image/jpeg"){
            callback(null, true);
        }
        else {
            callback(null, false);
            const err = new Error('Only .png, .jpeg(.jpg) format allowed!')
            err.name = 'ExtensionError'
            return callback(err);
        }
    }
}).single('myFile');

app.post('/upload', (req, res)=>{
    upload(req, res, (err)=> {
        if (err instanceof multer.MulterError) {
            // multer error
            res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name === 'ExtensionError') {
                res.status(413).send({ error: { message: err.message } }).end();
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }
        res.status(200).end('File Upload Success!');
    });
});

app.listen(5000, ()=>{
   console.log("Server running successfully");
});