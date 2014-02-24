var Class = function() {
  'use strict';
  var klass = function() {
    this.init.apply(this, arguments);
  };

  klass.prototype.init = function(){};

  // Shortcut to access prototype
  klass.fn = klass.prototype;

  // Shortcut to access class
  klass.fn.parent = klass;

  // Adding class properties
  klass.extend = function(obj) {
    var extended = obj.extended;
    for(var i in obj) {
      klass[i] = obj[i];
    }
    if (extended) extended(klass);
  };

  return klass;
};

var Person = new Class;
Person.prototype.init = function(){ // Called on Person instantiation
};
// Usage:
var person = new Person;
