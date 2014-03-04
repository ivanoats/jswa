'use strict';

// load jquery via browserify
var jQuery = require('jquery');

// just checking that jquery is working
$(console.log('jquery is ready'));

jQuery.fn.tabs = function(control){
  var element = $(this);
  control = $(control);
  element.find('li').bind('click', function(){

      // Add/remove active class from the list-item
      element.find('li').removeClass('active');
      $(this).addClass('active');

      // Add/remove active class from tabContent
      var tabName = $(this).attr('data-tab');
      control.find('>[data-tab]').removeClass('active');
      control.find('>[data-tab=\'' + tabName + '\']').addClass('active');
    });

  // Activate first tab
  element.find('li:first').addClass('active');

   // Return 'this' to enable chaining
  return this;
};
