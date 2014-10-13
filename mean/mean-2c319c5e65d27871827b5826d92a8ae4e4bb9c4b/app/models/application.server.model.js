'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    personal_info: {
        name: {
            first: {
				type: String,
				default: ''
			},
            middle: {
				type: String,
				default: ''
			},
            last: {
				type: String,
				default: ''
			},
            suffix: {
				type: String,
				default: ''
			},
            other_names: {
				type: String,
				default: ''
			}
        },
		has_ssn: {
			type: Boolean,
			default: false
		},
        ssn: {
			type: Number
		},
        ufid: {
			type: Number,
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
				default: ''
			},
			day: {
				type: String,
				default: ''
			},
			year: {
				type: Number
			},
		},
        gender: {
			type: String,
			default: ''
		},
        nationality: {
			type: String,
			default: ''
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
			default: ''
		},
        phone: {
            personal: {
                number: {
					type: Number
				},
                call: {
					type: String,
					default: ''
				},
			
            },
            work: {
                number: {
					type: Number,
				},
                call: {
					type: String,
					default: ''
				},
            },
            cell: {
                number: {
					type: Number
				},
                call: {
					type: String,
					default: ''
				},
            }
        },
        address: {
            permanent: {
				street: {
					type: String,
					default: ''
				},
				city: {
					type: String,
					default: ''
				},
				state: {
					type: String,
					default: ''
				},
				country: {
					type: String,
					default: ''
				}
			},
            current: {
				street: String,
				city: String,
				state: String,
				country: String,
				zip: String
			},
            valid_until: Date
        },
        emergency_contact: {
            name: {
                first: String,
                middle: String,
                last: String,
                suffix: String,
                other_names: String,
                relationship: String
            },
            address: {
				street: String,
				city: String,
				state: String,
				country: String,
				zip: String
            },
            phone: {
                personal: {
                    number: Number,
                    us: String,
                    intl: String
					},
					
                work: {
                    number: Number,
                    us: String,
                    intl: String
					},

                cell: {
                    number: Number,
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
				default: ''
			},
            fullbright_scholar: {
				type: String,
				default: ''
			},
			please_identify_program: {
				type: String,
				default: ''
			},
            mcnair_scholar: {
				type: String,
				default: ''
			},
            mcknight_scholar: {
				type: String,
				default: ''
			},
            national_science_foundation_fellowship: {
				type: String,
				default: ''
			},
            national_institutes_of_health_fellowship: {
				type: String,
				default: ''
			},
            other: {
				scholarship: {
					type: String,
					default: ''
				},
				explain: {
					type: String,
					default: ''
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
			}/* check if you are the following?? */
        },
        supporting_documentation: { /* TBD upload files */ 
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
            major: {
				type: String,
				default: ''
			},
            specialization: {
				type: String,
				default: ''
			}
        },
        self_reported_gpa: {

        	GPA: {

        		type: Number,
        		default: 0
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
            		type:Boolean,
                	default: false
            	},
            	date:Date,
            	verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                total: Number
            },
           
            gmat: {
            	taken: {
            		type:Boolean,
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
            		type:Boolean,
                	default: false
            	},
                date: Date,
                score: Number /* String? */
            },
            fe: {
            	taken: {
            		type:Boolean,
                	default: false
            	},
                date: Date,
                score: Number /* String? */
            },
            toefl: {
            	taken: {
            		type:Boolean,
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
            		type:Boolean,
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
            		type:Boolean,
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
				default: ''
			},
            city: String,
            country: String,
            state: String,
            from: String,
            day1: String,
            to: String,
            day2: String
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
