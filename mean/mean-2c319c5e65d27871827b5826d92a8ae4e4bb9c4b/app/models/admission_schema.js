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
        previous_attendance: Boolean
        dob: {
            month: Number,
            day: Number,
            year: Number
        },
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
            permanent: [ String, String, String ],
            current: [ String, String, String ]
        },
        /* ... */
    },
    special_programs_application: {
        famu_feeder: Boolean,
        fullbright_scholar: Boolean,
        /* ... */
    },
    degree_programs: {
        primary_program: {
            /* ... */
        },
        statement_of_purpose: String
    },
    education_and_activities: {
        /* ... */
    },
    residency_affadivit: {
        /* ... */
    }
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
