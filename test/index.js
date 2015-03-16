
var secUtil = require("../index");


var content = "1234567890"
console.log("Content: " + content)
// Token
var data = secUtil.token("md5",content)
console.log("Token (MD5): " + data);

var data = secUtil.token("sha1",content)
console.log("Token (SHA1): " + data);

var data = secUtil.token("sha256",content)
console.log("Token (SHA256): " + data);

// Encrypt / Decrypt
var data = secUtil.encrypt("aes256","key",content);
console.log("Encrypt (AES256): " + data);

var data = secUtil.decrypt("aes256","key",data);
console.log("Decrypt (AES256): " + data);

var data = secUtil.encrypt("HS512","key",content);
console.log("Encrypt (HS512): " + data);

var data = secUtil.decrypt("HS512","key",data);
console.log("Decrypt (HS512): " + data);

var data = secUtil.escapeHTML("&<>\"'/");
console.log("Escape html:&<>\"'/ with: " + data);

var data = secUtil.escapeHTMLAttribute("\n\t\"");
console.log("Escape html attributes :&<>\"'/ with: " + data);

var data = secUtil.encodeJavaScriptString("\n\t\"\u2028\u2029");
console.log("Encode javascript string: " + data);

var data = secUtil.encodeCSSString("\n\t\"");
console.log("Encode CSS string: " + data);

secUtil.consoleLog('hello world');

secUtil.consoleLog('counter', 123);

secUtil.consoleLog(1, "2", [ 3, 4 ], { 5: 6 }, function() { return 7; });



// testing validation: 

var Validator = secUtil.validator;
var v = new Validator();
 
  // Address, to be embedded on Person 
  var addressSchema = {
    "id": "/SimpleAddress",
    "type": "object",
    "properties": {
      "lines": {
        "type": "array",
        "items": {"type": "string"}
      },
      "zip": {"type": "string"},
      "city": {"type": "string"},
      "country": {"type": "string", "required": true}
    }
  };
 
  // Person 
  var schema = {
    "id": "/SimplePerson",
    "type": "object",
    "properties": {
      "name": {"type": "string"},
      "address": {"$ref": "/SimpleAddress"},
      "votes": {"type": "integer", "minimum": 1}
    }
  };
 
  var p = {
    "name": "Barack Obama",
    "address": {
      "lines": [ "1600 Pennsylvania Avenue Northwest" ],
      "zip": "DC 20500",
      "city": "Washington",
      "country": "USA"
    },
    "votes": "2"
  };
 
 secUtil.consoleLog("****************************************************");
 secUtil.consoleLog("****************************************************");
 secUtil.consoleLog("**********************Testing validator*************");
 secUtil.consoleLog("****************************************************");
 v.addSchema(addressSchema, '/SimpleAddress');
 secUtil.consoleLog(v.validate(p, schema).valid);

  secUtil.winstonLog.add(secUtil.winstonLog.transports.File, { filename: 'somefile.log' });
  secUtil.winstonLog.remove(secUtil.winstonLog.transports.Console);
    
  secUtil.winstonLog.log('info', 'Hello distributed log files!');
  
