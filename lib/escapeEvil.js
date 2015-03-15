
// OSWASP Guidlines: &, <, >, ", ' plus forward slash.
var HTML_CHARACTERS_EXPRESSION = /[&"'<>\/]/gm;

var HTML_ENTITY_MAP = {
  '&': '&amp;'
, '<': '&lt;'
, '>': '&gt;'
, '"': '&quot;'
, "'": '&#x27;'
, '/': '&#x2F;'
};

// OSWASP Guidlines: escape all non alphanumeric characters in ASCII space.
var HTML_ATTRIBUTE_CHARACTERS_EXPRESSION =
    /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF]/gm;

// OSWASP Guidlines: escape all non alphanumeric characters in ASCII space.
// Also include line breaks (for literal).
var JAVASCRIPT_CHARACTERS_EXPRESSION =
    /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF\u2028\u2029]/gm;

// This is not great, but it is useful.
var JSON_STRING_LITERAL_EXPRESSION =
    /"(?:\\.|[^"])*"/gm;

// OSWASP Guidlines: escape all non alphanumeric characters in ASCII space.
var CSS_CHARACTERS_EXPRESSION =
    /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF]/gm;

var _escapeHTML = function(text){
    return text && text.replace(HTML_CHARACTERS_EXPRESSION, function (c) {
        return HTML_ENTITY_MAP[c] || c;
      });
  }

var _escapeHTMLAttribute = function(text){
    return text && text.replace(HTML_ATTRIBUTE_CHARACTERS_EXPRESSION, function (c) {
    return HTML_ENTITY_MAP[c] || "&#x" + ('00' + c.charCodeAt(0).toString(16)).slice(-2) + ";";
  });
  }

var _encodeJavaScriptIdentifier = function(text) {
  return text && text.replace(JAVASCRIPT_CHARACTERS_EXPRESSION, function (c) {
    return "\\u" + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
  });
}
var _encodeJavaScriptString = function(text) {
  return text && '"' + _encodeJavaScriptIdentifier(text) + '"';
}

var _encodeJavaScriptData = function(object) {
  return JSON.stringify(object).replace(JSON_STRING_LITERAL_EXPRESSION, function (string) {
    return _encodeJavaScriptString(JSON.parse(string));
  });
}

var _encodeCSSIdentifier = function(text) {
  return text && text.replace(CSS_CHARACTERS_EXPRESSION, function (c) {
    return "\\" + ('000000' + c.charCodeAt(0).toString(16)).slice(-6);
  });
}

var _encodeCSSString= function (text) {
  return text && '"' + _encodeCSSIdentifier(text) + '"';
}

module.exports = {
  escapeHTML: _escapeHTML,
  escapeHTMLAttribute: _escapeHTMLAttribute,
  encodeJavaScriptIdentifier: _encodeJavaScriptIdentifier,
  encodeJavaScriptString: _encodeJavaScriptString,
  encodeJavaScriptData: _encodeJavaScriptData,
  encodeCSSIdentifier: _encodeCSSIdentifier,
  encodeCSSString: _encodeCSSString,
};