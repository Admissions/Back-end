'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var countryList = ['../../public/lib/angularjs-country-select/angular.country-select.js'.countries, ''];
var stateList = ['', ' ', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida',
    			'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    			'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    			'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    			'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

var suffixEnum = ['', ' ', 'Jr.', 'Sr.', 'II', 'III', 'IV', 'V'];
var monthsEnum = ['', ' ', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var genderEnum = ['', ' ', 'Male', 'Female', 'Other'];
var relationEnum = ['', ' ', 'Other', 'Mother', 'Father', 'Wife', 'Husband', 'Legal Guardian'];
var termEnum = ['', ' ', 'Summer A/C (May) 2014', 'Summer B (June) 2014', 'Fall (August) 2014', 'Spring (January) 2015', 'Summer A/C (May) 2015', 'Summer B (June) 2015', 'Fall (August) 2015'];
var goalEnum = ['', 'M', 'S', 'H', 'D'];
var scholarshipEnum = ['', ' ', 'Applied for funding', 'Funding approved'];
var identifyEnum = ['', ' ', 'IIE', 'LASPAU', 'AMIDEAST', 'KOMMISSION'];

var zipMatch = [/^[0-9]{5}(-?[0-9]{4})?$/, 'Zip code must be 5 digits'];
var ssnMatch = [/^[0-9]{3}(-[0-9]{2}-|[0-9]{2})[0-9]{4}$/, 'SSN must be 3 digits - 2 digits - 4 digits, hyphens optional'];
var nameMatch = [/^[A-z-'']*$/, 'Valid names may only contain letters A to Z (upper and lowercase, ASCII only), hyphens, and apostrophes.'];
var ufidMatch = [/^[0-9]{4}-?[0-9]{4}$/, 'UFID must be 8 digits, middle hyphen optional'];
var phoneMatch = [/^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/, 'Phone numbers must be 10 digits, hyphens optional'];
var emailMatch = [/.+\@.+\..+/, 'Invalid email address'];
var streetMatch = [/^[A-z 0-9#]*$/, 'Street address may only contain alphanumeric characters, spaces, and (#)'];

var ApplicationSchema = new Schema({
   

    first: {
                type: String,
                match: nameMatch
            },

    last: {
                type: String,
                match: nameMatch
            },   

    ufid: {
            type: String,
            match: ufidMatch
        },             

    completion_percent: Number,

    personal_info: {
        name: {
            first: {
				type: String,
			},
            middle: {
				type: String,
				match: nameMatch
			},
            last: {
				type: String,
			},
            suffix: {
				type: String,
				enum: suffixEnum
			},
            other_names: {
				type: String,
				match: nameMatch
			}
        },
		has_ssn: Boolean,
        ssn: {
			type: String,
			match: ssnMatch
		},
        ufid: String,
        previous_application: Boolean,
        previous_attendance: Boolean,
		application_started: Boolean,
		application_complete: Boolean,
        dob: Date,
		bd: {
			month: {
				type: String,
				enum: monthsEnum
			},
			day: {
				type: Number,
				min: 1,
				max: 31
			},
			year: {
				type: Number,
				min: 1920
			},
		},
        gender: {
			type: String,
			enum: genderEnum
		},
        nationality: {
			type: String,
			enum: countryList
		},
        ethnicity: {
            hispanic: Boolean,
            american_indian: Boolean,
			asian: Boolean,
			black: Boolean,
			pacific_islander: Boolean,
			white: Boolean
        },
        email: {
			type: String,
			match: emailMatch
		},
        phone: {
            personal: {
                number: {
					type: String,
					match: phoneMatch
				},
                call: String
			},
            work: {
                number: {
					type: String,
					match: phoneMatch
				},
                call: String
            },
            cell: {
                number: {
					type: String,
					match: phoneMatch
				},
                call: String
            }
        },
        address: {
            permanent: {
				street: {
					type: String,
					match: streetMatch
				},
				city: {
					type: String,
				},
				state: {
					type: String,
					enum: stateList
				},
				country: {
					type: String,
					enum: countryList
				},
				zip: {
					type: String,
					match: zipMatch
				}
			},
            current: {
				street: {type: String, match: streetMatch},
				city: String,
				state: {type: String, enum: stateList},
				country: {type: String, enum: countryList},
				zip: {type: String, match: zipMatch}
			},
            valid_until: Date
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
                    us: String,
                    intl: String
					},
					
                work: {
                    number: {type: String, match: phoneMatch},
                    us: String,
                    intl: String
					},

                cell: {
                    number: {type: String, match: phoneMatch},
                    us: String,
                    intl: String
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
            famu_feeder: {
				type: String,
				enum: scholarshipEnum
			},
            fullbright_scholar: {
				type: String,
				enum: scholarshipEnum
			},
			please_identify_program: {
				type: String,
				enum: identifyEnum
			},
            mcnair_scholar: {
				type: String,
				enum: scholarshipEnum
			},
            mcknight_scholar: {
				type: String,
				enum: scholarshipEnum
			},
            national_science_foundation_fellowship: {
				type: String,
				enum: scholarshipEnum
			},
            national_institutes_of_health_fellowship: {
				type: String,
				enum: scholarshipEnum
			},
            other: {
				scholarship: {
					type: String,
					enum: scholarshipEnum
				},
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
            major: {
				type: String,
			},
            specialization: {
				type: String,
			}
        },
        self_reported_gpa: {

        	GPA: {

        		type: Number,
        		default: 0,
        		min: 0,
        		max: 4
        	},
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
                score: Number /* String? */
            },
            fe: {
            	taken: Boolean,
                date: Date,
                score: Number /* String? */
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
        activities: {
            activity: String,
            city: String,
            state: {type: String, enum: stateList},
            country: {type: String, enum: countryList},
            from: {type: String, enum: monthsEnum},
            day1: {type: Number, min: 1, max: 31},
            to: {type: String, enum: monthsEnum},
            day2: {type: Number, min: 1, max: 31}
        },
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
    created: {
        type: Date,
        default: Date.now
    },

    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    assigned_faculty: {
        type: Schema.ObjectId,
        ref: 'User'
    },

});

mongoose.model('Application', ApplicationSchema);

//short for null_or_undefined, returns true if "empty"
//		(qualification for "empty" might expand)
var dne = function(immavar) {
	return (immavar === null || immavar === undefined);
};

//COMPLETION PERCENT UPDATER
//Pretttttty sure it adds up to 100%
//We'll debate what's required, what's not, and what each are worth --later.
ApplicationSchema.pre('save', function(next) {
	var p_i = this.personal_info;
	var eth = p_i.ethnicity;
	var e_name = p_i.emergency_contact.name;
	var e_num = p_i.emergency_contact.phone;
	var perm = p_i.address.permanent;
	var curr = p_i.address.current;
	var e_addr = p_i.emergency_contact.address;
	var e_and_a = this.education_and_activities;
	var t_1 = e_and_a.test_scores.gre;
	var t_2 = e_and_a.test_scores.gmat;
	var t_3 = e_and_a.test_scores.mat;
	var t_4 = e_and_a.test_scores.fe;
	var t_5 = e_and_a.test_scores.toefl;
	var t_6 = e_and_a.test_scores.ielts;
	var t_7 = e_and_a.test_scores.melab;
	//NOT WORKING DNE CHECKS ==> E_NUMBERS ARE WEIRD GUYS
	this.completion_percent = 	(((!p_i.has_ssn && dne(p_i.ssn)) 		? 0:4) +
								 (dne(this.first) 						? 0:4) +
								 (dne(this.last) 						? 0:4) +
								 (dne(this.ufid) 						? 0:4) +
								 (dne(p_i.bd.month) 					? 0:4) +
								 (dne(p_i.bd.day) 						? 0:4) +
								 (dne(p_i.bd.year) 						? 0:4) +
								 (dne(p_i.gender) 						? 0:4) +
								 (dne(p_i.nationality) 					? 0:4) +
								 (dne(p_i.email) 						? 0:4) +
								 (dne(e_name.first) 					? 0:4) +
								 (dne(e_name.last) 						? 0:4) +
								 (dne(e_name.relationship) 				? 0:4) +
								 (dne(e_and_a.undergraduate.major)		? 0:6) +
								 (e_and_a.self_reported_gpa.GPA !== 0 	? 4:0) +
								 ((eth.asian || eth.black || eth.pacific_islander || eth.american_indian || eth.hispanic || eth.white)		? 4:0) +
								 ((dne(p_i.phone.personal.number) && dne(p_i.phone.work.number) && dne(p_i.phone.cell.number)) 				? 0:4) +
								 ((dne(curr.street) || dne(curr.city) || dne(curr.country) /*|| dne(curr.zip)*/) 							? 0:6) +
								 ((dne(perm.street) || dne(perm.city) || dne(perm.country) /*|| dne(perm.zip)*/) 							? 0:6) +
								 ((dne(e_addr.street) || dne(e_addr.city) || dne(e_addr.country) || dne(e_addr.zip)) 						? 0:6) +
								 //((dne(e_num.personal.number) && dne(e_num.work.number) && dne(e_num.cell.number)) 							? 4:0) +
								 //(this.education_and_activities.transcript 		!== null ?  6:0) +		//can't get this comparison to work quite yet
								 //(this.education_and_activities.recommendation	!== undefined ?  4:0) +		//does this variable even exist? -> as "supporting documentation"
								 (((!t_1.taken || dne(t_1.date) || dne(t_1.verbal) || dne(t_1.quantitative) || dne(t_1.analytical_writing) || dne(t_1.total)) && (!t_2.taken || dne(t_2.date) || dne(t_2.verbal) || dne(t_2.quantitative) || dne(t_2.analytical_writing) || dne(t_2.integrated_reasoning) || dne(t_2.total)) && (!t_3.taken || dne(t_3.date) || dne(t_3.score)) && (!t_4.taken || dne(t_4.date) || dne(t_4.score)) && (!t_5.taken || dne(t_5.paper_date) || dne(t_5.listening) || dne(t_5.writing) || dne(t_5.reading) || dne(t_5.total) || dne(t_5.internet_date) || dne(t_5.readingi) || dne(t_5.listeningi) || /*dne(t_5.speakingi) ||*/ dne(t_5.writingi) || dne(t_5.totali)) && (!t_6.taken || dne(t_6.date) || dne(t_6.listening) || dne(t_6.writing) || dne(t_6.reading) || dne(t_6.speaking) || dne(t_6.total)) && (!t_7.taken || dne(t_7.date) || dne(t_7.composition) || dne(t_7.listening) || dne(t_7.gcvr) || dne(t_7.total))) ?  0:12));
p_i.application_started = (this.completion_percent > 0 ? true:false);
p_i.application_complete = (this.completion_percent === 100 ? true:false);
	next();
});
