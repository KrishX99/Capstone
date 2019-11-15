var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'MakaanTipTop', 
    port : process.env.PORT || 3000
  });
});
router.get('/work', function(req, res, next) {
  res.render('work', { 
    title: 'Work', 
    port : process.env.PORT || 3000
  });
});
router.get('/hire', function(req, res, next) {
  res.render('hire', { 
    title: 'Hire', 
    port : process.env.PORT || 3000
  });
});
router.get('/login', function(req, res, next) {
  res.render('login', { 
    title: 'Login', 
    port : process.env.PORT || 3000
  });
});
router.get('/dashboard' , (req,res,next)=>{
  res.render('new_dashboard', {
    title: 'Dashboard',
    port : process.env.PORT||3000
  });
});


router.get('/about', (req,res,next)=>{
  res.render('about' , {
    title: 'About Us',
    port:process.env.PORT||3000
  });
});

router.get('/services', (req,res,next)=>{
  res.render('services' , {
    title: 'Services',
    port:process.env.PORT||3000
  });
});

router.get('/feedback', (req,res,next)=>{
  res.render('feedback' , {
    title: 'Feedback',
    port:process.env.PORT||3000
  });
});
router.get('/provide_service', (req,res,next)=>{
  res.render('provide_service' , {
    title: 'Select the service you want to provide',
    port:process.env.PORT||3000
  });
});

router.get('/details', (req,res,next)=>{
  res.render('details' , {
    title: 'Some info about you',
    port:process.env.PORT||3000
  });
});

router.get('/admin', (req,res,next)=>{
  res.render('admin' , {
    title: 'Admin Panel',
    port:process.env.PORT||3000
  });
});

router.get('/adopt_services', (req,res,next)=>{
  res.render('adopt_services' , {
    title: 'Pick a Service',
    port:process.env.PORT||3000
  });
});

module.exports = router;
