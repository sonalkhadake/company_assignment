const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const uploadFileSchema = new Schema(
  {
   
    fileName: {
      type: String,
      required: true,
    },
    // description: {
    //     type: String,
    //     required: true,
    //     trim: true
    //   },

     key:{
        type:String,
        default:"123456"
        
     },

    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
    uploadedby: {
      type: ObjectId,
      ref: "user",
    }
  },
  { timestamps: true }
);

const Fileupload= mongoose.model("uploadFile", uploadFileSchema);
module.exports = Fileupload