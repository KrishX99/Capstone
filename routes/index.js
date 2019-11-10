var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express', 
    port : process.env.PORT || 3000
  });
});
router.get('/work', function(req, res, next) {
  res.render('work', { 
    title: 'Express', 
    port : process.env.PORT || 3000
  });
});
router.get('/hire', function(req, res, next) {
  res.render('hire', { 
    title: 'Express', 
    port : process.env.PORT || 3000
  });
});
router.get('/login', function(req, res, next) {
  res.render('login', { 
    title: 'Express', 
    port : process.env.PORT || 3000
  });
});
router.get('/dashboard' , (req,res,next)=>{
  res.render('dashboard', {
    port : process.env.PORT||3000
  })
})
module.exports = router;
