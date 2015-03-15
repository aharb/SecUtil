var dataEncryption = require('./lib/dataEncryption'),
	 logging = require('./lib/logging'),
	 ecapeEvil = require('./lib/escapeEvil'),
	 forever = require('./lib/forever'),
	 validator = require('./lib/jsonSchema'),
	 winston = require('./lib/winston'),
	 xssFilter = require('./lib/xssHeaderProtection');




// Export data encrypition functionalities from  dataEncryption module
module.exports.token = dataEncryption.token;
module.exports.encrypt = dataEncryption.encrypt;
module.exports.decrypt = dataEncryption.decrypt;


// Export data escaping functionalities from  ecapeEvil module,
// thanks for https://www.npmjs.com/package/security 
module.exports.escapeHTML = ecapeEvil.escapeHTML;
module.exports.escapeHTMLAttribute = ecapeEvil.escapeHTMLAttribute;
module.exports.encodeJavaScriptIdentifier = ecapeEvil.encodeJavaScriptIdentifier;
module.exports.encodeJavaScriptString = ecapeEvil.encodeJavaScriptString;
module.exports.encodeJavaScriptData = ecapeEvil.encodeJavaScriptData;
module.exports.encodeCSSIdentifier = ecapeEvil.encodeCSSIdentifier;
module.exports.encodeCSSString = ecapeEvil.encodeCSSString;

// Export forever module
module.exports.forever = forever;

// Export json schema validator
module.exports.validator = validator;

// Export log module
module.exports.consoleLog = logging;

// Export winston module
module.exports.winstonLog = winston;

// XSS protection header
module.exports.xssFilter = xssFilter;
