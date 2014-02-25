'use strict';
// Code Examples from *JavaScript Web Applications*
//
// By Alex MacCaw
//
// Chapter 1


// A class "factory"
var Class = function(parent) {
  var klass = function() {
    this.init.apply(this, arguments);
  };

  // Change klass' prototype
  //
  // If a parent is passed to the Class constructor, we make sure any
  //  subclasses share the same prototype. This little dance around creating
  //  a temporary anonymous function prevents instances from being created
  //  when a class is inherited. The caveat here is that only instance
  //  properties, not class properties, are inherited. There isn’t yet a
  //  cross- browser way of setting an object’s [`__proto__;`](http://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript). Libraries like
  //  [Super.js](https://gist.github.com/mazesoul/957713) get around this problem by copying the properties,
  //  rather than implementing proper dynamic inheritance.
  if (parent) {
    var Subclass = function(){};
    Subclass.prototype = parent.prototype;
    klass.prototype = new Subclass();
  }

  klass.prototype.init = function(){};

  // Shortcut to access prototype
  klass.fn = klass.prototype;

  // Shortcut to access class
  klass.fn.parent = klass;

  // Shortcut to access super class
  klass._super = klass.__proto__;

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

// properties set on the class' prototype are also available on instances

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

// Animal example

var Animal = new Class();

Animal.include({
  breath: function(){
    console.log('breath');
  }
});

var Cat = new Class(Animal);

// Animal Usage
var tommy = new Cat();
tommy.breath();

