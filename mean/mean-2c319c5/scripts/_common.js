var _config = require('./_config.js');

module.exports.getConnURL = function() {
    return 'mongodb://'
      + _config.mongolab.username
      + ':'
      + _config.mongolab.password
      + '@'
      + _config.mongolab.host
      + ':'
      + _config.mongolab.port
      + '/'
      + _config.mongolab.database
   ;
};
