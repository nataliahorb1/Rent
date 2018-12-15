var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
    response.render('main.html');
});
router.get('/user', function(request, response) {
    response.render('user.html');
});
router.get('/search', function(request, response) {
    response.render('search.html');
});
router.get('/item', function(request, response) {
    response.render('item.html');
});
module.exports = router;