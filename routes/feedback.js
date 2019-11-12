const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const Feedback = require("../models/feedback");
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');

router.post("/post", (req, res) => {
  console.log(req.body);

  let newFeedback = new Service({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message
  });

  newFeedback.save(err => {
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
        if(err.errors.message){
          res.send(400).json({
            success: false,
            msg : err.errors.message.message
          })
        }

        // Show failed if all else fails for some reasons
        res.status(400).json({ success: false, msg: "Failed to post feedback." });
      }
    } else {
      res.json({ success: true, msg: "Service Added Successfully successfully registered." });
    }
  });
});

router.get("/get", (req, res) => {

  Feedback.find({}, (err, service) => {
    if (err) throw err;

    if (!service) {
      return res.status(400).json({ success: false, msg: "Service not found." });
    }
    return res.json(service);
  });
});

module.exports = router;
