'use strict';
// Code Examples from *JavaScript Web Applications*
//
// By Alex MacCaw
//
// Chapter 1


// A class "factory"
var Class = function() {
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

  // adding instance properties
  klass.include = function(obj) {
    var included = obj.included;
    for (var i in obj) {
      klass.fn[i] = obj[i];
    }
    if (included) included(klass);
  };

  return klass;
};

// Now, examples of using the class

var Person = new Class();

// properties sete on the class' prototype are also available on instances

Person.prototype.init = function() {
  // Called on Person instantiation
  console.log('I\'m being initialized');
};

// But that syntax is "a little convoluted, impractical and repetitive"
// (not classical enough?) for Alex MacCaw, so he makes **include**
// and **extend** methods like so:

Person.include({
  save:  function(id) {
    console.log( id + ' is being saved');
  },
  destroy: function(id) {
    console.log( id + 'is being destroyed!');
  }
});

var person = new Person();
person.save();

Person.extend({
  extended: function(klass) {
    console.log(klass, ' was extended');
  }
});


