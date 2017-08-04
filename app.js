var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: '/home/jorge/projects/meanfileupload/public/uploads'});
var mongoose = require('mongoose');
var fs = require('fs');
Photo = require('./models/photo.js');
mongoose.connect('mongodb://localhost/multer');
var db = mongoose.connection;

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/api/photos', function(req, res) {
  Photo.getPhotos(function(err, photos) {
    if (err) throw err;
    res.json({data: photos});
  });
});

app.post('/photo', upload.single('file'), (req, res, next) => {
  var newPhoto = {
    filePath: req.file.path,
    fileSize: req.file.size,
    mimeType: req.file.mimetype,
    fileName: req.file.filename
  };
  Photo.addPhoto(newPhoto, (err, photo) => {
    if (err) {
      res.json({status: 500})
    }
    res.json({ status: 200, photo: photo })
  });
});



app.delete('/photos/:_id', (req, res) => {
  Photo.removePhoto(req.params._id, (err, photo) => {
    if (err) throw err;
    fs.unlink(photo.filePath, (err) => {
      if (err) throw err;
      res.send('photo deleted');
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(app.get('port'), () => {
  console.log('app running on port ' + app.get('port').toString());
});
