var Listener = require('./listener.js');
test = new Listener();
test.on("ready", function(data) {
  console.log("ready: "+data);
});

test.init({});
