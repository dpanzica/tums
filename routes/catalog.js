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
			res.render('error');
			}
	res.render('catalog/catalog', {products: result });
 	});
});

// ==================================================
// Route to add an item to the cart
// ==================================================
router.post('/add', function(req, res, next) {
	if (typeof req.session.cart !== 'undefined' && req.session.cart ) {
		
		if (req.session.cart.includes(req.body.product_id))
			{
				// Existing Item Being Added to Basket
				// Increase Quantity of Existing Array Element
				var n = req.session.cart.indexOf(req.body.product_id);
				req.session.qty[n] = parseInt(req.session.qty[n]) + parseInt(req.body.qty);
			}
		else
			{
				// Item Being Added First Time
				req.session.cart.push(req.body.product_id);
				req.session.qty.push(req.body.qty);
			}
	}
	else {
		var cart = [];
		cart.push(req.body.product_id);
		req.session.cart = cart;
		
		var qty = [];
		qty.push(req.body.qty);
		req.session.qty = qty;
		
	}
  return  res.redirect('/catalog/cart');
   
});


// ==================================================
// Route to remove an item to the cart
// ==================================================
router.post('/remove', function(req, res, next) {
   req.session.cart.splice(req.params.itemid,1);
   req.session.qty.splice(req.params.itemid,1);
   res.redirect('/catalog/cart');
});


// ==================================================
// Route to show shopping cart
// ==================================================
router.get('/cart', function(req, res, next) {
	if (req.session.cart) {
		let query = "SELECT product_id, productname, productimage, status, saleprice from product WHERE product_id in (" + req.session.cart + ")"; 
		
		console.log("=====================================");
		console.log("Cart Values:" + req.session.cart);
		console.log("Qty Values:" + req.session.qty);
		console.log("=====================================");		
		// execute query
		db.query(query, (err, result) => {
			if (err) {
				res.render('error');
			}
			res.render('catalog/cart', {cartitems: result, qtys: req.session.qty  });
		});
	} else {
		res.render('catalog/cart', {cartitems: 0 });
	}
});




module.exports = router;
