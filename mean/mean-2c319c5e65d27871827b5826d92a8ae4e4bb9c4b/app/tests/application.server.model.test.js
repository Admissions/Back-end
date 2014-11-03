'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Application = mongoose.model('Application');

/**
 * Globals
 */
var app, app2;

/**
 * Unit tests
 */
describe('Application Model Unit Tests:', function() {
    before(function(done) {
        app = new Application({
            first: 'Tim',
            last: 'Toe',
            ufid: '12345678'
        });
        app2 = new Application({
            first: 'Tim',
            last: 'Toe',
            ufid: '12345678'
        });

        done();
    });
    describe('Method Save', function() {
        it('should begin with no applications', function(done) {
            Application.find({}, function(err, applications) {
                applications.should.have.length(0);
                done();
            });
        });

        it('should be able to save without problems', function(done) {
            app.save(done);
        });

        //		it('should be able to remove without problems', function(done) {
        //			app.save();
        //			app.remove(done);
        //		});

        //		NOT WORKING YET
        //		it('should fail to save an existing application again', function(done) {
        //			app.save();
        //			return app2.save(function(err) {
        //				should.exist(err);
        //				done();
        //			});
        //		});

        it('should be able to show an error when try to save empty name', function(done) {
            app.first = '';
            return app.save(function(err) {
                should.exist(err);
                done();
            });
        });
        it('should be able to save names with letters, hyphens, and apostrophes', function(done) {
            app.first = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-'";
            app.save(done);
        });
        var badNameChar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '`', '#', '$',
            '%', '^', '&', '*', '(', ')', '_', '=', '+', '~', '[', ']', '{', '}', '|', '\\',
            ';', ':', '"', ',', '<', '.', '>', '/', '?'
        ];
        for (var i = 0; i < badNameChar.length; i++) {
            (function(str) {
                it('should not be able to save first names with "' + str + '" in them', function(done) {
                    app.first = str
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(badNameChar[i]);
        }
        for (var i = 0; i < badNameChar.length; i++) {
            (function(str) {
                it('should not be able to save last names with "' + str + '" in them', function(done) {
                    app.last = str
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(badNameChar[i]);
        }
        // No hyphens
        var str = '';
        for (var i = 1; i < 8; i++) {
            str += i;
            (function(str) {
                it('should not be able to save "' + str + '" as a UFID', function(done) {
                    app.ufid = str;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str);
        }
        str = "1234-";
        for (var i = 1; i < 4; i++) {
            str += i;
            (function(str) {
                it('should not be able to save "' + str + '" as a UFID', function(done) {
                    app.ufid = str;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str);
        }
        str = "-1234";
        var s;
        for (var i = 1; i < 4; i++) {
            str = i + str;
            (function(str) {
                it('should not be able to save "' + str + '" as a UFID', function(done) {
                    app.ufid = str;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str);
        }
    });

    after(function(done) {
        Application.remove().exec();
        done();
    });
});
