var express = require('express');
var router = express.Router();


// ==================================================
// Route to show the add category form to receive input
// from the user.
// ==================================================
router.get('/add', function(req, res, next) {
	res.render('category/add');
});

// ==================================================
// Route to list all categories. Notice the view is allprods
// ==================================================

router.get('/', function(req, res, next) {
  let query = "SELECT category_id, categoryname, description from category"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('category/list', {result: result });
 	});
});


// ==================================================
// Route to view one specific category. Notice the view is show
// ==================================================
router.get('/:id', function(req, res, next) {
  let query = "SELECT category_id, categoryname, description from category WHERE category_id = " + req.params.id ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('category/show', {result: result[0] });
		} 
 	});
});

// ==================================================
// Route to edit one specific category. Notice the view is edit
// ==================================================
router.get('/:id/edit', function(req, res, next) {
  let query = "SELECT category_id, categoryname, description from category WHERE category_id = " + req.params.id ;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('category/edit', {result: result[0] });
		} 
 	});
});


// ==================================================
// Route to receive add category user input and save to database
// ==================================================
router.post('/', function(req, res, next) {

let insertquery = "INSERT INTO category (categoryname, description) VALUES (?, ?)"; 

	db.query(insertquery,[req.body.categoryname, req.body.description],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
			res.redirect('/category');
			}		
		});

});



// ==================================================
// Route to save edited category. 
// ==================================================
router.post('/save', function(req, res, next) {

	let updatequery = "UPDATE category set categoryname = ?, description = ? WHERE category_id = " + req.body.category_id; 

	db.query(updatequery,[req.body.categoryname, req.body.description],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
			} else {
			res.redirect('/category');
			}
		});
});

// ==================================================
// Route to delete one specific product. 
// ==================================================
router.get('/:id/delete', function(req, res, next) {
  let query = "DELETE from category WHERE category_id = " + req.params.id ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/category');
		} 
 	});
});


module.exports = router;

