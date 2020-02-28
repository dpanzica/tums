// ==================================================
// Route to add an item to the cart
// ==================================================
router.get('/:itemid/remove', function(req, res, next) {
   cart.splice(req.params.itemid,1);
   res.render('cart');
   
});
