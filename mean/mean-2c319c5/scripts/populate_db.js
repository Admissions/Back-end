var rl = require('readline-sync');

var wipe;
do {
   wipe = rl.question("Wipe the 'applications' collection before inserting? (y/N) ").toLowerCase();
   if (wipe === "") {
      wipe = 'n';
   }
} while (wipe !== 'y' && wipe !== 'n');

var APPLICATIONS_TO_GENERATE;
do {
   APPLICATIONS_TO_GENERATE = rl.question("How many applications to generate? (Default: 50) ");
} while (!APPLICATIONS_TO_GENERATE.match(/\d+/));
APPLICATIONS_TO_GENERATE = Number(APPLICATIONS_TO_GENERATE);


var _common = require('./_common.js');
var mongoose = require('mongoose');
require('../app/models/application.server.model.js');
var Application = mongoose.model('Application');
var gradMajors = require('../../../common/majors.js').graduate_majors;


var flat = require('flat');
var chance = new require('chance').Chance();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   if (wipe === 'y') {
      Application.find().remove(function(err) {
         if (err) {
            throw "Could not wipe collection.";
         }
         else {
            console.log("Wiped collection.");
            main();
         }
      });
   }

   function main() {
      var i;
      var coll = db.collection('applications');
      var app;
      var counter = 0;

      function genApp() {
         app = generateApplication();
         Application.create(app, function(err, application) {
            counter++;
            if (counter > APPLICATIONS_TO_GENERATE) {
               mongoose.disconnect();
               return;
            }
            if (err) {
               console.error("Could not insert application. Error: " + err);
            }
            else {
               console.log("Inserted application number " + counter + " of " + APPLICATIONS_TO_GENERATE
               + " (" + application.first + ' ' + application.last + ')' );
            }
            genApp();
         });
      }

      genApp();
   }

});

mongoose.connect(_common.getConnURL());

function generateApplication() {
   
   var gender = chance.gender();
   var first = chance.first({gender: gender});
   var middle = chance.pick(['', chance.first({gender: gender})]);
   var last = chance.last();

   var degree_goal = chance.pick(['', 'D', 'M', 'H', 'S']);

   var major;
   if (degree_goal === '') {
      major = '';
   }
   else {
      major = chance.pick(gradMajors[degree_goal]);
   }
   

   var suffixes = [''];
   if (gender.toLowerCase() === 'Male') {
      suffixes.push('Jr.');
      suffixes.push('Sr.');
   }

   function gen_address() {
      return chance.address() + " " + chance.city() + ", " + chance.state() + " " + chance.zip()
   }

   var schema = {
      first: first,
      last: last,
      ufid: chance.string({
         length: 8,
         pool: '1234567890'
      }),
      personal_info: {
         name: {
            middle: middle,
            suffix: chance.pick(suffixes),
            other_names: ''
         },
         ssn: chance.ssn(),
         bd: {
            month: '' // TODO
         },
         gender: '', // TODO
         nationality: '',
         email: '',
         phone: {
            personal: [Object],
            work: [Object],
            cell: [Object]
         },
         address: {
            permanent: gen_address(),
            current: gen_address()
         },
         emergency_contact: {
            name: chance.name(),
            address: gen_address(),
            phone: chance.phone()
         }
      },
      special_programs_info: {
         special_programs_application: {
            famu_feeder: '',
            fullbright_scholar: '',
            please_identify_program: '',
            mcnair_scholar: '',
            mcknight_scholar: '',
            national_science_foundation_fellowship: '',
            national_institutes_of_health_fellowship: '',
            other: [Object]
         }
      },
      degree_programs: {
         primary_program: {
            intended_year_and_term: '',
            degree_goal: degree_goal,
            major: major // TODO needs representing in the model
         }
      },
      education_and_activities: {
         undergraduate: {
            major: '',
            specialization: ''
         },
         test_scores: '',
         activities: {
            activity: '',
            state: '',
            country: '',
            from: '',
            to: ''
         }
      }
   };
   return schema;

}
