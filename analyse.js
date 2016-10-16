var csvParser = require('./fileparser.js').csvParser,
	jsonParser = require('./fileparser.js').jsonParser,
	_ = require('lodash'),
	promise = require('es6-promise').Promise;


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var toponymie = function(city, lang, val) {
	return new Promise(function(resolve, reject) {
		var parts = city.nom_simple.toLowerCase().split(" ");
		_.forEach(parts, function(part) {
			_.forEach(lang.suffix, function(word) {
				if (_.endsWith(part, word)) {
					city.lang += val;
				}
			});
			_.forEach(lang.prefix, function(word) {
				if (_.startsWith(part, word)) {
					city.lang += val;
				}
			});
		});
		resolve();
	});
};

var departements = function(cities) {
	return new Promise(function(resolve, reject) {
		var departements = {};
		_.forEach(cities, function(city) {
			if (city.lang !== 0){
				dep = pad(city.departement, 2);
				if (departements["FR-" + dep] === undefined){
					departements["FR-" + dep] = 0;
				}
				if (city.lang > 0) {
					departements["FR-" + dep] += 1;
				} else {
					departements["FR-" + dep] -= 1;
				}
			}
		});
		resolve(departements);
	});
};

var attributeLang = function() {
	return new Promise(function(resolve, reject) {
		csvParser('data/villes.csv')
			.then(function(cities) {
				cities = _.map(cities, function(city) {
					return _.extend({}, city, {
						lang: 0
					});
				});
				jsonParser('data/lang.json')
					.then(function(langs) {
						_.forEach(cities, function(city) {
							toponymie(city, langs.oc, 1);
							toponymie(city, langs.oil, -1);
						});
						return cities;
					})
					.then(function(cities) {
						departements(cities)
							.then(function(departements) {
								resolve({cities: cities, departements:departements});
							});
					})
					.catch(function(error) {
						reject(error);
					});
			})
			.catch(function(error) {
				reject(error);
			});
	});
};

// attributeLang()
// 	.then(function(result) {
// 		var dd = 0,
// 			ff = 0;
// 		// _.forEach(result.departements, function(dep, val){
// 		// 	if (dep > 0){
// 		// 		dd+=1;
// 		// 	}
// 		// 	else{
// 		// 		ff+=1;
// 		// 	}
// 		// });
// 		console.log(dd, ff);
// 	})
// 	.catch(function(error) {
// 		console.log(error);
// 	});

module.exports = attributeLang;
