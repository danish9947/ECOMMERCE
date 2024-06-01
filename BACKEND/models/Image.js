const mongoose = require('mongoose');

const imgUploadSchema = mongoose.Schema({
    image:{
        type:String,
    }
},{timestamp:true });

const ImgUpload = mongoose.model("ImgUpload", imgUploadSchema);

module.exports = ImgUpload;