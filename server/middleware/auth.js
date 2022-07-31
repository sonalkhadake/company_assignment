const jwt = require("jsonwebtoken");
const jwt_key = "shdj^$&%jdn#$*jcnc"
const User = require("../model/user")

const auth = (req, res, next) => {
  const token = req.header("AUTHORIZATION");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "please Authenticate with Valid Token",
    });
  }
  try {
     jwt.verify(token, jwt_key, (err, payload)=>{
        console.log(payload)
        if(err){
            return res.status(401).json({message:" user must be logged in"})
        }
        // User.findOne({id:payload.user.id }).then((userdata)=>{
        //     req.user = userdata;
        //     next();
        // })
        const { id } = payload.user;
    User.findById(id).then((userdata) => {
      req.user = userdata;
      next();
    });
     }); 
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "please Authenticate with Valid Token",
    });
  }
};

module.exports = auth;