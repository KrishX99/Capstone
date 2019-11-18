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
const stripe = require("stripe")("sk_test_5sahhik3jiQFnexE1z1ieaEX00fvU67oyy");


router.post('/hire' , (req,res)=>{
  let newService = new AdService({
    user: req.body.user,
    worker_name: req.body.worker_name,
    worker_role: req.body.worker_role,
    worker_email: req.body.worker_email,
    worker_phone: req.body.worker_phone,
    worker_location: req.body.worker_location,
    worker_price: req.body.worker_price
  });
  newService.save();
  res.json({msg:"Successfull"});

})


router.post('/charge', (req, res) => {
  const amount = 2500;
  
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'Service Adoption',
    currency: 'inr',
    customer: customer.id
  }))
  .then(charge => {

    // let newService = new AdService({
    //   user: req.body.user,
    //   worker_name: req.body.worker_name,
    //   worker_role: req.body.worker_role,
    //   worker_email: req.body.worker_email,
    //   worker_phone: req.body.worker_phone,
    //   worker_location: req.body.worker_location,
    //   worker_price: req.body.worker_price
    // });
    // newService.save();

    res.redirect('/dashboard')
});
});

router.get("/delivery",function(req,res){
  Worker.find({role:'delivery'},function(err,workers){
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.render("service_cards",{
        workers : workers,
        port: process.env.PORT || 3000,
        heading: 'Delivery'
      });
    }
  });
});



router.get("/superMaid",function(req,res){
  Worker.find({role:'Maid'},function(err,workers){
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.render("service_cards",{
        workers : workers,
        port: process.env.PORT || 3000,
        heading: 'Maid'
      });
    }
  });
});

router.get("/electrician",function(req,res){
  Worker.find({role:'electrician'},function(err,workers){
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.render("service_cards",{
        workers : workers,
        port: process.env.PORT || 3000,
        heading: 'Electrician'
      });
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
      res.render("service_cards",{
        workers : workers,
        port: process.env.PORT || 3000,
        heading: 'Laundry'
      });
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
      res.render("service_cards",{
        workers : workers,
        port: process.env.PORT || 3000,
        heading: 'Carpenter'
      });
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
      res.render("service_cards",{
        workers : workers,
        port: process.env.PORT || 3000,
        heading: 'Plumber'
      });
    }
  });
});

module.exports = router;