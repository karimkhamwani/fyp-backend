var crypto = require('crypto');
var util = require('util');

module.exports = {
    generateSalt: function() {
        var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
        var salt = '';
        for (var i = 0; i < 10; i++) {
            var p = Math.floor(Math.random() * set.length);
            salt += set[p];
        }
        return salt;
    },

    md5: function(str) {
        return crypto.createHash('md5').update(str).digest('hex');
    },

    saltAndHash: function(pass, callback) {
        var salt = this.generateSalt();
        callback(salt + this.md5(pass + salt));
    },

    validatePassword: function(plainPass, hashedPass, callback) {
        var salt = hashedPass.substr(0, 10);
        var validHash = salt + this.md5(plainPass + salt);
        callback(null, hashedPass === validHash);
    }
}
