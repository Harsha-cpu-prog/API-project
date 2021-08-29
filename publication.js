const mongoose = require("mongoose");

// Publication Schema
const PublicationSchema = mongoose.Schema({
id:{
  type: Number,
  required : true,
  minLength : 3,
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

// Publication Model
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;