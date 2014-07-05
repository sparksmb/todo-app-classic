/*global app */
var app = {
	view: {},
	usecase: {},
	entity: {},
	interFace: {},
	settings: {},
	main: {},
	init: function () {
		'use strict';
		if (typeof app.main.init === 'function') {
			app.main.init();
		}
	},
	run: function () {
		'use strict';
		if (typeof app.main.run === 'function') {
			app.main.run();
		} else {
			throw 'App was missing main function';
		}
	}
};

//----------------------------------------------------------------------
//
// ECMAScript 5 Polyfills
//
//----------------------------------------------------------------------

//----------------------------------------------------------------------
// ES5 15.2 Object Objects
//----------------------------------------------------------------------

//
// ES5 15.2.3 Properties of the Object Constructor
//

// ES5 15.2.3.2 Object.getPrototypeOf ( O )
// From http://ejohn.org/blog/objectgetprototypeof/
// NOTE: won't work for typical function T() {}; T.prototype = {}; new T; case
// since the constructor property is destroyed.
if (!Object.getPrototypeOf) {
	Object.getPrototypeOf = function (o) {
    if (o !== Object(o)) { throw new TypeError("Object.getPrototypeOf called on non-object"); }
    return o.__proto__ || o.constructor.prototype || Object.prototype;
  };
}

//    // ES5 15.2.3.3 Object.getOwnPropertyDescriptor ( O, P )
//    if (typeof Object.getOwnPropertyDescriptor !== "function") {
//        Object.getOwnPropertyDescriptor = function (o, name) {
//            if (o !== Object(o)) { throw new TypeError(); }
//            if (o.hasOwnProperty(name)) {
//                return {
//                    value: o[name],
//                    enumerable: true,
//                    writable: true,
//                    configurable: true
//                };
//            }
//        };
//    }

// ES5 15.2.3.4 Object.getOwnPropertyNames ( O )
if (typeof Object.getOwnPropertyNames !== "function") {
  Object.getOwnPropertyNames = function (o) {
    if (o !== Object(o)) { throw new TypeError("Object.getOwnPropertyNames called on non-object"); }
    var props = [], p;
    for (p in o) {
      if (Object.prototype.hasOwnProperty.call(o, p)) {
        props.push(p);
      }
    }
    return props;
  };
}

// ES5 15.2.3.5 Object.create ( O [, Properties] )
if (typeof Object.create !== "function") {
  Object.create = function (prototype, properties) {
    "use strict";
    if (typeof prototype !== "object") { throw new TypeError(); }
    /** @constructor */
    function Ctor() {}
    Ctor.prototype = prototype;
    var o = new Ctor();
    if (prototype) { o.constructor = Ctor; }
    if (arguments.length > 1) {
      if (properties !== Object(properties)) { throw new TypeError(); }
      Object.defineProperties(o, properties);
    }
    return o;
  };
}

// ES 15.2.3.6 Object.defineProperty ( O, P, Attributes )
// Partial support for most common case - getters, setters, and values
(function() {
  if (!Object.defineProperty ||
      !(function () { try { Object.defineProperty({}, 'x', {}); return true; } catch (e) { return false; } } ())) {
    var orig = Object.defineProperty;
    Object.defineProperty = function (o, prop, desc) {
      "use strict";

      // In IE8 try built-in implementation for defining properties on DOM prototypes.
      if (orig) { try { return orig(o, prop, desc); } catch (e) {} }

      if (o !== Object(o)) { throw new TypeError("Object.defineProperty called on non-object"); }
      if (Object.prototype.__defineGetter__ && ('get' in desc)) {
        Object.prototype.__defineGetter__.call(o, prop, desc.get);
      }
      if (Object.prototype.__defineSetter__ && ('set' in desc)) {
        Object.prototype.__defineSetter__.call(o, prop, desc.set);
      }
      if ('value' in desc) {
        o[prop] = desc.value;
      }
      return o;
    };
  }
}());

// ES 15.2.3.7 Object.defineProperties ( O, Properties )
if (typeof Object.defineProperties !== "function") {
  Object.defineProperties = function (o, properties) {
    "use strict";
    if (o !== Object(o)) { throw new TypeError("Object.defineProperties called on non-object"); }
    var name;
    for (name in properties) {
      if (Object.prototype.hasOwnProperty.call(properties, name)) {
        Object.defineProperty(o, name, properties[name]);
      }
    }
    return o;
  };
}


// ES5 15.2.3.14 Object.keys ( O )
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = function (o) {
    if (o !== Object(o)) { throw new TypeError('Object.keys called on non-object'); }
    var ret = [], p;
    for (p in o) {
      if (Object.prototype.hasOwnProperty.call(o, p)) {
        ret.push(p);
      }
    }
    return ret;
  };
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}

// ES5 15.4.4.15 Array.prototype.lastIndexOf ( searchElement [ , fromIndex ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function (searchElement /*, fromIndex*/) {
    "use strict";

    if (this === void 0 || this === null) { throw new TypeError(); }

    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0) { return -1; }

    var n = len;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n !== n) {
        n = 0;
      } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    var k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);

    for (; k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}
