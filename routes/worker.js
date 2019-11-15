const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const Worker = require("../models/worker");
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');

router.post("/add_worker", (req, res) => {
  console.log(req.body);

  let newWorker = new Worker({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    location: req.body.location,
    price:req.body.price
  });

  newWorker.save(err => {
    if (err) {
      if (err.errors) {
        if (err.errors.name) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.name.message });
          return;
        }

        if (err.errors.email) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.email.message });
          return;
        }

        if(err.errors.phone){
          res.status(400).json({
            success: false, msg: err.errors.phone.message
          });
        }

        // Show failed if all else fails for some reasons
        res.status(400).json({ success: false, msg: "Failed to add service." });
      }
    } else {
      res.json({ success: true, msg: "Service Added Successfully." });
    }
  });
});
module.exports = router;
