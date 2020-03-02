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

	db.query(insertquery,[req.body.firstname, req.body.lastname, req.body.email,req.body.phone,req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.addlnotes, req.body.rewardpoints,req.body.username, req.body.password],(err, result) => {
	if (err) {
			res.render('error');
			} else {
			res.redirect('/');
			}
		});
});
