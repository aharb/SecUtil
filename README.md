SecUtil
=========

Security middleware in Node.js that provides you the security weapons.

The way that SecUtil was implemented is to depend on well-known and reliable modules that found in NPM with the largest amount of installations and rates. 

SecUtil is Node.js module, and it can be used by the developers to give their Node.js applications the common security aspects.

SecUtil intended to exist as a security middleware that contains as much as of the security functionalities in one module that can be installed from NPM, SecUtil aimed to reduce the development time cost by adding the security functionalities in Node.js web application, since many of the security aspects can be provided in this proposed framework.

## Installation

```shell
  npm install secutil 
```

## APIs
* Generate Tokens.
* Data Encryption.
* Data Decryption.
* Escape HTML.
* Escape HTML Attributes.
* Encode JavaScript String.
* Encode CSS String.
* Forever Module.
* Schema Validator.
* Console Logging.
* Winston Logging.
* XSS Protection Header.



## Usage

```js
  var secUtil = require("secutil");
      
```
## Data Hiding APIs

The implementation of the data hiding functionalities depend on two modules. The first module is Crypto which is provided by default on Node.js. The second is jwt-simple, which is a popular module that wraps Crypto’s APIs to encode and decode data, in simple calls.

The implementation of the Token API in SecUtil supports the following cryptographic hashing algorithms: MD5, SHA1, and SHA256. Furthermore the encryption APIs supports the cryptographic algorithms: AES256, HS512, and RS256. 

SecUtil provide three simple APIs for the encoding and decoding:

1. Token: algorithm name and payload should be passed as parameters.
2. Encrypt: algorithm name, secret key, and payload should be passed as parameters.
3. Decrypt: algorithm name, secret key, and payload should be passed as parameters.

```js
  var secUtil = require("secutil");
  var content = "1234567890";

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
      
```
##  Code Injection Prevention APIs

 SecUtil provides APIs to mitigate from the code injection attacks that target Node.js web applications, as  OWSAP introduced to prevent form XSS attack, SecUtil implemented these techniques and exported them through its APIs.

SecUtil provides the following APIs to mitigate code injection attacks: 

1.	escapeHTML: HTML string should be passed as parameter.
2.	escapeHTMLAttribute: attribute values should be passed as string parameter.
3.	encodeJavaScriptString: JavaScript string should be passed as parameter.
4.	encodeJavaScriptData: JavaScript object should be passed as parameter.
5.	encodeCSSString: CSS string should be passed as parameter.

```js

  	var secUtil = require("secutil");
  
	var data = secUtil.escapeHTML("&<>\"'/");
	console.log("Escape html:&<>\"'/ with: " + data);

	var data = secUtil.escapeHTMLAttribute("\n\t\"");
	console.log("Escape html attributes :&<>\"'/ with: " + data);

	var data = secUtil.encodeJavaScriptString("\n\t\"\u2028\u2029");
	console.log("Encode javascript string: " + data);

	var data = secUtil.encodeCSSString("\n\t\"");
	console.log("Encode CSS string: " + data);
      
```
## Exporting Forever Module in SecUtil

SecUtil considers the reliability of Node.js web application by exporting forever-monitor module APIs. This module is responsible to keep the service alive and keeps the application running in the production environment.

```js

  	var secUtil = require("secutil");

  	var child = new (secUtil.forever.Monitor)('index.js', {
    max: 3,
    silent: true,
    args: []
  	});

  child.on('exit', function () {
    console.log('your-filename.js has exited after 3 restarts');
  });

  child.start(); 
      
```

## Validations API in SecUtil

The most common web application security flaw is the failure to correctly validate input from the users. This section discussed the API that SecUtil provides to add the validations to Node.js application, SecUtil wraps jsonschema module and exports the validator object through its APIs.

```js
	var secUtil = require("secutil");

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


 v.addSchema(addressSchema, '/SimpleAddress');
 secUtil.consoleLog(v.validate(p, schema).valid);
      
```


## Tests

```shell
   npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release
