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
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

var suffixEnum = ['', 'Jr.', 'Sr.', 'II', 'III', 'IV', 'V'];
var monthsEnum = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var genderEnum = ['', 'Male', 'Female', 'Other'];
var relationEnum = ['', 'Other', 'Mother', 'Father', 'Wife', 'Husband', 'Legal Guardian'];
var termEnum = ['', 'Summer A/C (May) 2014', 'Summer B (June) 2014', 'Fall (August) 2014', 'Spring (January) 2015', 'Summer A/C (May) 2015', 'Summer B (June) 2015', 'Fall (August) 2015'];
var goalEnum = ['', 'Master\'s', 'Specialist', 'PhD', 'Doctorate'];
var scholarshipEnum = ['', 'Applied for funding', 'Funding approved'];
var identifyEnum = ['', 'IIE', 'LASPAU', 'AMIDEAST', 'KOMMISSION'];

var zipMatch = [/^[0-9]{5}(-?[0-9]{4})?$/, 'Zip code must be 5 digits'];
var ssnMatch = [/^[0-9]{3}(-[0-9]{2}-|[0-9]{2})[0-9]{4}$/, 'SSN must be 3 digits - 2 digits - 4 digits, hyphens optional'];
var nameMatch = [/^[A-Za-z\''\-]+$/, 'Valid names may only contain letters A to Z (upper and lowercase, ASCII only), hyphens, and apostraphes.'];
var ufidMatch = [/^[0-9]{4}-?[0-9]{4}$/, 'UFID must be 8 digits, middle hyphen optional'];
var phoneMatch = [/^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/, 'Phone numbers must be 10 digits, hyphens optional'];
var emailMatch = [/.+\@.+\..+/, 'Invalid email address'];
var streetMatch = [/^[A-z 0-9#]*$/, 'Street address may only contain alphanumeric characters, spaces, and (#)'];

var ApplicationSchema = new Schema({
    first: {
        type: String,
        //default: '',
        match: nameMatch
    },
    last: {
        type: String,
        //default: '',
        match: nameMatch
    },
    ufid: {
        type: String,
        match: ufidMatch
    },
    completion_percent: {
        type: Number,
        default: 0
    },
    personal_info: {
        name: {

            middle: {
                type: String,
                //default: '',
                match: nameMatch
            },

            suffix: {
                type: String,
                //default: '',
                enum: suffixEnum
            },
            other_names: {
                type: String,
                //default: '',
                match: nameMatch
            }
        },
        has_ssn: {
            type: Boolean,
            default: false
        },
        ssn: {
            type: String,
            match: ssnMatch
        },

        previous_application: {
            type: Boolean,
            default: false
        },
        previous_attendance: {
            type: Boolean,
            default: false

        },
        application_started: {
            type: Boolean,
            default: false
        },
        application_complete: {
            type: Boolean,
            default: false
        },
        dob: Date,
        bd: {
            month: {
                type: String,
                //default: '',
                enum: monthsEnum
            },
            day: {
                type: Number,
                //default: 1,
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
            //default: '',
            enum: genderEnum
        },
        nationality: {
            type: String,
            //default: '',
            enum: countryList
        },
        ethnicity: {
            hispanic: {
                type: Boolean,
                default: false
            },
            american_indian: {
                type: Boolean,
                default: false
            },
            asian: {
                type: Boolean,
                default: false
            },
            black: {
                type: Boolean,
                default: false
            },
            pacific_islander: {
                type: Boolean,
                default: false
            },
            white: {
                type: Boolean,
                default: false
            }
        },
        email: {
            type: String,
            //default: '',
            match: emailMatch
        },
        phone: {
            personal: {
                number: {
                    type: String,
                    match: phoneMatch
                },
                call: {
                    type: String,
                    //default: ''
                },

            },
            work: {
                number: {
                    type: String,
                    match: phoneMatch
                },
                call: {
                    type: String,
                    //default: ''
                },
            },
            cell: {
                number: {
                    type: String,
                    match: phoneMatch
                },
                call: {
                    type: String,
                    //default: ''
                },
            }
        },
        address: {
            permanent: {
                street: {
                    type: String,
                    //default: '',
                    match: streetMatch
                },
                city: {
                    type: String,
                    //default: ''
                },
                state: {
                    type: String,
                    //default: '',
                    enum: stateList
                },
                country: {
                    type: String,
                    //default: '',
                    enum: countryList
                },
                zip: {
                    type: String,
                    //default: '',
                    match: zipMatch
                }
            },
            current: {
                street: {
                    type: String,
                    match: streetMatch
                },
                city: String,
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
            valid_until: Date
        },
        emergency_contact: {
            name: {
                first: {
                    type: String,
                    match: nameMatch
                },
                middle: {
                    type: String,
                    match: nameMatch
                },
                last: {
                    type: String,
                    match: nameMatch
                },
                suffix: {
                    type: String,
                    enum: suffixEnum
                },
                other_names: {
                    type: String,
                    match: nameMatch
                },
                relationship: {
                    type: String,
                    enum: relationEnum
                }
            },
            address: {
                street: {
                    type: String,
                    match: streetMatch
                },
                city: String,
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
            phone: {
                personal: {
                    number: {
                        type: String,
                        match: phoneMatch
                    },
                    us: String,
                    intl: String
                },

                work: {
                    number: {
                        type: String,
                        match: phoneMatch
                    },
                    us: String,
                    intl: String
                },

                cell: {
                    number: {
                        type: String,
                        match: phoneMatch
                    },
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
                //default: '',
                enum: scholarshipEnum
            },
            fullbright_scholar: {
                type: String,
                //default: '',
                enum: scholarshipEnum
            },
            please_identify_program: {
                type: String,
                //default: '',
                enum: identifyEnum
            },
            mcnair_scholar: {
                type: String,
                //default: '',
                enum: scholarshipEnum
            },
            mcknight_scholar: {
                type: String,
                //default: '',
                enum: scholarshipEnum
            },
            national_science_foundation_fellowship: {
                type: String,
                //default: '',
                enum: scholarshipEnum
            },
            national_institutes_of_health_fellowship: {
                type: String,
                //default: '',
                enum: scholarshipEnum
            },
            other: {
                scholarship: {
                    type: String,
                    //default: '',
                    enum: scholarshipEnum
                },
                explain: {
                    type: String,
                    //default: ''
                }
            },
            check_following: {
                assistantship: {
                    type: Boolean,
                    default: false
                },
                distance_learning: {
                    type: Boolean,
                    default: false
                },
                fellowship: {
                    type: Boolean,
                    default: false
                },
                joint_UF_degree: {
                    type: Boolean,
                    default: false
                },
                three_two_program: {
                    type: Boolean,
                    default: false
                }
            } /* check if you are the following?? */
        },
        supporting_documentation: { /* TBD upload files */
            name: String,
            file: Buffer
        }
    },
    degree_programs: {
        primary_program: {
            intended_year_and_term: {
                type: String,
                enum: termEnum
            },
            degree_goal: {
                type: String,
                enum: goalEnum
            },
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
                //default: ''
            },
            specialization: {
                type: String,
                //default: ''
            }
        },
        self_reported_gpa: {

            GPA: {

                type: Number,
                default: 0,
                min: 0,
                max: 4
            },
            A: {
                type: Number,
                default: 0
            },
            A_minus: {
                type: Number,
                default: 0
            },
            B_plus: {
                type: Number,
                default: 0
            },
            B: {
                type: Number,
                default: 0
            },
            B_minus: {
                type: Number,
                default: 0
            },
            C_plus: {
                type: Number,
                default: 0
            },
            C: {
                type: Number,
                default: 0
            },
            C_minus: {
                type: Number,
                default: 0
            },
            D_plus: {
                type: Number,
                default: 0
            },
            D: {
                type: Number,
                default: 0
            },
            D_minus: {
                type: Number,
                default: 0
            },
            F: {
                type: Number,
                default: 0
            }
        },
        test_scores: {
            gre: {
                taken: {
                    type: Boolean,
                    default: false
                },
                date: Date,
                verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                total: Number
            },

            gmat: {
                taken: {
                    type: Boolean,
                    default: false
                },
                date: Date,
                verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                integrated_reasoning: Number,
                total: Number
            },
            mat: {
                taken: {
                    type: Boolean,
                    default: false
                },
                date: Date,
                score: Number /* String? */
            },
            fe: {
                taken: {
                    type: Boolean,
                    default: false
                },
                date: Date,
                score: Number /* String? */
            },
            toefl: {
                taken: {
                    type: Boolean,
                    default: false
                },
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
                taken: {
                    type: Boolean,
                    default: false
                },
                date: Date,
                listening: Number,
                writing: Number,
                reading: Number,
                speaking: Number,
                total: Number
            },
            melab: {
                taken: {
                    type: Boolean,
                    default: false
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
            activity: {
                type: String,
                //default: ''
            },
            city: String,
            state: {
                type: String,
                enum: stateList
            },
            country: {
                type: String,
                enum: countryList
            },
            from: {
                type: String,
                enum: monthsEnum
            },
            day1: {
                type: Number,
                min: 1,
                max: 31
            },
            to: {
                type: String,
                enum: monthsEnum
            },
            day2: {
                type: Number,
                min: 1,
                max: 31
            }
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
            A: {
                type: Boolean,
                default: false
            },
            B: {
                type: Boolean,
                default: false
            },
            C: {
                type: Boolean,
                default: false
            },
            D: {
                type: Boolean,
                default: false
            },
            E: {
                type: Boolean,
                default: false
            },
            F: {
                type: Boolean,
                default: false
            },
            G: {
                type: Boolean,
                default: false
            },
            H: {
                type: Boolean,
                default: false
            },
            I: {
                type: Boolean,
                default: false
            },
            J: {
                type: Boolean,
                default: false
            },
            K: {
                type: Boolean,
                default: false
            },
            L: {
                type: Boolean,
                default: false
            },
            M: {
                type: Boolean,
                default: false
            },
            N: {
                type: Boolean,
                default: false
            },
            O: {
                type: Boolean,
                default: false
            },
            P: {
                type: Boolean,
                default: false
            },
            Q: {
                type: Boolean,
                default: false
            },
            R: {
                type: Boolean,
                default: false
            },
            S: {
                type: Boolean,
                default: false
            }
        }
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }

});

mongoose.model('Application', ApplicationSchema);

//var Application = mongoose.model('Application', ApplicationSchema);
/*
function getApplication(givenFirst, givenLast, givenUFID){
	Application.find({ first: givenFirst, last: givenLast, ufid: givenUFID }, callback);
}
*/
/*
function findApplication(givenFirst, givenLast, givenUFID){
	Application.findOne({ first: givenFirst, last: givenLast, ufid: givenUFID }, function (err, adventure) {
		if (err) return handleError(err);
		console.log('%s %s is %s.', Application.first, Application.last, Application.ufid);
	});
}
*/
//COMPLETION PERCENT UPDATER
//Only hits 94% at best because 6% reserved for transcript that
//I can't get to compare properly, percents will all changes eventually anyway
//Not even sure if I required enough/proper things, will also change eventually
ApplicationSchema.pre('save', function(next) {
    var p_i = this.personal_info;
    var eth = p_i.ethnicity;
    var e_name = p_i.emergency_contact.name;
    var perm = p_i.address.permanent;
    var curr = p_i.address.current;
    var e_addr = p_i.emergency_contact.address;
    var t_gre = this.education_and_activities.test_scores.gre;
    var t_gmat = this.education_and_activities.test_scores.gmat;
    var t_mat = this.education_and_activities.test_scores.mat;
    var t_fe = this.education_and_activities.test_scores.fe;
    var t_toefl = this.education_and_activities.test_scores.toefl;
    var t_ielts = this.education_and_activities.test_scores.ielts;
    var t_melab = this.education_and_activities.test_scores.melab;
    this.completion_percent = (((p_i.has_ssn || p_i.ssn !== undefined) ? 4 : 0) + //has_ssn = true ==> person clicked box that they DON'T HAVE SSN
        (this.first !== undefined ? 4 : 0) + //			WHAT THE HELL GUYS
        (this.last !== undefined ? 4 : 0) +
        (this.ufid !== undefined ? 4 : 0) +
        (p_i.bd.month !== undefined ? 4 : 0) +
        (p_i.bd.day !== undefined ? 4 : 0) +
        (p_i.bd.year !== undefined ? 4 : 0) +
        (p_i.gender !== undefined ? 4 : 0) +
        (p_i.nationality !== undefined ? 4 : 0) +
        (p_i.email !== undefined ? 4 : 0) +
        (e_name.first !== undefined ? 4 : 0) +
        (e_name.last !== undefined ? 4 : 0) +
        (e_name.relationship !== undefined ? 4 : 0) +
        //(this.education_and_activities.transcript 		!== null ?  6:0) +		//can't get this comparison to work quite yet
        (this.education_and_activities.u_grad_major !== undefined ? 6 : 0) +
        (this.education_and_activities.recommendation !== undefined ? 4 : 0) + //does this variable even exist? -> as "supporting documentation"
        ((eth.asian || eth.black || eth.pacific_islander || eth.american_indian || eth.hispanic || eth.white) ? 4 : 0) +
        ((p_i.phone.personal.number !== undefined || p_i.phone.work.number !== undefined || p_i.phone.cell.number !== undefined) ? 4 : 0) +
        ((curr.street !== undefined && curr.city !== undefined && curr.country !== undefined && curr.zip !== undefined) ? 4 : 0) + //zip for one of these doesn't even have an input section
        ((perm.street !== undefined && perm.city !== undefined && perm.country !== undefined && perm.zip !== undefined) ? 4 : 0) + //also not requiring .state because other countries and whatnot (maybe add a None to state dropdown?)
        ((e_addr.street !== undefined && e_addr.city !== undefined && e_addr.country !== undefined && e_addr.zip !== undefined) ? 4 : 0) +
        ((p_i.emergency_contact.phone.personal.number !== undefined || p_i.emergency_contact.phone.work.number !== undefined || p_i.emergency_contact.phone.cell.number !== undefined) ? 4 : 0) +
        (((t_gre.taken && t_gre.date !== undefined && t_gre.verbal !== undefined && t_gre.quantative !== undefined && t_gre.analytical_writing !== undefined && t_gre.total !== undefined) ||
            (t_gmat.taken && t_gmat.date !== undefined && t_gmat.verbal !== undefined && t_gmat.quantative !== undefined && t_gmat.analytical_writing !== undefined && t_gmat.integrated_reasoning !== undefined && t_gmat.total !== undefined) ||
            (t_mat.taken && t_mat.date !== undefined && t_mat.score !== undefined) ||
            (t_fe.taken && t_fe.date !== undefined && t_fe.score !== undefined) ||
            (t_toefl.taken && t_toefl.paper_date !== undefined && t_toefl.listening !== undefined && t_toefl.writing !== undefined && t_toefl.reading !== undefined && t_toefl.total !== undefined && t_toefl.internet_date !== undefined && t_toefl.readingi !== undefined && t_toefl.listeningi !== undefined && t_toefl.speakingi !== undefined && t_toefl.writingi !== undefined && t_toefl.totali !== undefined) ||
            (t_ielts.taken && t_ielts.date !== undefined && t_ielts.listening !== undefined && t_ielts.writing !== undefined && t_ielts.reading !== undefined && t_ielts.speaking !== undefined && t_ielts.total !== undefined) ||
            (t_melab.taken && t_melab.date !== undefined && t_melab.composition !== undefined && t_melab.listening !== undefined && t_melab.gcvr !== undefined && t_melab.total)) ? 8 : 0) +
        (this.education_and_activities.self_reported_gpa.GPA !== 0 ? 4 : 0));
    next();
});
