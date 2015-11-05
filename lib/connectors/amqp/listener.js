var util = require("util");
var amqp = require('amqp');
var EventEmitter = require('events').EventEmitter;
 
module.exports = Listener;

function Listener() {
    var connectionData = {};
    var connection = {};
    EventEmitter.call(this)
}

util.inherits(Listener, EventEmitter);

Listener.prototype.init = function (connectionObject){
    this.connectionData = {
        server: 'localhost',
        port: '5672',
        queue: ''
    }
    for (var prop in connectionObject) {
        if (connectionObject.hasOwnProperty(prop)) {
            switch(prop) {
                case 'server':
                    this.connectionData.server = connectionObject[prop];
                    break;
                case 'port':
                    this.connectionData.port = connectionObject[prop];
                    break;
                case 'queue':
                    this.connectionData.queue = connectionObject[prop];
                    break;
            }
        }
    }
    
    this.connection = amqp.createConnection({ host: this.connectionData.server });
    this.emit("ready", {'server':this.connectionData.server,'port':this.connectionData.port,'queue':this.connectionData.queue});
    this.connection.on('data', function(data) {
        this.emit('data', data);
    });
}


