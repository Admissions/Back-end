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
			personal_info: {
				name: {
					first: 'Tim' ,
					middle: 'Tom',
					last: 'Toe',
					suffix: 'Foo',
					other_names: 'JJJ'
				},
				ufid: 1
			}
		});
		app2 = new Application({
			personal_info: {
				name: {
					first: 'Tim' ,
					middle: 'Tom',
					last: 'Toe',
					suffix: 'Foo',
					other_names: 'JJJ'
				},
				ufid: 1
			}
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

		it('should be able to show an error when try to save without name', function(done) {
			app.personal_info.name.first = '';
			return app.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	after(function(done) {
		Application.remove().exec();
		done();
	});
});
