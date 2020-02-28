var express = require('express');
var router = express.Router();


// ==================================================
// Route to show the add product form to receive input
// from the user.
// ==================================================
router.get('/addprod', function(req, res, next) {
	res.render('product/addproduct');
});

// ==================================================
// Route to list all products. Notice the view is allprods
// ==================================================

router.get('/', function(req, res, next) {
  let query = "SELECT product_id, productname, productimage, status, saleprice from product"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('product/allprods', {products: result });
 	});
});


// ==================================================
// Route to view one specific product. Notice the view is oneproduct
// ==================================================
router.get('/:prodid', function(req, res, next) {
  let query = "SELECT product_id, productname, productimage, status, saleprice from product WHERE product_id = " + req.params.prodid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('product/oneproduct', {product: result[0] });
		} 
 	});
});

// ==================================================
// Route to edit one specific product. Notice the view is editproduct
// ==================================================
router.get('/:prodid/edit', function(req, res, next) {
  let query = "SELECT product_id, productname, productimage, productname, category_id, supplier_id, subcategory_1, subcategory_2, status, saleprice, purchaseprice, qtyonhand, reorderpoint, reorderqty from product WHERE product_id = " + req.params.prodid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('product/editproduct', {product: result[0] });
		} 
 	});
});


// ==================================================
// Route to receive add product user input and save to database
// ==================================================
router.post('/', function(req, res, next) {

let insertquery = "INSERT INTO product (productname, productimage, description, category_id, supplier_id, subcategory_1, subcategory_2, status, saleprice, purchaseprice, qtyonhand, reorderpoint, reorderqty) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 

	db.query(insertquery,[req.body.productname,req.body.productimage,req.body.description,req.body.category_id,req.body.supplier_id, req.body.subcategory_1, req.body.subcategory_2, req.body.status, req.body.saleprice, req.body.purchaseprice, req.body.qtyonhand,req.body.reorderpoint, req.body.reorderqty],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
			res.redirect('/product');
			}		
		});

});

// ==================================================
// Route to save edited product. 
// ==================================================
router.post('/save', function(req, res, next) {

	let updatequery = "UPDATE product set productname = ?,productimage = ?, description = ?, category_id = ?, supplier_id = ?, subcategory_1 = ?, subcategory_2 = ?, status = ?, saleprice = ?, purchaseprice = ?, qtyonhand = ?, reorderpoint = ?, reorderqty = ? WHERE product_id = " + req.body.product_id; 

	db.query(updatequery,[req.body.productname,req.body.productimage,req.body.description,req.body.category_id,req.body.supplier_id, req.body.subcategory_1, req.body.subcategory_2, req.body.status, req.body.saleprice, req.body.purchaseprice, req.body.qtyonhand,req.body.reorderpoint, req.body.reorderqty],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
			} else {
			res.redirect('/product');
			}
		});
});

// ==================================================
// Route to delete one specific product. 
// ==================================================
router.get('/:prodid/delete', function(req, res, next) {
  let query = "DELETE from product WHERE product_id = " + req.params.prodid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/product');
		} 
 	});
});


module.exports = router;