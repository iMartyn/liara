var Listener = require('./listener.js');
var util = require('util');

test = new Listener();
test.on("ready", function(data) {
  console.log("ready: "+util.inspect(data, false, null));
});
test.on("data", function(data) {
  console.log("data: "+util.inspect(data,false,null));
});
test.init({'queue':'test'});
