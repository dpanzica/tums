var express = require('express');
var router = express.Router();

/* GET dyna page. */
router.get('/', function(req, res, next) {
let booklist = [
        {
            title: 'Tums: Chewy Bites',
            author: 'A chewable version of the classic Tum. Tastes great.',
            publishedAt: '4.99',
        },
        {
            title: 'Tums: Ultra-Strength 1000mg',
            author: 'Tums Ultra strength is for those in need of something more powerful.',
            publishedAt: '5.99',
        },
        
        {
            title: 'Emergen Cee',
            author: 'comes in a four pack and helps you get your dose of vitamin c.',
            publishedAt: '3.99',
        }
    ]

  res.render('dyna', { books: booklist});
});

module.exports = router;

