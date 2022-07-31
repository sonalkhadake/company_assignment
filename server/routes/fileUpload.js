const Fileupload = require("../model/fileupload")
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Fs = require("fs")
const path = require('path');
const multer = require("multer");
const auth = require("../middleware/auth")


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//       cb(
//         null,
//         new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
//       );
//     },
//   });
//   const filefilter = (req, file, cb) => {
//     if (
//       file.mimetype === "image/png" ||
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };
  
//   const upload = multer({ storage: storage, fileFilter: filefilter });
const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, 'uploads');
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
   
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
        return cb(
          new Error(
            'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });
  
  const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (
      parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
    );
  };
  router.post(
    "/upload",
    auth,
    upload.single("file"),
    async (req, res, next) => {
        let num = Math.floor(100000 + Math.random() * 900000)
        console.log(num)
      try {
       
        const file = new Fileupload({
          fileName: req.file.originalname,
          filePath: req.file.path,
          fileType: req.file.mimetype,
          fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
          uploadedby: req.user,
          key:num
        });
        await file.save();
        res
          .status(201)
          .send({ message: "File Uploaded Successfully", success: true,data: file });
        console.log(req.user);
      } catch (error) {
        res.status(400).send(error.message);
      }
    }
  );
  
  module.exports = router;











////////get all the fill uploaded by user////
router.get("/userfiles_uploaded", auth, async (req, res) => {
    try {
      const Files = await Fileupload.find({ uploadedby: req.user._id }).populate("uploadedby", "_id name");
      if (Files== "") {
        return res.json({ message: "Does not exist files", success: false });
      } else {
        return res.json({ message: "success", success: true, data: Files });
      }
    } catch (error) {
      res.status(400).json({message:"error"});
    }
  });





  ////////////////////////////////////////////////// delete the particular file
  router.delete("/delete/:id", auth, async (req, res) => {
  
    try {
      const id = req.params.id;
      let File = await Fileupload.findById(id);
      // console.log(data);
      // console.log(req.user);
  
      if (!File) {
        return res.status(404).json({ message: "File does not found" });
      }
      if (File.uploadedby._id.toString() === req.user._id.toString()) {
        File = await Fileupload.findByIdAndDelete(id);
        Fs.unlinkSync(File.filePath);
        res.json({ message: "File has been deleted successfully", data: File });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });


  /////downlod file///
  router.get('/downloadFile/:id',  async (req, res) => {
    try {
      const File = await Fileupload.findById(req.params.id);
      console.log(File)
      res.set({
        'Content-Type': File.fileType
      });
      res.sendFile(path.join(__dirname, '..', File.filePath));
    } catch (error) {
      res.status(400).json({message:'Error while downloading file. Try again later.'});
    }
  });

module.exports = router