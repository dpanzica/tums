

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
