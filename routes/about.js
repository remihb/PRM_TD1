var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
	res.render('about', {
		title: 'Géo Marketing',
		about: null
	});
});

module.exports = router;
