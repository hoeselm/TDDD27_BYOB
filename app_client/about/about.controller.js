// IIFE (immediately-invoked function expression)
(function() {

  // register locationlistCtrl
  angular.module('byobApp').controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    
    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // variable definitions
    vm.header = 'About';
    vm.content = 'This is the about page with \n\n a description of the service';
  }


  })();
