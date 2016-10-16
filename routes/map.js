var express = require('express');
var router = express.Router();
var analyse = require('../analyse');
/* GET users listing. */
router.get('/', function(req, res) {
	analyse()
		.then(function(results) {
			res.render('map', {
				title: 'Géo Marketing',
				map: null,
				cities: results.cities,
				departements: results.departements
			});
		})
		.catch(function(error) {
			res.status(error.status || 500);
			res.render('error', {
				message: error,
				error: {},
				title: 'error'
			});
		});
});

module.exports = router;
