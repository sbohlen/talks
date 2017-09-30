var logger = function () { }

logger.prototype.log = function (message) {
    
    //TODO: write log data to some persistence store
    console.log("%s: %s", new Date().toISOString(), message);
};

module.exports = new logger();