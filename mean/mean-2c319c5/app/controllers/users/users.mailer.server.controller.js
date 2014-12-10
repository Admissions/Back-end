'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	config = require('../../../config/config'),
	nodemailer = require('nodemailer'),
	crypto = require('crypto'),
	async = require('async'),
	crypto = require('crypto');
	
/**
 * Register user mail
 */
exports.welcome = function(req, res, next){
	async.waterfall([
		function(done) {
			res.render('templates/register-confirm-email', {
				name: req.body.user.username
			}, function(err, emailHTML) {
				if (err) done(err);
				else done(null, emailHTML, req.body.user);
			});
		},
		function(emailHTML, user, done) {
			var smtpTransport = nodemailer.createTransport(config.mailer.options);
			var mailOptions = {
				to: req.body.user.email, //'nhgeunyreyn@gmail.com',
				from: config.mailer.from,
				subject: 'Registration',
				html: emailHTML
			};
			smtpTransport.sendMail(mailOptions, function(err) {
				if (!err) {
					res.send({
						message: 'An email has been sent to ' + user.email + '.'
					});
					done(null);
				} else {
					console.log(err);
					done(err);
				}
			});
		}
	], function(err) {
		if (err) {
			console.log('waterfall failure');
			return next(err);
		}
	});
};

exports.recommend = function(req, res, next){
	async.waterfall([
		// Generate random token
		function(done) {
			crypto.randomBytes(20, function(err, buffer) {
				var token = buffer.toString('hex');
				done(err, token);
			});
		},
		function(token, done) {
			res.render('templates/recommend-email', {
				name: 'Recommender',
				nameStudent: req.body.user.username,
				appName: 'University of Florida Admissions',
				url: 'http://' + req.headers.host + '/auth/reset/' + token
			}, function(err, emailHTML) {
				if (err) done(err);
				else done(null, emailHTML, req.body.user);
			});
		},
		function(emailHTML, user, done) {
			var smtpTransport = nodemailer.createTransport(config.mailer.options);
			var mailOptions = {
				to: req.body.user.email,
				from: config.mailer.from,
				subject: 'Recommendation for ' + req.body.user.username,
				html: emailHTML
			};
			smtpTransport.sendMail(mailOptions, function(err) {
				if (!err) {
					res.send({
						message: 'An email has been sent to ' + user.email + '.'
					});
					done(null);
				} else {
					console.log(err);
					done(err);
				}
			});
		}
	], function(err) {
		if (err) {
			console.log('waterfall failure');
			return next(err);
		}
	});
};
