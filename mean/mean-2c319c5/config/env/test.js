'use strict';

module.exports = {
	//db: 'mongodb://localhost/mean-test',
	db: 'mongodb://root:root@ds063170.mongolab.com:63170/testing_scratchspace',
	port: 3001,
	app: {
		title: 'MEAN.JS - Test Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || /*'University of Florida Admissions <ufgradadmissions@gmail.com>',*/ 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || /*'Gmail',*/ 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || /*'ufgradadmissions@gmail.com',*/ 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || /*'imanelephant'*/ 'MAILER_PASSWORD'
			}
		}
	}
};
