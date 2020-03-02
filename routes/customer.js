var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();

// ==================================================
// Route Enable Registration
// ==================================================
router.get('/register', function(req, res, next) {
	res.render('customer/register');
});

module.exports = router;


// ==================================================
// Route Save Customer Registration
// ==================================================
router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO customer(firstname, lastname, email, phone, address1, address2, city, state, zip, addlnotes, rewardpoints,username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)"; 
    
    bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if(err) { res.render('error');}


	db.query(insertquery,[req.body.firstname, req.body.lastname, req.body.email,req.body.phone,req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.addlnotes, req.body.rewardpoints,req.body.username, req.body.password],(err, result) => {
	if (err) {
			res.render('error');
			} else {
			res.redirect('/');
			}
		});
});
        
        // ==================================================
// Route Provide Login Window
// ==================================================
router.get('/login', function(req, res, next) {
	res.render('customer/login', {message: "Please Login"});
});

// ==================================================
// Route Check Login Credentials
// ==================================================
router.post('/login', function(req, res, next) {
  let query = "select password from customer WHERE username = '" + req.body.username + "'"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {res.render('error');} 
		else {
			if(result[0])
				{
				// Username was correct
				// Check if password is correct
				bcrypt.compare(req.body.password, result[0].password, function(err, result) {
					if(result) {
						// passwords match
						res.redirect('/');
					} else {
						// password do not match
						res.render('customer/login', {message: "Wrong Password"});
					}
					});
				}
			else {res.render('customer/login', {message: "Wrong Username"});}
		} 
 	});
});