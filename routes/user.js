const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/Books");
const uploader = require("../config/cloudinary");
const protectRoute = require('../middlewares/protectRoute')
//TODO
//patch ( basic update profile without isAuthor for now)
router.patch("/my-account/profile", /* protectRoute, */ uploader.single("profileImg"), (req, res, next) => {
    const userId = req.session.currentUser;
    if (req.file) {
      req.body.profileImg = req.file.path;
    }
//if(req.body){
// isAuthor === true
//}

    User.findByIdAndUpdate(userId, req.body, { new: true })
      .select("-password")
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
);

// get user account dashboard
router.get("/my-account",/* protectRoute, */ (req, res, next) => {
    const userId = req.session.currentUser;
    User.findById(userId)
      .select("-password")
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
);

// get user list
router.get("/my-account/creation", /* protectRoute, */ (req,res,next)=>{
    const userId = req.session.currentUser;
    Book.find({newAuthor : userId})
    .then(result=>res.status(200).json(result))
    .catch(next)
})


module.exports = router;
