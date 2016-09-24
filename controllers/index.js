var express = require('express'), 
 router =  express.Router(); 
 
// Routes for all api's 
console.log('calling routers')


//users api 
 router.use('/user', require('./user')); 
 //users handicap 
 router.use('/handicap', require('./handicap')); 
 //users contacts 
 router.use('/contacts', require('./contacts')); 
 //users raceday 
 router.use('/raceday', require('./raceday')); 
 //users gotypoints 
 router.use('/gotypoints', require('./gotypoints')); 
  //users gotypoints 
 router.use('/tournament', require('./tournament')); 
  //users gotypoints 
 router.use('/registration', require('./registration')); 

  //Search for users who is not registered yet 
 router.use('/registrationsearch', require('./registrationsearch')); 

 module.exports = router; 
 