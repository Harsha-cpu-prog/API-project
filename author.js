const mongoose = require("mongoose");

// Author Schema
const AuthorSchema = mongoose.Schema({
  id:{
    type: Number,
    required:true,
    minLength:3,
    maxLength:5,
  },
  name:{
    type:String,
    required:true,
    minLength:8,
    maxLength:10,
  },
  books:[String],
});

// Author Model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;