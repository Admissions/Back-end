var _common = require('./_common.js');
var mongoose = require('mongoose');
var application = require('../app/models/application.server.model.js');

var flat = require('flat');
var chance = new require('chance').Chance();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   populateDB();
});

mongoose.connect(_common.getConnURL());

function populateDB() {
   
   var gender = chance.gender();
   var first = chance.first({gender: gender});
   var middle = chance.pick(['', chance.first({gender: gender})]);
   var last = chance.last();

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
            degree_goal: ''
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
   console.log(schema);

}
