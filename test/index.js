
var security_service = require("../index");

debugger;
var content = "1234567890"
console.log("Content: " + content)
// Token
var data = security_service.token("md5",content)
console.log("Token (MD5): " + data);

var data = security_service.token("sha1",content)
console.log("Token (SHA1): " + data);

var data = security_service.token("sha256",content)
console.log("Token (SHA256): " + data);

// Encrypt / Decrypt
var data = security_service.encrypt("aes256","key",content);
console.log("Encrypt (AES256): " + data);

var data = security_service.decrypt("aes256","key",data);
console.log("Decrypt (AES256): " + data);

var data = security_service.encrypt("HS512","key",content);
console.log("Encrypt (HS512): " + data);

var data = security_service.decrypt("HS512","key",data);
console.log("Decrypt (HS512): " + data);

var data = security_service.escapeHTML("&<>\"'/");
console.log("Escape html:&<>\"'/ with: " + data);

var data = security_service.escapeHTMLAttribute("\n\t\"");
console.log("Escape html attributes :&<>\"'/ with: " + data);

var data = security_service.encodeJavaScriptString("\n\t\"\u2028\u2029");
console.log("Encode javascript string: " + data);

var data = security_service.encodeCSSString("\n\t\"");
console.log("Encode CSS string: " + data);

security_service.consoleLog('hello world');

security_service.consoleLog('counter', 123);

security_service.consoleLog(1, "2", [ 3, 4 ], { 5: 6 }, function() { return 7; });



// testing validation: 

var Validator = security_service.validator;
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
 
 security_service.consoleLog("****************************************************");
 security_service.consoleLog("****************************************************");
 security_service.consoleLog("**********************Testing validator*************");
 security_service.consoleLog("****************************************************");
 v.addSchema(addressSchema, '/SimpleAddress');
 security_service.consoleLog(v.validate(p, schema).valid);

/*security_service.log("****************************************************");
 security_service.log("****************************************************");
 security_service.log("**********************Testing forever***************");
 security_service.log("****************************************************");

 /*var child = new (security_service.forever.Monitor)('index.js', {
    max: 3,
    silent: true,
    args: []
  });

  child.on('exit', function () {
    console.log('your-filename.js has exited after 3 restarts');
  });

  child.start(); /* */
debugger;
security_service.winstonLog.add(security_service.winstonLog.transports.File, { filename: 'somefile.log' });
security_service.winstonLog.remove(security_service.winstonLog.transports.Console);
  
security_service.winstonLog.log('info', 'Hello distributed log files!');
  
