var util = require("util");
var EventEmitter = require('events').EventEmitter;

module.exports = Listener;

function Listener() {
    var connection = {};
    EventEmitter.call(this)
}

util.inherits(Listener, EventEmitter);

Listener.prototype.init = function (connectionObject){
    this.connection = connectionObject;
    this.emit("ready", "BOOM!");
}


