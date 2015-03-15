var jwt = require('jwt-simple');
var crypto = require('crypto');

var _token = function(standard, playload) {
		data = crypto.createHash(standard).update(JSON.stringify(playload)).digest("hex");	
		return data;
	};

var _encrypt = function(standard, secret, playload) {
		if (standard.indexOf("HS") == -1 && standard.indexOf("RS") == -1) {
			var data = JSON.stringify(playload);
			keyBuf = new Buffer(Array(32));
			keyBuf.write(secret, 'utf8');
			ivBuf = new Buffer(Array(16));
			var cipher = crypto.createCipheriv(standard, keyBuf, ivBuf);
			data = cipher.update(data, 'utf-8', 'base64') + cipher.final('base64');
		} else {
			data = jwt.encode(playload, secret, standard);
		}
		return data;
	};


var _decrypt = function(standard, secret, playload) {
		if (standard.indexOf("HS") == -1 && standard.indexOf("RS") == -1) {
			keyBuf = new Buffer(Array(32));
			keyBuf.write(secret, 'utf8');
			ivBuf = new Buffer(Array(16));
			var decipher = crypto.createDecipheriv(standard, keyBuf, ivBuf);
			data = decipher.update(playload,'base64','utf-8') + decipher.final('utf-8');
			data = JSON.parse(data);
		} else {
			data = jwt.decode(playload, secret, standard);
		}
		return data;
	}; 


module.exports = {
	token: _token,
	encrypt: _encrypt,
	decrypt: _decrypt

};


