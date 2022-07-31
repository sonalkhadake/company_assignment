const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const jwt_key = "shdj^$&%jdn#$*jcnc"
const User = require("../model/user")
const userValidation = require("../middleware/userValidation")

router.post("/register", userValidation.userValidateregister, async(req, res)=>{
    try{
        
        let createUser = await User.findOne({email:req.body.email})
        if(createUser){
          res.status(400).json({message:"user is already exist"})
        }
           const password = req.body.password;
           const salt = bcrypt.genSaltSync(5);
           const hash = bcrypt.hashSync(password, salt);
     

        createUser= new User({
            name:req.body.name,
            email:req.body.email,
            password: hash
        })
        const user = await createUser.save()
        if(!user){
            res.json({message:"user is not created"})
        }
        res.status(200).json({success:true, message:"user is created successfully", data:user})

    }
    catch(error){
        console.log(error)
        res.status(500).send("internal server error");
    }
    
})


/////login route///

router.post("/login", userValidation.userValidatelogin, async(req,res)=>{
    const { email, password } = req.body;
    try {
  
      let user = await User.findOne({
        email: email,
      });
      // console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Please enter registered email" });
      }
  
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ success: false, message: "incorrect email address or password"});
      }
  
      const payload = {
        user: {
          id: user._id,
        },
      };
  
      const authtoken = jwt.sign(payload, jwt_key);
  
      res.status(200).json({ success: true, data: authtoken  })
    } catch (error) {
      console.log(error);
      res.status(500).send("internal server error");
    }
  
  
  
})









module.exports = router