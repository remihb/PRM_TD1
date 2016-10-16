var fs = require('fs'),
	promise = require('es6-promise').Promise,
	Converter = require("csvtojson").Converter;


var csvParser = function(file, opts) {
	opts = (opts === undefined) ? {} : opts;
	return new Promise(function(resolve, reject) {
		var converter = new Converter(opts);
		var readStream;
		readStream = fs.createReadStream(file);
		readStream.on('error', function(e) {
			reject(e);
		});
		readStream.pipe(converter);
		converter.on("end_parsed", function(result) {
			resolve(result);
		});
		converter.on("error", function(errMsg, errData) {
			reject({
				"errMsg": errMsg,
				"errData": errData
			});
		});
	});
};

var jsonParser = function(file) {
	return new Promise(function(resolve, reject) {
		fs.readFile(file, 'utf8', function(err, data) {
			if (err) {
				reject(err);
			}
			else{
				resolve(JSON.parse(data));
			}
		});
	});
};
module.exports = {
	csvParser: csvParser,
	jsonParser: jsonParser
};
