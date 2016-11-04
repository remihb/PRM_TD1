$(function() {
	var fillCity = function(city) {
		var color = 255 - (20 * Math.abs(city.lang));
		if (city.lang > 0) {
			return 'rgba(0,0,' + color + ',1)';
		} else {
			return 'rgba(' + color + ',0,0,1)';
		}
	};
	var markers = [];
	for (var i = 0; i < cities.length; i++) {
		if (cities[i].lang !== 0) {
			markers.push({
				latLng: [cities[i].latitude_deg, cities[i].longitude_deg],
				name: cities[i].nom_reel,
				lang: cities[i].lang,
				style: {
					fill: fillCity(cities[i]),
					r: 2.5
				}
			});
		}
	}
	var values = {};
	var max_rate = 0.05;
	for (var j in departements) {
		values[j] = (departements[j].rate < max_rate || departements[j].lang === 0) ? 'indet' : (departements[j].lang > 0) ? 'oc' : 'oil';
	}
	$('#map').vectorMap({
		map: 'fr_merc',
		markers: markers,
		onMarkerClick: function(event, index) {
			alert("name : " + markers[index].name + "\nlang balance : " + markers[index].lang);
		},
		backgroundColor: 'rgba(255,255,255,1)',
		series: {
			regions: [{
				scale: {
					oil: 'rgba(255,100,100,1)',
					oc: 'rgba(100,100,255,1)',
					indet: 'rgba(100,255,100,1)'
				},
				values: values,
				attribute: 'fill',
				legend: {
					horizontal: true,
					title: 'Départements',
				}
			}],
			markers: [{
				scale: {
					oil: 'rgba(255,0,0,1)',
					oc: 'rgba(0,0,255,1)'
				},
				attribute: 'fill',
				legend: {
					vertical: true,
					title: 'Villes'
				}
			}]
		},
		onRegionClick: function(e, code) {
			alert("name : " + code + "\nrate : " + departements[code].rate + "\nlang : " + departements[code].lang);
		},
	});
});
