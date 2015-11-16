var util = require("util");
var amqp = require('amqp');
var EventEmitter = require('events').EventEmitter;
 
module.exports = Sender;

function Sender() {
    var connectionData = {};
    var connection = {};
    EventEmitter.call(this)
}

util.inherits(Sender, EventEmitter);

Sender.prototype.init = function (connectionObject){
    this.connectionData = {
        server: 'localhost',
        port: '5672',
        routingkey: '',
        exchange: '#'
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
                case 'routingkey':
                    this.connectionData.routingkey = connectionObject[prop];
                    break;
            }
        }
    }
    
    this.connection = amqp.createConnection({ host: this.connectionData.server });
    this.connection.on('ready', function () {
        this.emit("ready", {'server':this.connectionData.server,'port':this.connectionData.port,'queue':this.connectionData.queue});
    }.bind(this));
    this.send = function(data, options) {
        this.connection.publish(this.connectionData.routingkey, data, options);
    }
}


