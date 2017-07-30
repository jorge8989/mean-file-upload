var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  }
});

var Photo = module.exports = mongoose.model('Photo', photoSchema);

module.exports.getPhotos = function(callback, limit) {
  Photo.find(callback).limit(limit);
}

module.exports.addPhoto = function(photo, callback) {
  Photo.create(photo, callback);
}

module.exports.removePhoto = (id, callback) => {
  const query = {_id: id};
  Photo.findOneAndRemove(query, {}, callback);
}
