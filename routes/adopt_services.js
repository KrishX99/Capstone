const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const Worker = require("../models/worker");
const AdService = require('../models/adopted_services');
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');

router.post('/hire' , (req,res)=>{
  res.json({msg:"Successfull"});

  let newService = new AdService({
    user_name: 'Jonas',
    worker_name: req.body.worker_name,
    worker_role: req.body.worker_role,
    worker_email: req.body.worker_email,
    worker_phone: req.body.worker_phone,
    worker_location: req.body.worker_location,
    worker_price: req.body.worker_price
  })

  newService.save();
})

router.get("/delivery",function(req,res){
  Worker.find({role:'delivery'},function(err,workers){
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.render("service_cards",{workers : workers});
    }
  });
});


router.get("/superMaid",function(req,res){
  Worker.find({role:'maid'},function(err,workers){
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.render("service_cards",{workers : workers});
    }
  });
});

router.get("/electrician",function(req,res){
  Worker.find({role:'electricion'},function(err,workers){
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.render("service_cards",{workers : workers});
    }
  });
});

router.get("/laundry",function(req,res){
  Worker.find({role:'laundry'},function(err,workers){
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.render("service_cards",{workers : workers});
    }
  });
});

router.get("/carpenter",function(req,res){
  Worker.find({role:'carpenter'},function(err,workers){
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log("hello");
      res.render("service_cards",{workers : workers});
    }
  });
});

router.get("/plumber",function(req,res){
  Worker.find({role:'Plumber'},function(err,workers){
    if(err) throw err;
    if(!workers)
      return res.status(400).json({ success: false, msg: "Service not found." });
    else
    {
      res.render("service_cards",{workers : workers});
    }
  });
});

module.exports = router;