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
  res.render('dashboard', {
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
module.exports = router;