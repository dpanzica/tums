var express = require('express');
var router = express.Router();


// ==================================================
// Route to list all products on the catalog
// ==================================================
router.get('/', function(req, res, next) {
  let query = "SELECT product_id, productname, productimage, status, saleprice from product"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			res.redirect('/');
		}
	res.render('catalog', {products: result });
 	});
});
module.exports = router;

// ==================================================
// Route to add an item to the cart
// ==================================================
router.get('/:prodid/add', function(req, res, next) {
   cart.push(req.params.prodid);
   res.redirect('/catalog');
});


// ==================================================
// Route to show shopping cart
// ==================================================
router.get('/cart', function(req, res, next) {
   res.render('cart');
});

// ==================================================
// Route to add an item to the cart
// ==================================================
router.get('/:prodid/add', function(req, res, next) {
	if (typeof req.session.cart !== 'undefined' && req.session.cart ) {
		req.session.cart.push(req.params.prodid);
	}
	else {
		// Initializing the cart for the first use.
		var cart = [];
		cart.push(req.params.prodid);
		req.session.cart = cart;
	}
   res.redirect('/catalog/cart');
   
});

// ==================================================
// Route to remove an item from the cart
// ==================================================
router.get('/:itemid/remove', function(req, res, next) {
   req.session.cart.splice(req.params.itemid,1);
   res.redirect('/catalog/cart');
});

// ==================================================
// Route to show shopping cart
// ==================================================
router.get('/cart', function(req, res, next) {
	if (req.session.cart) {
		let query = "SELECT product_id, productname, productimage, status, saleprice from product WHERE product_id in (" + req.session.cart + ")"; 
		// execute query
		db.query(query, (err, result) => {
			if (err) {
				res.redirect('/');
			}
			res.render('cart', {cartitems: result });
		});
	} else {
		res.render('cart', {cartitems: 0 });
	}
});
