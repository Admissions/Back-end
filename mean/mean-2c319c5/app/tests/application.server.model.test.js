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
var defaultApp = {
    first: 'Tim',
    last: 'Toe',
    ufid: '12345678',
    personal_info: {
        name: {
            middle: 'Fil'
        },
        ssn: "123-45-6789",
        address: {
            permanent: {
                zip: "12345"
            }
        },
        phone: {
            personal: {
                number: '1234567890'
            }
        }
    }
};
describe('Application Model Unit Tests:', function() {
    beforeEach(function(done) {
        app = new Application(defaultApp);
        app2 = new Application(defaultApp);
        done();
    });
    afterEach(function(done) {
        Application.remove().exec();
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

        it('should be able to remove without problems', function(done) {
            app.save();
            app.remove(done);
        });

        it('should fail to save an existing application again', function(done) {
        	app.save();
        	return app2.save(function(err) {
        		should.exist(err);
        		done();
        	});
        });

    });
    describe('Name Match', function() {
        /*it('should not be able to save an empty name', function(done) {
            app.first = '';
            return app.save(function(err) {
                should.exist(err);
                done();
            });
        });*/
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
                it('should not be able to save names with "' + str + '" in them', function(done) {
                    app.first = str
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(badNameChar[i]);
        }
    });
    describe('Phone Number Match', function() {
        /*it('should not be able to save empty phone numbers', function(done) {
            app.personal_info.phone.personal.number = '';
            return app.save(function(err) {
                should.exist(err);
                done();
            });
        });*/
        it('should be able to save phone numbers', function(done) {
            app.personal_info.phone.personal.number = '1231231234';
            app.save(done);
        });
        it('should be able to save phone numbers with hypens', function(done) {
            app.personal_info.phone.personal.number = '123-123-1234';
            app.save(done);
        });

        var str = '';
        for (var i = 1; i < 10; i++) {
            str += i;
            (function(number) {
                it('should not be able to save phone number with less than 10 digits: ' + number , function(done) {
                    app.personal_info.phone.personal.number = number;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str);
        }
        // incorrect groups of digits
        for (var i = 0; i < 6; i++) {
            var str = '';
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < i; k++) {
                    str += k;
                }
                if (j < 2) {
                    str += '-';
                }
            }
            (function(number) {
                it('should not be able to save phone number: ' + str, function(done) {
                    app.personal_info.phone.personal.number = number;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str);
        }
    });
    describe('Zip Code Match', function() {
        it('should be able to save a zip code', function(done) {
            app.personal_info.address.permanent.zip = '12345';
            app.save(done);
        });
        var str = '';
        for (var i = 1; i < 5; i++) {
            str += i;
            (function(zip) {
                it('should not be able to save a zip code with less than 5 digits: ' + zip , function(done) {
                    app.personal_info.address.permanent.zip = zip;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str);
        }
        it('should not be able to save a zip code with more than 5 digits', function(done) {
            app.personal_info.address.permanent.zip = '1234567';
            return app.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });
    describe('UFID Match', function() {
        /*it('should not be able to save empty UFID', function(done) {
            app.ufid = '';
            return app.save(function(err) {
                should.exist(err);
                done();
            });
        });*/
        it('should be able to save a UFID with hyphen', function(done) {
            app.ufid = '1234-1234';
            app.save(done);
        });
        it('should be able to save a UFID without hyphen', function(done) {
            //app.personal_info.phone.personal.number = '1234567890';
            //app.first = 'hi';
            app.ufid = '12341234';
            app.save(done);
        });
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
    describe('SSN Match', function() {
        /*it('should not be able to save empty SSN', function(done) {
            app.ssn = '';
            return app.save(function(err) {
                should.exist(err);
                done();
            });
        });*/
        it('should be able to save a SSN with hyphen', function(done) {
            app.personal_info.ssn = '123-45-1234';
            app.save(done);
        });
        it('should be able to save a SSN without hyphen', function(done) {
            //app.personal_info.phone.personal.number = '1234567890';
            //app.first = 'hi';
            app.personal_info.ssn = '123456789';
            app.save(done);
        });
        it('should not be able to save "---" as an SSN', function(done) {
            app.personal_info.ssn = '---';
            return app.save(function(err) {
                should.exist(err);
                done();
            });
        });
        var str = '';
        for (var i = 1; i < 9; i++) {
            str += i;
            (function(str) {
                it('should not be able to save "' + str + '" as a SSN', function(done) {
                    app.personal_info.ssn = str;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str);
        }
        str = "123-";
        for (var i = 1; i < 2; i++) {
            str += i;
            (function(str) {
                it('should not be able to save "' + str + '" as a SSN', function(done) {
                    app.personal_info.ssn = str;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str);
        }
        str = "-12-";
        var s;
        for (var i = 1; i < 4; i++) {
            str = i + str;
            (function(str) {
                it('should not be able to save "' + str + '" as a SSN', function(done) {
                    app.personal_info.ssn = str;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str);
        }
    });
    /* This covers most email problems, but is not completely comprehensive.
     * Doesn't test if comments work, or quoted strings */
    describe('Email Match', function() {
        var str = 'foo@bar.baz';
        (function (str) {
            it('should be able to save an email: ' + str, function(done) {
                app.personal_info.email = str;
                app.save(done);
            });
        })(str);
        str = 'foobar.baz';
        (function (str) {
            it('should not be able to save an email with no "@": ' + str, function(done) {
                app.personal_info.email = str;
                return app.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        })(str);
        str = 'foo@bar@baz.com';
        (function (str) {
            it('should not be able to save an email with multiple "@": ' + str, function(done) {
                app.personal_info.email = str;
                return app.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        })(str);
        str = 'foo..bar@baz.com';
        (function (str) {
            it('should not be able to save an email with double ".": ' + str, function(done) {
                app.personal_info.email = str;
                return app.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        })(str);
        str = 'foo.bar@baz..com';
        (function (str) {
            it('should not be able to save an email with double ".": ' + str, function(done) {
                app.personal_info.email = str;
                return app.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        })(str);
        str = 'foobar@baz';
        (function (str) {
            it('should not be able to save an email with incomplete domain: ' + str, function(done) {
                app.personal_info.email = str;
                return app.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        })(str);
        str = 'foo.bar@';
        (function (str) {
            it('should not be able to save an email without a domain: ' + str, function(done) {
                app.personal_info.email = str;
                return app.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        })(str);
        str = 'foo.bar@a23456789012345678901234567890123456789012345678901234567890.com';
        (function (str) {
            it('should not be able to save an email with domain longer than 63 characters: ' + str, function(done) {
                app.personal_info.email = str;
                return app.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        })(str);
        var badDomainChar = ['!', '@', '`', '#', '$',
            '%', '^', '&', '*', '(', ')', '_', '=', '+', '~', '[', ']', '{', '}', '|', '\\',
            ';', ':', '"', ',', '<', '.', '>', '/', '?'
        ];
        for (var i = 0; i < badDomainChar.length; i++) {
            str = 'foobar@';
            (function (str, c) {
                str += c;
                str += '.com';
                it('should not be able to save an email with domain containing "' + c + '": ' + str, function(done) {
                    app.personal_info.email = str;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str, badDomainChar[i]);
        }
        var badLocalChar = ['"', '(', ')', ',', ':', ';', '<', '>', '[', '\\', ']' ];
        for (var i = 0; i < badLocalChar.length; i++) {
            str = 'foobar@baz.com';
            (function (str, c) {
                str = c + str;
                it('should not be able to save an email with local name containing "' + c + '": ' + str, function(done) {
                    app.personal_info.email = str;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str, badLocalChar[i]);
        }
    });
    describe('Street Match', function() {
        var str = '1234 NW 40 ST FOO bar BAZ #1544';
        (function (str) {
            it('should be able to save a street with any of these characters: ' + str, function(done) {
                app.personal_info.address.permanent.street = str;
                app.save(done);
            });
        })(str);
        var badStreetChar = ['!', '@', '`', '$', '%', '^', '&', '*', '(', ')',
            '_', '=', '+', '~', '[', ']', '{', '}', '|', '\\', ';', ':', '"', ',',
            '<', '.', '>', '/', '?'
        ];
        for (var i = 0; i < badStreetChar.length; i++) {
            str = 'foo bar';
            (function (str, c) {
                str += c;
                it('should not be able to save a street containing "' + c + '": ' + str, function(done) {
                    app.personal_info.address.permanent.street =  str;
                    return app.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            })(str, badStreetChar[i]);
        }
    });
});
