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

   function genderToBinary(g) {
      if (g === 'Other') {
         return chance.pick(['Male', 'Female']);
      }
      return g;
   }
   
   var gender = chance.pick(['Male', 'Female', 'Other']);
   var first = chance.first({gender: genderToBinary(gender)});
   var middle = chance.pick(['', chance.first({gender: genderToBinary(gender)})]);
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
   if (genderToBinary(gender).toLowerCase() === 'Male') {
      suffixes.push('Jr.');
      suffixes.push('Sr.');
   }

   function gen_address() {
      return chance.address() + " " + chance.city() + ", " + chance.state() + " " + chance.zip()
   }

   function gen_phone() {
      var digits = '0123456789';
      function maybeHyphen() {
         return chance.pick(['', '-']);
      }
      return chance.string({pool: digits, length: 3}) +
         maybeHyphen() + chance.string({pool: digits, length: 3}) +
         maybeHyphen() + chance.string({pool: digits, length: 4});
   }

   var domesticityOptions = ['U.S.', 'Intl'];
   var relationshipOptions = [
      '',
      'Other',
      'Mother',
      'Father',
      'Wife',
      'Husband',
      'Legal Guardian'
   ];


   var schema = {
      first: first,
      last: last,

      ufid: chance.string({
         length: 8,
         pool: '1234567890'
      }),

      completion_percent: chance.floating({min: 0, max: 100}), // TODO how is it calculated, when

      personal_info: {
         name: {
            // TODO Why do we have the first and last names in multiple places?
            first: first,
            middle: middle,
            last: last,
            suffix: chance.pick(suffixes),
            other_names: '' // TODO
         },
         has_ssn: true, // TODO
         SSN: chance.string({
            length: 9,
            pool: '1234567890'
         }),
         previous_application: chance.bool(),
         previous_attendance: chance.bool(),
         application_started: true, // TODO When would this ever be false?
         application_complete: false, // TODO
         application_submitted: false, // TODO
         // TODO why do we have both a 'dob' and a 'bd' ?
         dob: chance.date(),
         bd: {
            month: 'January',
            day: 2,
            year: 1930,
         },
         gender: gender,

         nationality: 'US', // TODO!

         ethnicity: {
            hispanic: chance.bool(), // TODO
            specifics: { // TODO?
               'amer_indian_or_alaska': chance.bool(),
               'asian': chance.bool(),
               'black_african_amer': chance.bool(),
               'hawaii_or_pacific': chance.bool(),
               'white': chance.bool()
            }
         },

         email: chance.pick([
            '',
            chance.email()
         ]),
         phone: {
            personal: {
               number: gen_phone(),
               call: chance.pick(domesticityOptions)
            },
            work: {
               number: gen_phone(),
               call: chance.pick(domesticityOptions)
            },
            cell: {
               number: gen_phone(),
               call: chance.pick(domesticityOptions)
            }
         },
         address: {
            permanent: {
               street: chance.address(),
               city: chance.city(),
               state: chance.state(), // TODO province
               country: 'US', // TODO random
               zip: chance.zip()
            },
            current: {
               street: chance.address(),
               city: chance.city(),
               state: chance.state(), // TODO province
               country: 'US', // TODO random
               zip: chance.zip()
            },
            valid_until: chance.date() // TODO what happens if this is in the past?
         },
         emergency_contact: {
            name: {
               first: chance.pick(['', chance.first()]),
               middle: chance.pick(['', chance.first()]),
               last: chance.pick(['', chance.last()]),
               suffix: chance.pick(suffixes),
               other_names: '', // TODO
               relationship: chance.pick(relationshipOptions)
            },
            address: {
               street: chance.address(),
               city: chance.city(),
               state: chance.state(), // TODO province
               country: 'US', // TODO random
               zip: chance.zip()
            },
            phone: {
               personal: {
                  number: gen_phone(),
                  call: chance.pick(domesticityOptions)
               },

               work: {
                  number: gen_phone(),
                  call: chance.pick(domesticityOptions)
               },

               cell: {
                  number: gen_phone(),
                  call: chance.pick(domesticityOptions)
               }
            }
         },
         veteran_status: {
            active_veteran: chance.bool(), // TODO may be null
            post_sep11: chance.bool(), // TODO may be null
            eligible_va_benefits: chance.bool() // TODO may be null
         },
         conduct_disclosure: {
            charged_or_disciplined: Boolean,
            charged_law_violation: Boolean
         }
      },
      special_programs_info: {
         special_programs_application: {
            // TODO this whole section
            famu_feeder: '',
            fulbright_scholar: '',
            please_identify_program: '',
            mcnair_scholar: '',
            mcknight_scholar: '',
            national_science_foundation_fellowship: '',
            national_institutes_of_health_fellowship: '',
            other: {
               scholarship: '',
               explain: ''
            },
            check_following: {
               assistantship: false,
               distance_learning: false,
               fellowship: false,
               joint_UF_degree: false,
               three_two_program: false
            }
         },
         supporting_documentation: { // TODO
            name: chance.string({pool: 'abcde'}) + '.' + chance.string({pool: 'abcde', length: 3}) ,
            file: new Buffer(chance.natural({min: 0, max: 4096}))
         }
      },
      degree_programs: {
         // TODO whole section
         primary_program: {
            intended_year_and_term: '',
            degree_goal: '',
            program_of_study: '',
            program_specialization: '',
            department_contact: ''
         },
         statement_of_purpose: ''
      },
      education_and_activities: {
         undergraduate: {
            major: '', // TODO
            specialization: ''
         },
         self_reported_gpa: {
            GPA: chance.floating({min: 0.0, max: 4.0}),
            A: chance.natural(),
            A_minus: chance.natural(),
            B_plus: chance.natural(),
            B: chance.natural(),
            B_minus: chance.natural(),
            C_plus: chance.natural(),
            C: chance.natural(),
            C_minus: chance.natural(),
            D_plus: chance.natural(),
            D: chance.natural(),
            D_minus: chance.natural(),
            F: chance.natural()
         },
         test_scores: {

            // TODO Why are totals not automatically calculated from the parts?
            gre: {
               taken: false,
               date: null,
               verbal: null,
               quantitative: null,
               analytical_writing: null,
               total: null
            },
            gmat: {
               taken: false,
               date: null,
               verbal: null,
               quantitative: null,
               analytical_writing: null,
               integrated_reasoning: null,
               total: null
            },
            mat: {
               taken: false,
               date: null,
               score: null /* String? */
            },
            fe: {
               taken: false,
               date: null,
               score: null /* String? */
            },
            toefl: {
               taken: false,
               paper_date: null,
               listening: null,
               writing: null,
               reading: null,
               total: null,
               internet_date: null,
               readingi: null,
               listeningi: null,
               speakingi: null,
               writingi: null,
               totali: null
            },
            ielts: {
               taken: false,
               date: null,
               listening: null,
               writing: null,
               reading: null,
               speaking: null,
               total: null
            },
            melab: {
               taken: {
                  type:false,
               },
               date: null,
               composition: null,
               listening: null,
               gcvr: null,
               total: null
            },
            uf_lang_institute_program: false
         },
         activities: {
            activity: chance.pick(['', 'Employment', 'Travel', 'Military']),
            city: chance.city(),
            state: chance.state(),
            country: 'US', // TODO
            
            //////////////////////////////////////////
            // TODO why not use date fields for this section?
            //
            from: chance.month(),
            day1: chance.natural({
               min: 1,
               max: 31
            }),

            to: chance.month(),
            day2: chance.natural({
               min: 1,
               max: 31
            })
            //////////////////////////////////////////
         },
         resume: {
            name: chance.string({pool: 'abcde'}) + '.' + chance.string({pool: 'abcde', length: 3}) ,
            file: new Buffer(chance.natural({min: 0, max: 4096}))
         },
         transcript: {
            name: chance.string({pool: 'abcde'}) + '.' + chance.string({pool: 'abcde', length: 3}) ,
            file: new Buffer(chance.natural({min: 0, max: 4096}))
         }
      },

      // TODO correct spelling to affadavit
      // TODO use canonical semantic names for each of these fields
      //    as taken from the UF website
      residency_affadivit: {
         florida_residence_categories: {
            A: chance.bool(),
            B: chance.bool(),
            C: chance.bool(),
            D: chance.bool(),
            E: chance.bool(),
            F: chance.bool(),
            G: chance.bool(),
            H: chance.bool(),
            I: chance.bool(),
            J: chance.bool(),
            K: chance.bool(),
            L: chance.bool(),
            M: chance.bool(),
            N: chance.bool(),
            O: chance.bool(),
            P: chance.bool(),
            Q: chance.bool(),
            R: chance.bool(),
            S: chance.bool()
         }
      },

      created: chance.date(),

      // TODO user references
      // user: {
      //    type: Schema.ObjectId,
      //    ref: 'User'
      // },
      // assigned_faculty: {
      //    type: Schema.ObjectId,
      //    ref: 'User'
      // }

   };



   return schema;

}

/////


