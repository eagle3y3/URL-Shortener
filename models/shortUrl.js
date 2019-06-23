//template/structure/model of document for shortURL

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  originalUrl: String,
  shorterUrl: String,},
  {timestamps: true});

const ModelClass = mongoose.model('shortUrl', urlSchema);

ModelClass.findOne({ originalUrl: String }, function(err, obj){
  console.log(obj);
});
module.exports = ModelClass;
