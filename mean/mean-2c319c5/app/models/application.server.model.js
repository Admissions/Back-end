'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var countryList = ['../../public/lib/angularjs-country-select/angular.country-select.js'.countries, ''];
var stateList = ['', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida',
    			'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    			'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    			'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    			'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

var suffixEnum = ['', 'Jr.', 'Sr.', 'II', 'III', 'IV', 'V'];
var monthsEnum = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var genderEnum = ['', 'Male', 'Female', 'Other'];
var relationEnum = ['', 'Other', 'Mother', 'Father', 'Wife', 'Husband', 'Legal Guardian'];
var termEnum = ['', 'Summer A/C (May) 2014', 'Summer B (June) 2014', 'Fall (August) 2014', 'Spring (January) 2015', 'Summer A/C (May) 2015', 'Summer B (June) 2015', 'Fall (August) 2015'];
var goalEnum = ['', 'Master\'s', 'Specialist', 'PhD', 'Doctorate', 'M', 'S', 'H', 'D'];
var scholarshipEnum = ['', 'Applied for funding', 'Funding approved'];
var studyEnum = ['../../public/modules/applications/controllers/applications.client.controller.js'.majors, ''];
var identifyEnum = ['', 'IIE', 'LASPAU', 'AMIDEAST', 'KOMMISSION'];

var zipMatch = [/^[0-9]{5}(-?[0-9]{4})?$/, 'Zip code must be 5 digits'];
var ssnMatch = [/^[0-9]{3}(-[0-9]{2}-|[0-9]{2})[0-9]{4}$/, 'SSN must be 3 digits - 2 digits - 4 digits, hyphens optional'];
//Usefulness/validity of nameMatch has been called into question by FacFrontEnd
var nameMatch = [/^[A-z-'']*$/, 'Valid names may only contain letters A to Z (upper and lowercase, ASCII only), hyphens, and apostraphes.'];
var ufidMatch = [/^[0-9]{4}-?[0-9]{4}$/, 'UFID must be 8 digits, middle hyphen optional'];
var phoneMatch = [/^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/, 'Phone numbers must be 10 digits, hyphens optional'];
var emailMatch = [/^[0-9a-zA-Z\.!#$%&'\*\+\-/=\?\^_`\{\|\}~]+@[0-9a-zA-Z]{1}[0-9a-zA-Z\-\.]+\.[0-9a-zA-Z\-\.]+/, 'Invalid email address'];
var streetMatch = [/^[A-z 0-9#]*$/, 'Street address may only contain alphanumeric characters, spaces, and (#)'];

var ApplicationSchema = new Schema({

    first: {type: String, match: nameMatch},
    last: {type: String, match: nameMatch},   
    area: {type: String},
    ufid: {type: String, match: ufidMatch},             
    completion_percent: Number,
    personal_info: {
        name: {
            first: String,
            middle: String,
            last: String,
            suffix: {type: String, enum: suffixEnum},
            other_names: String
        },
		no_ssn: Boolean,
        ssn: {type: String, match: ssnMatch},
        previous_application: Boolean,
        previous_attendance: Boolean,
		application_started: Boolean,
		application_complete: Boolean,
        //dob: Date,  not used
		bd: {
			month: {type: String, enum: monthsEnum},
			day: {type: Number, min: 1, max: 31},
			year: {type: Number, min: 1920},
		},
        gender: {type: String, enum: genderEnum},
        nationality: {type: String, enum: countryList},
        ethnicity: {
            hispanic: Boolean,
            american_indian: Boolean,
			asian: Boolean,
			black: Boolean,
			pacific_islander: Boolean,
			white: Boolean
        },
        email: {type: String, match: emailMatch},
        phone: {
            personal: {
                number: {type: String, match: phoneMatch},
                intl: Boolean
			},
            work: {
                number: {type: String, match: phoneMatch},
                intl: Boolean
            },
            cell: {
                number: {type: String, match: phoneMatch},
                intl: Boolean
            },
        },
        address: {
            permanent: {
				street: {type: String, match: streetMatch},
				city: String,
				state: {type: String, enum: stateList},
				country: {type: String, enum: countryList},
				zip: {type: String,match: zipMatch}
			},
            current: {
				street: {type: String, match: streetMatch},
				city: String,
				state: {type: String, enum: stateList},
				country: {type: String, enum: countryList},
				zip: {type: String, match: zipMatch}
			},
            //valid_until: Date  not used
        },
        emergency_contact: {
            name: {
                first: {type: String, match: nameMatch},
                middle: {type: String, match: nameMatch},
                last: {type: String, match: nameMatch},
                suffix: {type: String, enum: suffixEnum},
                other_names: {type: String, match: nameMatch},
                relationship: {type: String, enum: relationEnum}
            },
            address: {
				street: {type: String, match: streetMatch},
				city: String,
				state: {type: String, enum: stateList},
				country: {type: String, enum: countryList},
				zip: {type: String, match: zipMatch}
            },
            phone: {
                personal: {
                    number: {type: String, match: phoneMatch},
					},
					
                work: {
                    number: {type: String, match: phoneMatch},
					},

                cell: {
                    number: {type: String, match: phoneMatch},
                }
            }
        },
        veteran_status: {
            active_veteran: Boolean,
            post_sep11: Boolean,
            eligible_va_benefits: Boolean
        },
        conduct_disclosure: {
            charged_or_disciplined: Boolean,
            charged_law_violation: Boolean
        }
    },
    special_programs_info: {
        special_programs_application: {
            famu_feeder: {type: String, enum: scholarshipEnum},
            fulbright_scholar: {type: String, enum: scholarshipEnum},
			please_identify_program: {
				type: String,
				enum: identifyEnum
			},
            mcnair_scholar: {type: String, enum: scholarshipEnum},
            mcknight_scholar: {type: String, enum: scholarshipEnum},
            national_science_foundation_fellowship: {type: String, enum: scholarshipEnum},
            national_institutes_of_health_fellowship: {type: String, enum: scholarshipEnum},
            other: {
				scholarship: {type: String, enum: scholarshipEnum},
				explain: String
			},
            check_following: {
				assistantship: Boolean,
				distance_learning: Boolean,
				fellowship: Boolean,
				joint_UF_degree: Boolean,
				three_two_program: Boolean
			}/* check if you are the following?? */
        },
        supporting_documentation: { /* TBD upload files */ 
            name: String,
            file: Buffer
        }
    },
    degree_programs: {
        primary_program: {
            intended_year_and_term: {type: String, enum: termEnum},
            degree_goal: {type: String, enum: goalEnum},
            program_of_study: String,
            program_specialization: String,
            department_contact: String
        },
        statement_of_purpose: String
    },
    education_and_activities: {
        undergraduate: {
            major: String,
            specialization: String,
        },
        self_reported_gpa: {
        	GPA: {
        		type: Number,
        		default: 0,
        		min: 0,
        		max: 4
        	},
            /**Not used anywhere
			A: Number,
			A_minus: Number,
			B_plus: Number,
			B: Number,
			B_minus: Number,
			C_plus: Number,
			C: Number,
			C_minus: Number,
			D_plus: Number,
			D: Number,
			D_minus: Number,
			F: Number
            **/
		},
        test_scores: {
            gre: {
            	taken: Boolean,
            	date:Date,
            	verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                total: Number
            },
            gmat: {
            	taken: Boolean,
                date: Date,
                verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                integrated_reasoning: Number,
                total: Number
            },
            mat: {
            	taken: Boolean,
                date: Date,
                score: Number
            },
            fe: {
            	taken: Boolean,
                date: Date,
                score: Number
            },
            toefl: {
            	taken: Boolean,
                paper_date: Date,
                listening: Number,
                writing: Number,
                reading: Number,
                total: Number,
                internet_date: Date,
                readingi: Number,
                listeningi: Number,
                speakingi: Number,
                writingi: Number,
                totali: Number
            },
            ielts: {
            	taken: Boolean,
                date: Date,
                listening: Number,
                writing: Number,
                reading: Number,
                speaking: Number,
                total: Number
            },
            melab: {
            	taken: {
            		type:Boolean,
            	},
                date: Date,
                composition: Number,
                listening: Number,
                gcvr: Number,
                total: Number
            },
            uf_lang_institute_program: Boolean
        },
        /***removed from application altogether
        activities: {
            activity: String,
            city: String,
            state: {type: String, enum: stateList},
            country: {type: String, enum: countryList},
            from: {type: String, enum: monthsEnum},
            day1: {type: Number, min: 1, max: 31},
            to: {type: String, enum: monthsEnum},
            day2: {type: Number, min: 1, max: 31}
        },*****/
        resume: {
            name: String,
            file: Buffer
        },
        transcript: {
            name: String,
            file: Buffer
        }
    },
    residency_affadivit: {
            florida_residence_categories: {
            A: Boolean,
            B: Boolean,
			C: Boolean,
			D: Boolean,
			E: Boolean,
			F: Boolean,
			G: Boolean,
			H: Boolean,
			I: Boolean,
			J: Boolean,
			K: Boolean,
			L: Boolean,
			M: Boolean,
			N: Boolean,
			O: Boolean,
			P: Boolean,
			Q: Boolean,
			R: Boolean,
			S: Boolean
        }
    },
    created: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref: 'User'}
});
mongoose.model('Application', ApplicationSchema);

//short for null_or_undefined, returns true if "empty"
//		(qualification for "empty" might expand)
var minSizePDF = 739; //minimum file size for an "acceptable" PDF, in bytes
var dne = function(immavar) {
	return (immavar === null || immavar === undefined || immavar === '' || immavar.length === undefined || immavar.length < minSizePDF);
};

//COMPLETION PERCENT UPDATER
/** Optional Fields are:
    Middle Name
    Suffix
    SSN || Checkbox (1 of 2 required)
    Have ever submitted, attended
    Basically every boolean/click-box
    Ethnicity (Can elect not to disclose)
    2/3 phone numbers (only 1 required)
    All veteran checkboxes
    Conduct disclosure
    All of "Special Programs Info"
    Prog_specialization
    Dept_contact
    All of test scores (currently)
    All of Residency Info (checkboxes)
**/

ApplicationSchema.pre('save', function(next) {
    var p_i = this.personal_info;
    var e_name = p_i.emergency_contact.name;
    var e_num = p_i.emergency_contact.phone;
    var perm = p_i.address.permanent;
    var curr = p_i.address.current;
    var e_addr = p_i.emergency_contact.address;
    var e_and_a = this.education_and_activities;
    var deg = this.degree_programs;
    var prim = deg.primary_program;
    this.completion_percent =   (
         ((!p_i.no_ssn && dne(p_i.ssn))         ? 0:4) +
         (dne(this.first)                       ? 0:2) +
         (dne(this.last)                        ? 0:2) +
         (dne(this.ufid)                        ? 0:4) +
         (dne(p_i.bd.month)                     ? 0:4) +
         (dne(p_i.bd.day)                       ? 0:4) +
         (dne(p_i.bd.year)                      ? 0:4) +
         (dne(p_i.gender)                       ? 0:4) +
         (dne(p_i.nationality)                  ? 0:4) +
         (dne(p_i.email)                        ? 0:4) +
         (dne(e_name.first)                     ? 0:4) +
         (dne(e_name.last)                      ? 0:4) +
         (dne(e_name.relationship)              ? 0:4) +
         (dne(e_and_a.undergraduate.major)      ? 0:4) +
         (e_and_a.self_reported_gpa.GPA === 0   ? 0:4) +
         (dne(e_and_a.transcript)               ? 0:4) +
         //(dne(e_and_a.recommendation)           ? 0:4) +   //what has this been renamed?
         (dne(e_and_a.resume)                   ? 0:4) +
         (dne(prim.intended_year_and_term)      ? 0:4) +
         (dne(prim.degree_goal)                 ? 0:4) +
         (dne(prim.program_of_study)            ? 0:4) +
         (dne(deg.statement_of_purpose)         ? 0:4) +
         ((dne(e_addr.street) || dne(e_addr.city) || dne(e_addr.country) || dne(e_addr.zip))                        ? 0:4) +
         ((dne(e_num.personal.number) && dne(e_num.work.number) && dne(e_num.cell.number))                          ? 0:4) +
         ((dne(p_i.phone.personal.number) && dne(p_i.phone.work.number) && dne(p_i.phone.cell.number))              ? 0:4) +
         ((dne(curr.street) || dne(curr.city) || dne(curr.country) || dne(curr.zip) || (curr.country === 'United States' && dne(curr.zip))  ? 0:4) +
         ((dne(perm.street) || dne(perm.city) || dne(perm.country) || dne(perm.zip) || (perm.country === 'United States' && dne(perm.zip))  ? 0:4) 
        )));
    p_i.application_started = (this.completion_percent > 0 ? true:false);
    p_i.application_complete = (this.completion_percent === 100 ? true:false);
    p_i.name.first = this.first;
    p_i.name.last = this.last;
    next();
});
