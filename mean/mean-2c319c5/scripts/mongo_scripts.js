// Copy to ~/.mongorc.js to use it always, or load it from the Mongo prompt
//
// Based on example from: http://docs.mongodb.org/manual/tutorial/generate-test-data/
function randBool() {
  return 0 == (Math.ceil(Math.random() * 10) % 2);
}

function insertApplications(dbName, colName, num) {

  var col = db.getSiblingDB(dbName).getCollection(colName);

  for (i = 0; i < num; i++) {
    col.insert({
      personal_info: {
        name: {
          first: "Green" + i,
          middle: "Giant" + i,
          last: "Man" + i,
          suffix: "Sr." + i,
          other_names: "Master Commander " + i
        },
        has_ssn: true,
        ssn: 123456 + i,
        ufid: i,
        completion_percent: (Math.random() * 1000) % 101,
        previous_application: randBool(),
        previous_attendance: randBool(),
        application_started: randBool(),
        application_complete: randBool(),
        dob: Date(100000 * Math.random()),
        // Omitted bd since it is redundant
        gender: "foo" + i,
        nationality: "Human" + i,
        ethnicity: {
          hispanic: randBool(),
          american_indian: randBool(),
          asian: randBool(),
          black: randBool(),
          pacific_islander: randBool(),
          white: randBool()
        },
        email: "yomamma" + i + "@mom.com",
        phone: {
          personal: {
            number: Math.random() * 1000000000,
            call: "idk" + i
          },
          work: {
            number: Math.random() * 1000000000,
            call: "idk werk" + i
          },
          cell: {
            number: Math.random() * 1000000000,
            call: "idk man" + i
          }
        },
        address: {
          permanent: {
            street: i + "SW Rekt Lane",
            city: "Hurtsville",
            state: "AN",
            country: "Mother Russia"
          },
          current: {
            street: i + 1 + "SW Rekt Lane",
            city: "Hurtsville",
            state: "AN",
            country: "Mother Russia"
          },
          valid_until: Date(100000 * Math.random()),
        },
        emergency_contact: {
          name: {
            first: "Your",
            middle: "Fookin",
            last: "Mem",
            suffix: "M8",
            other_names: "M80",
            relationship: "gr8"
          },
          address: {
            street: i + 1 + "SW Rekt Lane",
            city: "Hurtsville",
            state: "AN",
            country: "Mother Russia"
          },
          phone: {
            personal: {
              number: Math.random() * 1000000000,
              call: "idk" + i
            },
            work: {
              number: Math.random() * 1000000000,
              call: "idk werk" + i
            },
            cell: {
              number: Math.random() * 1000000000,
              call: "idk man" + i
            }
          }
        },
        veteran_status: {
          active_veteran: randBool(),
          post_sep11: randBool(),
          eligible_va_benefits: randBool()
        },
        conduct_disclosure: {
          charged_or_disciplined: randBool(),
          charged_law_violation: randBool()
        }
      },
      special_programs_info: {
        special_programs_application: {
          famu_feeder: "Maybe",
          fullbright_scholar: "I guess",
          please_identify_program: "This is well mannered for a schema",
          mcnair_scholar: "Nope",
          mcknight_scholar: "Probably",
          national_science_foundation_fellowship: "Nah",
          national_institute_of_health_fellowship: "Wow",
          other: {
            scholarship: "Lots",
            explain: "I got around"
          },
          check_following: {
            assistantship: randBool(),
            distance_learning: randBool(),
            fellowship: randBool(),
            joint_UF_degree: randBool(),
            three_two_program: randBool()
          },
        },
        supporting_documentation: "Somebody removed what I had for this in the schema...."
      },
      degree_programs: {
        primary_program: {
          intended_year_and_term: "Why is this a string...",
          degree_goal: "To get laid",
          program_of_study: "Ergonomics",
          program_specialization: "Keyboards",
          department_contact: "People" + i
        },
        statement_of_purpose: "I like the monies"
      },
      education_and_activities: {
        undergraduate: {
          major: "Economics",
          specialization: "Money"
        },
        self_reported_gpa: {
          GPA: 10 * Math.random()
          // I am omitting the list of letter grades, since it seems to have no meaning
        },
        test_scores: {
          gre: {
            taken: randBool(),
            date: Date(Math.random() * 1000000),
            verbal: Math.random() * 1000,
            quantitative: Math.random() * 1000,
            analytical_writing: Math.random() * 1000,
            total: Math.random() * 10000
          },
          gmat: {
            taken: randBool(),
            date: Date(Math.random() * 1000000),
            verbal: Math.random() * 1000,
            quantitative: Math.random() * 1000,
            analytical_writing: Math.random() * 1000,
            integrated_reasoning: Math.random() * 1000,
            total: Math.random() * 10000
          },
          mat: {
            taken: randBool(),
            date: Date(Math.random() * 1000000),
            score: Math.random() * 10000
          },
          fe: {
            taken: randBool(),
            date: Date(Math.random() * 1000000),
            score: Math.random() * 10000
          },
          toefl: {
            taken: randBool(),
            paper_date: Date(Math.random() * 1000000),
            listening: Math.random() * 1000,
            writing: Math.random() * 1000,
            reading: Math.random() * 1000,
            total: Math.random() * 10000,
            internet_date: Date(Math.random() * 1000000),
            reading1: Math.random() * 1000,
            listening1: Math.random() * 1000,
            speaking1: Math.random() * 1000,
            writing1: Math.random() * 1000,
            total: Math.random() * 10000
          },
          ielts: {
            taken: randBool(),
            date: Date(Math.random() * 10000000),
            listening: Math.random() * 1000,
            writing: Math.random() * 1000,
            reading: Math.random() * 1000,
            speaking: Math.random() * 10000,
            total: Math.random() * 10000
          },
          melab: {
            taken: randBool(),
            date: Date(Math.random() * 10000000),
            composition: Math.random() * 1000,
            listening: Math.random() * 1000,
            gcvr: Math.random() * 1000,
            total: Math.random() * 10000,
          },
          uf_lang_institute_program: randBool()
        },
        activities: {
          activity: "Wanking",
          city: "Holy",
          country: "moley",
          state: "Central",
          from: "What is this",
          day1: "Should this be a date?",
          to: "What is this",
          day2: "Should this be a date?"
        },
        resume: {
          name: "Resume" + i
          // no file
        },
        transcript: {
          name: "Transcript" + i
          // no file
        }
      },
      residency_affadivit: {
        florida_residence_categories: {
          A: randBool(),
          B: randBool(),
          C: randBool(),
          D: randBool(),
          E: randBool(),
          F: randBool(),
          G: randBool(),
          H: randBool(),
          I: randBool(),
          J: randBool(),
          K: randBool(),
          L: randBool(),
          M: randBool(),
          N: randBool(),
          O: randBool(),
          P: randBool(),
          Q: randBool(),
          R: randBool(),
          S: randBool()
        }
      },
      created: Date(),
      //user: 
      completion: {
        filled: {
          f_name: randBool(),
          f_name: randBool(),        //Some info-sets have an _ALL to simplify/speed some checks
          m_name: randBool(),        //Some boolean-sets have an _ANY for optional-but-suggested sections
          l_name: randBool(),
          suffix: randBool(),
          o_name: randBool(),
          ssn: randBool(),
          ufid: randBool(),
          b_month: randBool(),
          b_day: randBool(),
          b_year: randBool(),
          b_day_ALL: randBool(),
          gender: randBool(),
          nationality: randBool(),
          email_addr: randBool(),
          pers_phone: randBool(),
          work_phone: randBool(),
          cell_phone: randBool(),
          phone_ANY: randBool(),
          perm_addr_str: randBool(),
          perm_addr_cit: randBool(),
          perm_addr_sta: randBool(),
          perm_addr_cnt: randBool(),
          perm_addr_zip: randBool(),
          perm_addr_ALL: randBool(),
          curr_addr_str: randBool(),
          curr_addr_cit: randBool(),
          curr_addr_sta: randBool(),
          curr_addr_cnt: randBool(),
          curr_addr_zip: randBool(),
          curr_addr_val: randBool(),
          curr_addr_ALL: randBool(),
          e_f_name: randBool(),
          e_m_name: randBool(),
          e_l_name: randBool(),
          e_suffix: randBool(),
          e_o_name: randBool(),
          e_relate: randBool(),
          e_addr_str: randBool(),
          e_addr_cit: randBool(),
          e_addr_sta: randBool(),
          e_addr_cnt: randBool(),
          e_addr_zip: randBool(),
          e_addr_ALL: randBool(),
          e_phone_pers: randBool(),
          e_phone_work: randBool(),
          e_phone_cell: randBool(),
          e_phone_ANY: randBool(),
          e_contact_ALL: randBool(),
          scholar_famu: randBool(),
          scholar_fullbright: randBool(),
          scholar_identify: randBool(),
          scholar_mcnair: randBool(),
          scholar_mcknight: randBool(),
          scholar_natl_sci: randBool(),
          scholar_natl_hlth: randBool(),
          scholar_other_schol: randBool(),
          scholar_other_expln: randBool(),
          scholar_ANY: randBool(),
          supporting_doc: randBool(),
          degree_prog_term: randBool(),
          degree_prog_goal: randBool(),
          degree_prog_study: randBool(),
          degree_prog_special: randBool(),
          degree_prog_contact: randBool(),
          degree_prog_purpose: randBool(),
          degree_prog_ALL: randBool(),
          ugrad_major: randBool(),
          ugrad_special: randBool(),
          gpa_calculated: randBool(),
          test_gre_date: randBool(),
          test_gre_verb: randBool(),
          test_gre_qunt: randBool(),
          test_gre_anal: randBool(),
          test_gre_totl: randBool(),
          test_gre_ALL: randBool(),
          test_gmat_date: randBool(),
          test_gmat_date: randBool(),
          test_gmat_verb: randBool(),
          test_gmat_qunt: randBool(),
          test_gmat_anal: randBool(),
          test_gmat_reas: randBool(),
          test_gmat_totl: randBool(),
          test_gmat_ALL: randBool(),
          test_mat_date: randBool(),
          test_mat_scor: randBool(),
          test_mat_ALL: randBool(),
          test_fe_date: randBool(),
          test_fe_scor: randBool(),
          test_fe_ALL: randBool(),
          test_toefl_pdate: randBool(),
          test_toefl_list: randBool(),
          test_toefl_writ: randBool(),
          test_toefl_read: randBool(),
          test_toefl_totl: randBool(),
          test_toefl_idate: randBool(),
          test_toefl_iread: randBool(),
          test_toefl_ilist: randBool(),
          test_toefl_ispek: randBool(),
          test_toefl_iwrit: randBool(),
          test_toefl_itotl: randBool(),
          test_toefl_ALL: randBool(),
          test_ielts_date: randBool(),
          test_ielts_list: randBool(),
          test_ielts_writ: randBool(),
          test_ielts_read: randBool(),
          test_ielts_spek: randBool(),
          test_ielts_totl: randBool(),
          test_ielts_ALL: randBool(),
          test_melab_date: randBool(),
          test_melab_comp: randBool(),
          test_melab_list: randBool(),
          test_melab_gcvr: randBool(),
          test_melab_totl: randBool(),
          test_melab_ALL: randBool(),
          active_type: randBool(),
          active_city: randBool(),
          active_stat: randBool(),
          active_ctry: randBool(),
          active_from: randBool(),
          active_day1: randBool(),
          active_to: randBool(),
          active_day2: randBool(),
          active_ALL: randBool(),
          sub_resume: randBool(),
          sub_trnscr: randBool(),
          resident_aff_ANY: randBool()
        },
        complete: {
          f_name: randBool(),    //anything with CHECK is used in percentage completion
          m_name: randBool(),    //some bools exist only in filled{} like residency, as it is always "complete"
          l_name: randBool(),
          suffix: randBool(),
          o_name: randBool(),
          name_req: randBool(),        //CHECK
          ssn: randBool(),
          ufid: randBool(),          //OPTIONAL CHECK
          b_month: randBool(),
          b_day: randBool(),
          b_year: randBool(),
          b_day_ALL: randBool(),       //CHECK
          gender: randBool(),        //CHECK
          nationality: randBool(),     //CHECK
          email_addr: randBool(),      //CHECK
          pers_phone: randBool(),
          work_phone: randBool(),
          cell_phone: randBool(),
          phone_ANY: randBool(),       //CHECK
          perm_addr_str: randBool(),
          perm_addr_cit: randBool(),
          perm_addr_sta: randBool(),
          perm_addr_cnt: randBool(),
          perm_addr_zip: randBool(),
          perm_addr_ALL: randBool(),     //CHECK
          curr_addr_str: randBool(),
          curr_addr_cit: randBool(),
          curr_addr_sta: randBool(),
          curr_addr_cnt: randBool(),
          curr_addr_zip: randBool(),
          curr_addr_val: randBool(),
          curr_addr_ALL: randBool(),     //CHECK
          e_f_name: randBool(),
          e_m_name: randBool(),
          e_l_name: randBool(),
          e_suffix: randBool(),
          e_o_name: randBool(),
          e_relate: randBool(),
          e_name_req: randBool(),      //CHECK
          e_addr_str: randBool(),
          e_addr_cit: randBool(),
          e_addr_sta: randBool(),
          e_addr_cnt: randBool(),
          e_addr_zip: randBool(),
          e_addr_ALL: randBool(),      //CHECK
          e_phone_pers: randBool(),
          e_phone_work: randBool(),
          e_phone_cell: randBool(),
          e_phone_ANY: randBool(),     //CHECK
          e_contact_ALL: randBool(),
          scholar_famu: randBool(),
          scholar_fullbright: randBool(),
          scholar_identify: randBool(),
          scholar_mcnair: randBool(),
          scholar_mcknight: randBool(),
          scholar_natl_sci: randBool(),
          scholar_natl_hlth: randBool(),
          scholar_other_schol: randBool(),
          scholar_other_expln: randBool(),
          scholar_ANY: randBool(),     //OPTIONAL CHECK
          supporting_doc: randBool(),
          degree_prog_term: randBool(),
          degree_prog_goal: randBool(),
          degree_prog_study: randBool(),
          degree_prog_special: randBool(),
          degree_prog_contact: randBool(),
          degree_prog_purpose: randBool(),
          degree_prog_ALL: randBool(),   //CHECK
          ugrad_major: randBool(),     //CHECK
          ugrad_special: randBool(),
          gpa_calculated: randBool(),    //CHECK
          test_gre_date: randBool(),
          test_gre_verb: randBool(),
          test_gre_qunt: randBool(),
          test_gre_anal: randBool(),
          test_gre_totl: randBool(),
          test_gre_ALL: randBool(),      //OPTIONAL CHECK
          test_gmat_date: randBool(),
          test_gmat_verb: randBool(),
          test_gmat_qunt: randBool(),
          test_gmat_anal: randBool(),
          test_gmat_reas: randBool(),
          test_gmat_totl: randBool(),
          test_gmat_ALL: randBool(),     //OPTIONAL CHECK
          test_mat_date: randBool(),
          test_mat_scor: randBool(),
          test_mat_ALL: randBool(),      //OPTIONAL CHECK
          test_fe_date: randBool(),
          test_fe_scor: randBool(),
          test_fe_ALL: randBool(),     //OPTIONAL CHECK
          test_toefl_pdate: randBool(),
          test_toefl_list: randBool(),
          test_toefl_writ: randBool(),
          test_toefl_read: randBool(),
          test_toefl_totl: randBool(),
          test_toefl_idate: randBool(),
          test_toefl_iread: randBool(),
          test_toefl_ilist: randBool(),
          test_toefl_ispek: randBool(),
          test_toefl_iwrit: randBool(),
          test_toefl_itotl: randBool(),
          test_toefl_ALL: randBool(),    //OPTIONAL CHECK
          test_ielts_date: randBool(),
          test_ielts_list: randBool(),
          test_ielts_writ: randBool(),
          test_ielts_read: randBool(),
          test_ielts_spek: randBool(),
          test_ielts_totl: randBool(),
          test_ielts_ALL: randBool(),    //OPTIONAL CHECK
          test_melab_date: randBool(),
          test_melab_comp: randBool(),
          test_melab_list: randBool(),
          test_melab_gcvr: randBool(),
          test_melab_totl: randBool(),
          test_melab_ALL: randBool(),    //OPTIONAL CHECK
          active_type: randBool(),
          active_city: randBool(),
          active_stat: randBool(),
          active_ctry: randBool(),
          active_from: randBool(),
          active_day1: randBool(),
          active_to: randBool(),
          active_day2: randBool(),
          active_ALL: randBool(),      //OPTIONAL CHECK
          sub_resume: randBool(),      //CHECK
          sub_trnscr: randBool()      //CHECK
        }
      }
    });
    //print(col.count());
  }
}

