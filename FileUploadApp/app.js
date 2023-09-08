// npmjs.com/package/multer?activeTab=readme
// 'uploads' (folder) is for images

// include dependecies -- express, multer, and path (optional)
const express = require('express');
const path = require('path');
const multer = require('multer');

// create an express application
const app = express();

// create port for the server
const port =  3000;

// serve static files from the public directory
app.use(express.json());
app.use(express.static("./public"));
app.use(express.static("./views"));

// multer configuration for file uploads
// dest (destination): '(route)'
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

// set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// route to display the upload form (upload.ejs)
app.get('/', (req, res) => {
    res.render('upload');
});

// handle file upload : single file and display status(400) message for no uploaded file.
// otherwise display the message file uploaded

app.post('/profile', upload.single('x'), (req, res, next) => {
    if(req.file === false){
        return res.status(400).send("no file uploaded");
    }
    res.send("file uploaded");
    console.log(req.file);
});

/* app.post('/photos/upload', upload.array('yFile', 3), (req, res, next) => { 
    console.log(req.files);
    res.redirect('/')
}); */

/* const cpUpload = upload.fields([{ name: 'xText', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
app.post('/cool-profile', cpUpload, (req, res, next) => {
    console.log(req.files['xFile'][0]);
    console.log(req.files['gallery']);
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
}) */

app.all('*', (req, res) => {
    res.status(404).send("404, not found");
});

// start the server
app.listen(port, () => {
    console.log("Server Running at port", port);
});