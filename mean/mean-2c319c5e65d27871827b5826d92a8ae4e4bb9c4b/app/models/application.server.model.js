'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var simpleStringValidator = function(property) {
	return property.length > 0;
};
var nameValidate = [simpleStringValidator, 'Put your name in, yo'];

var ApplicationSchema = new Schema({
	personal_info: {
		name: {
			first: {
				type: String,
				default: '',
				validate: nameValidate
			},
			middle: {
				type: String,
				default: '',
				validate: nameValidate
			},
			last: {
				type: String,
				default: '',
				validate: nameValidate
			},
			suffix: {
				type: String,
				default: '',
			},
			other_names: {
				type: String,
				default: '',
			},
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
			unique: true,//'For now, the name will uniquely id things',
			required: true//'Required'
		},
		completion_percent: {
			type: Number,
			default: 0
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
        dob: Date,		//redundant with next section?
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
    },
    //Planning on using the $set operator with db.collection.update() command for these -Josh
    completion: {
    	filled: {				//No Booleans will have an associated filled Boolean
    		f_name: Boolean,	//Some info-sets have an _ALL to simplify/speed some checks
    		m_name: Boolean,	//Some boolean-sets have an _ANY for optional-but-suggested sections
    		l_name: Boolean,
    		suffix: Boolean,
    		o_name: Boolean,
    		ssn: Boolean,
    		ufid: Boolean,
    		b_month: Boolean,
    		b_day: Boolean,
    		b_year: Boolean,
    		b_day_ALL: Boolean,
    		gender: Boolean,
    		nationality: Boolean,
    		email_addr: Boolean,
    		pers_phone: Boolean,
    		work_phone: Boolean,
    		cell_phone: Boolean,
    		phone_ANY: Boolean,
    		perm_addr_str: Boolean,
    		perm_addr_cit: Boolean,
    		perm_addr_sta: Boolean,
    		perm_addr_cnt: Boolean,
    		perm_addr_zip: Boolean,
    		perm_addr_ALL: Boolean,
    		curr_addr_str: Boolean,
    		curr_addr_cit: Boolean,
    		curr_addr_sta: Boolean,
    		curr_addr_cnt: Boolean,
    		curr_addr_zip: Boolean,
    		curr_addr_val: Boolean,
    		curr_addr_ALL: Boolean,
    		e_f_name: Boolean,
    		e_m_name: Boolean,
    		e_l_name: Boolean,
    		e_suffix: Boolean,
    		e_o_name: Boolean,
    		e_relate: Boolean,
    		e_addr_str: Boolean,
    		e_addr_cit: Boolean,
    		e_addr_sta: Boolean,
    		e_addr_cnt: Boolean,
    		e_addr_zip: Boolean,
    		e_addr_ALL: Boolean,
    		e_phone_pers: Boolean,
    		e_phone_work: Boolean,
    		e_phone_cell: Boolean,
    		e_phone_ANY: Boolean,
    		e_contact_ALL: Boolean,
    		scholar_famu: Boolean,
    		scholar_fullbright: Boolean,
    		scholar_identify: Boolean,
    		scholar_mcnair: Boolean,
    		scholar_mcknight: Boolean,
    		scholar_natl_sci: Boolean,
    		scholar_natl_hlth: Boolean,
    		scholar_other_schol: Boolean,
    		scholar_other_expln: Boolean,
    		scholar_ANY: Boolean,
    		supporting_doc: Boolean,
    		degree_prog_term: Boolean,
    		degree_prog_goal: Boolean,
    		degree_prog_study: Boolean,
    		degree_prog_special: Boolean,
    		degree_prog_contact: Boolean,
    		degree_prog_purpose: Boolean,
    		degree_prog_ALL: Boolean,
    		ugrad_major: Boolean,
    		ugrad_special: Boolean,
    		gpa_calculated: Boolean,
    		test_gre_date: Boolean,
    		test_gre_verb: Boolean,
    		test_gre_qunt: Boolean,
    		test_gre_anal: Boolean,
    		test_gre_totl: Boolean,
    		test_gre_ALL: Boolean,
    		test_gmat_date: Boolean,
    		test_gmat_verb: Boolean,
    		test_gmat_qunt: Boolean,
    		test_gmat_anal: Boolean,
    		test_gmat_reas: Boolean,
    		test_gmat_totl: Boolean,
    		test_gmat_ALL: Boolean,
    		test_mat_date: Boolean,
    		test_mat_scor: Boolean,
    		test_mat_ALL: Boolean,
    		test_fe_date: Boolean,
    		test_fe_scor: Boolean,
    		test_fe_ALL: Boolean,
    		test_toefl_pdate: Boolean,
    		test_toefl_list: Boolean,
    		test_toefl_writ: Boolean,
    		test_toefl_read: Boolean,
    		test_toefl_totl: Boolean,
    		test_toefl_idate: Boolean,
    		test_toefl_iread: Boolean,
    		test_toefl_ilist: Boolean,
    		test_toefl_ispek: Boolean,
    		test_toefl_iwrit: Boolean,
    		test_toefl_itotl: Boolean,
    		test_toefl_ALL: Boolean,
    		test_ielts_date: Boolean,
    		test_ielts_list: Boolean,
    		test_ielts_writ: Boolean,
    		test_ielts_read: Boolean,
    		test_ielts_spek: Boolean,
    		test_ielts_totl: Boolean,
    		test_ielts_ALL: Boolean,
    		test_melab_date: Boolean,
    		test_melab_comp: Boolean,
    		test_melab_list: Boolean,
    		test_melab_gcvr: Boolean,
    		test_melab_totl: Boolean,
    		test_melab_ALL: Boolean,
    		active_type: Boolean,
    		active_city: Boolean,
    		active_stat: Boolean,
    		active_ctry: Boolean,
    		active_from: Boolean,
    		active_day1: Boolean,
    		active_to: Boolean,
    		active_day2: Boolean,
    		active_ALL: Boolean,
    		sub_resume: Boolean,
    		sub_trnscr: Boolean,
    		resident_aff_ANY: Boolean
    	},
    	complete: {		//for percentage completion, favor _ALL over individuals
    		f_name: Boolean,		//anything with CHECK is used in percentage completion
    		m_name: Boolean,		//some bools exist only in filled{} like residency, as it is always "complete"
    		l_name: Boolean,
    		suffix: Boolean,
    		o_name: Boolean,
    		name_req: Boolean,				//CHECK
    		ssn: Boolean,
    		ufid: Boolean,					//OPTIONAL CHECK
    		b_month: Boolean,
    		b_day: Boolean,
    		b_year: Boolean,
    		b_day_ALL: Boolean,				//CHECK
    		gender: Boolean,				//CHECK
    		nationality: Boolean,			//CHECK
    		email_addr: Boolean,			//CHECK
    		pers_phone: Boolean,
    		work_phone: Boolean,
    		cell_phone: Boolean,
    		phone_ANY: Boolean,				//CHECK
    		perm_addr_str: Boolean,
    		perm_addr_cit: Boolean,
    		perm_addr_sta: Boolean,
    		perm_addr_cnt: Boolean,
    		perm_addr_zip: Boolean,
    		perm_addr_ALL: Boolean,			//CHECK
    		curr_addr_str: Boolean,
    		curr_addr_cit: Boolean,
    		curr_addr_sta: Boolean,
    		curr_addr_cnt: Boolean,
    		curr_addr_zip: Boolean,
    		curr_addr_val: Boolean,
    		curr_addr_ALL: Boolean,			//CHECK
    		e_f_name: Boolean,
    		e_m_name: Boolean,
    		e_l_name: Boolean,
    		e_suffix: Boolean,
    		e_o_name: Boolean,
    		e_relate: Boolean,
    		e_name_req: Boolean,			//CHECK
    		e_addr_str: Boolean,
    		e_addr_cit: Boolean,
    		e_addr_sta: Boolean,
    		e_addr_cnt: Boolean,
    		e_addr_zip: Boolean,
    		e_addr_ALL: Boolean,			//CHECK
    		e_phone_pers: Boolean,
    		e_phone_work: Boolean,
    		e_phone_cell: Boolean,
    		e_phone_ANY: Boolean,			//CHECK
    		e_contact_ALL: Boolean,
    		scholar_famu: Boolean,
    		scholar_fullbright: Boolean,
    		scholar_identify: Boolean,
    		scholar_mcnair: Boolean,
    		scholar_mcknight: Boolean,
    		scholar_natl_sci: Boolean,
    		scholar_natl_hlth: Boolean,
    		scholar_other_schol: Boolean,
    		scholar_other_expln: Boolean,
    		scholar_ANY: Boolean,			//OPTIONAL CHECK
    		supporting_doc: Boolean,
    		degree_prog_term: Boolean,
    		degree_prog_goal: Boolean,
    		degree_prog_study: Boolean,
    		degree_prog_special: Boolean,
    		degree_prog_contact: Boolean,
    		degree_prog_purpose: Boolean,
    		degree_prog_ALL: Boolean,		//CHECK
    		ugrad_major: Boolean,			//CHECK
    		ugrad_special: Boolean,
    		gpa_calculated: Boolean,		//CHECK
    		test_gre_date: Boolean,
    		test_gre_verb: Boolean,
    		test_gre_qunt: Boolean,
    		test_gre_anal: Boolean,
    		test_gre_totl: Boolean,
    		test_gre_ALL: Boolean,			//OPTIONAL CHECK
    		test_gmat_date: Boolean,
    		test_gmat_verb: Boolean,
    		test_gmat_qunt: Boolean,
    		test_gmat_anal: Boolean,
    		test_gmat_reas: Boolean,
    		test_gmat_totl: Boolean,
    		test_gmat_ALL: Boolean,			//OPTIONAL CHECK
    		test_mat_date: Boolean,
    		test_mat_scor: Boolean,
    		test_mat_ALL: Boolean,			//OPTIONAL CHECK
    		test_fe_date: Boolean,
    		test_fe_scor: Boolean,
    		test_fe_ALL: Boolean,			//OPTIONAL CHECK
    		test_toefl_pdate: Boolean,
    		test_toefl_list: Boolean,
    		test_toefl_writ: Boolean,
    		test_toefl_read: Boolean,
    		test_toefl_totl: Boolean,
    		test_toefl_idate: Boolean,
    		test_toefl_iread: Boolean,
    		test_toefl_ilist: Boolean,
    		test_toefl_ispek: Boolean,
    		test_toefl_iwrit: Boolean,
    		test_toefl_itotl: Boolean,
    		test_toefl_ALL: Boolean,		//OPTIONAL CHECK
    		test_ielts_date: Boolean,
    		test_ielts_list: Boolean,
    		test_ielts_writ: Boolean,
    		test_ielts_read: Boolean,
    		test_ielts_spek: Boolean,
    		test_ielts_totl: Boolean,
    		test_ielts_ALL: Boolean,		//OPTIONAL CHECK
    		test_melab_date: Boolean,
    		test_melab_comp: Boolean,
    		test_melab_list: Boolean,
    		test_melab_gcvr: Boolean,
    		test_melab_totl: Boolean,
    		test_melab_ALL: Boolean,		//OPTIONAL CHECK
    		active_type: Boolean,
    		active_city: Boolean,
    		active_stat: Boolean,
    		active_ctry: Boolean,
    		active_from: Boolean,
    		active_day1: Boolean,
    		active_to: Boolean,
    		active_day2: Boolean,
    		active_ALL: Boolean,			//OPTIONAL CHECK
    		sub_resume: Boolean,			//CHECK
    		sub_trnscr: Boolean,			//CHECK
    	}
    }
});

mongoose.model('Application', ApplicationSchema);