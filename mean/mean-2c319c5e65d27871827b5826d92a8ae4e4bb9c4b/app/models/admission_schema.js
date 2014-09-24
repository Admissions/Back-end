'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdmissionsSchema = new Schema({
    personal_info: {
        name: {
            first: String,
            middle: String,
            last: String,
            suffix: String,
            other_names: String
        },
        ssn: Number,
        ufid: Number,
        previous_application: Boolean,
        previous_attendance: Boolean,
        dob: Date,
        gender: String,
        nationality: String,
        ethnicity: {
            hispanic: Boolean,
            ethnicity: Number
        },
        email: String,
        phone: {
            personal: {
                number: Number,
                us: Boolean
            },
            work: {
                number: Number,
                us: Boolean
            },
            cell: {
                number: Number,
                us: Boolean
            }
        },
        address: {
            permanent: [ String ],
            current: [ String ],
            valid_until: Date
        },
        emergency_contact: {
            name: {
                first: String,
                middle: String,
                last: String,
                suffix: String,
                other_names: String
            },
            relationship: String,
            address: [ String ],
            phone: {
                personal: {
                    number: Number,
                    us: Boolean
                },
                work: {
                    number: Number,
                    us: Boolean
                },
                cell: {
                    number: Number,
                    us: Boolean
                }
            }
        },
        veteran_status: {
            active_veteran_no: Number,
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
            famu_feeder: Boolean,
            fullbright_scholar: Boolean,
            mcnair_scholar: Boolean,
            mcknight_scholar: Boolean,
            national_science_foundation_fellowship: Boolean,
            national_institutes_of_health_fellowship: Boolean,
            other: String
            /* check if you are the following?? */
        },
        supporting_documentation: {
            name: String,
            file: Buffer
        }
    },
    degree_programs: {
        primary_program: {
            intended_year_and_term: String,
            degree_goal: String,
            program_of_study: String,
            program_specialization: String,
            department_contact: String
        },
        statement_of_purpose: String
    },
    education_and_activities: {
        undergraduate: {
            major: String,
            specialization: String
        },
        colleges: [ String ],
        self_reported_gpa: Number,
        test_scores: {
            gre: {
                date: Date,
                verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                total: Number
            },
            gmat: {
                date: Date,
                verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                integrated_reasoning: Number,
                total: Number
            },
            mat: {
                date: Date,
                score: String /* String? */
            },
            fe: {
                date: Date,
                score: String /* String? */
            },
            toefl: {
                paper_date: Date,
                listening: Number,
                writing: Number,
                reading: Number,
                total: Number,
                internet_date: Date,
                reading: Number,
                listening: Number,
                speaking: Number,
                writing: Number,
                total: Number
            },
            ielts: {
                date: Date,
                listening: Number,
                writing: Number,
                reading: Number,
                speaking: Number,
                total: Number
            },
            melab: {
                date: Date,
                composition: Number,
                listening: Number,
                gcvr: Number,
                total: Number
            },
            uf_lang_institute_program: Boolean
        },
        activities: [ {
            activity: String,
            city: String,
            country: String,
            state: String,
            from: String
        } ],
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
            /* fields not defined yet */
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

mongoose.model('Admissions', AdmissionsSchema);
