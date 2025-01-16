export const analyzeText = (text) => {
  let result = {
    //------------------------------------------------------------------------
    // 아동 정보
    info: {
      name: "",
      gender: "",
      examdate: "",
      birthday: "",
      examiner: "",
      school: "",
      grade: "",
      region: "",
      institution: "",
      age_years: 2,
      age_months: 0,
      utteranceType: "",
    },

    mlu_w: [0, 0, 0, 0], // MLU_w = (낱말빈도수 / 총발화수)
    mlu_m: [0, 0, 0, 0], // MLU_m = (낱말빈도수 + 문법형태소빈도수 / 총발화수)
    num_gram_types: [0, 0, 0, 0], // 문법형태소 유형 수
    num_gram_tokens: [0, 0, 0, 0], // 문법형태소 빈도 수
    num_morp_types: [0, 0, 0, 0],
    num_morp_tokens: [0, 0, 0, 0],
    ratio_gram: [0, 0, 0, 0],
    ratio_morp: [0, 0, 0, 0],
    num_word_types: [0, 0, 0, 0],
    num_word_tokens: [0, 0, 0, 0],
    ratio_word: [0, 0, 0, 0],

    //------------------------------------------------------------------------
    // 이해가능도별 분석
    num_line_total: [0, 0, 0, 0],
    num_line_unknown: [0, 0, 0, 0],
    num_line_partial: [0, 0, 0, 0],
    num_line_known: [0, 0, 0, 0],

    //------------------------------------------------------------------------
    // 이해가능 발화 유형 분석
    num_line_end_period: [0, 0, 0, 0],
    num_line_end_question: [0, 0, 0, 0],
    num_line_end_exclamation: [0, 0, 0, 0],
    num_line_end_bracket: [0, 0, 0, 0],
    num_line_end_exponential: [0, 0, 0, 0],

    statements: [[], [], []],
    statements_understand: [[], [], []],
    word_count: [[], [], []],

    wordlist: {},
    wordlist_count: {},

    grams_order_max: 0,
    grams_order: [[], [], []],
    grams_order_count: [[], [], []],

    tags: [],
    lineByTag: {},
    extras: {},

    mlu_w_pos: 0.0,
    mlu_m_pos: 0.0,
    num_gram_types_pos: 0.0,
    num_gram_tokens_pos: 0.0,
    num_morp_types_pos: 0.0,
    num_morp_tokens_pos: 0.0,
    ratio_gram_pos: 0.0,
    ratio_morp_pos: 0.0,
    num_word_types_pos: 0.0,
    num_word_tokens_pos: 0.0,
    ratio_word_pos: 0.0,

    features_td: [],
    features_ssd: [],

    //------------------------------------------------------------------------
    // 유형, 빈도, 비율
    num_word_tokens_full: [0, 0, 0, 0],
    num_gram_tokens_full: [0, 0, 0, 0],

    //------------------------------------------------------------------------
    // 글로벌 변수
    words_max: 0,
    total_par_word_count: 0,

    criteria: {
      자발화: {
        mlu_w_mean: { 2: 2.0, 3: 2.75, 4: 2.87, 5: 3.55, 6: 4.86 },
        mlu_w_sd: { 2: 0.54, 3: 0.47, 4: 0.64, 5: 1.18, 6: 1.91 },
        mlu_m_mean: { 2: 3.08, 3: 3.99, 4: 4.48, 5: 5.66, 6: 8.11 },
        mlu_m_sd: { 2: 0.96, 3: 0.84, 4: 1.3, 5: 2.22, 6: 3.31 },
        num_gram_types_mean: {
          2: 20.92,
          3: 25.77,
          4: 30.12,
          5: 36.03,
          6: 37.79,
        },
        num_gram_types_sd: { 2: 8.0, 3: 7.08, 4: 8.56, 5: 11.77, 6: 11.2 },
        num_gram_tokens_mean: {
          2: 53.78,
          3: 62.18,
          4: 80.44,
          5: 105.77,
          6: 161.89,
        },
        num_gram_tokens_sd: { 2: 22.6, 3: 22.88, 4: 34.72, 5: 54.3, 6: 71.11 },
        num_morp_types_mean: {
          2: 73.05,
          3: 105.41,
          4: 115.47,
          5: 140.06,
          6: 167.21,
        },
        num_morp_types_sd: { 2: 19.9, 3: 18.97, 4: 20.45, 5: 38.43, 6: 49.45 },
        num_morp_tokens_mean: {
          2: 154.57,
          3: 199.55,
          4: 223.94,
          5: 284.26,
          6: 404.68,
        },
        num_morp_tokens_sd: {
          2: 48.4,
          3: 41.84,
          4: 64.92,
          5: 112.91,
          6: 164.63,
        },
        ratio_gram_mean: { 2: 0.42, 3: 0.43, 4: 0.41, 5: 0.38, 6: 0.25 },
        ratio_gram_sd: { 2: 0.14, 3: 0.09, 4: 0.11, 5: 0.09, 6: 0.06 },
        ratio_morp_mean: { 2: 0.48, 3: 0.54, 4: 0.54, 5: 0.52, 6: 0.44 },
        ratio_morp_sd: { 2: 0.08, 3: 0.08, 4: 0.09, 5: 0.09, 6: 0.07 },
        num_word_types_mean: {
          2: 52.14,
          3: 79.64,
          4: 85.35,
          5: 104.03,
          6: 129.42,
        },
        num_word_types_sd: { 2: 12.82, 3: 14.88, 4: 15.19, 5: 28.23, 6: 39.51 },
        num_word_tokens_mean: {
          2: 100.78,
          3: 137.36,
          4: 143.5,
          5: 178.2,
          6: 242.79,
        },
        num_word_tokens_sd: { 2: 29.19, 3: 23.6, 4: 32.04, 5: 61.01, 6: 95.06 },
        ratio_word_mean: { 2: 0.53, 3: 0.58, 4: 0.61, 5: 0.6, 6: 0.56 },
        ratio_word_sd: { 2: 0.07, 3: 0.08, 4: 0.09, 5: 0.09, 6: 0.08 },
      },
      "이야기(회상산출)": {
        mlu_w_mean: { 4: 4.5, 5: 4.79, 6: 5.04 },
        mlu_w_sd: { 4: 1.48, 5: 0.96, 6: 1.14 },
        mlu_m_mean: { 4: 7.71, 5: 8.82, 6: 9.85 },
        mlu_m_sd: { 4: 2.71, 5: 1.88, 6: 2.03 },
        num_gram_types_mean: { 4: 14.14, 5: 16.58, 6: 19.05 },
        num_gram_types_sd: { 4: 3.86, 5: 4.19, 6: 5.19 },
        num_gram_tokens_mean: { 4: 33.29, 5: 40.74, 6: 51.11 },
        num_gram_tokens_sd: { 4: 11.3, 5: 15.1, 6: 20.99 },
        num_morp_types_mean: { 4: 49.43, 5: 50.58, 6: 53.42 },
        num_morp_types_sd: { 4: 8.96, 5: 8.17, 6: 16.78 },
        num_morp_tokens_mean: { 4: 81.07, 5: 88.84, 6: 107.05 },
        num_morp_tokens_sd: { 4: 20.2, 5: 24.22, 6: 40.62 },
        ratio_gram_mean: { 4: 0.44, 5: 0.44, 6: 0.39 },
        ratio_gram_sd: { 4: 0.09, 5: 0.11, 6: 0.08 },
        ratio_morp_mean: { 4: 0.62, 5: 0.59, 6: 0.52 },
        ratio_morp_sd: { 4: 0.08, 5: 0.11, 6: 0.08 },
        num_word_types_mean: { 4: 35.29, 5: 34.0, 6: 34.37 },
        num_word_types_sd: { 4: 7.25, 5: 6.85, 6: 12.08 },
        num_word_tokens_mean: { 4: 47.79, 5: 48.11, 6: 55.0 },
        num_word_tokens_sd: { 4: 12.24, 5: 11.5, 6: 21.78 },
        ratio_word_mean: { 4: 0.75, 5: 0.72, 6: 0.65 },
        ratio_word_sd: { 4: 0.09, 5: 0.1, 6: 0.11 },
      },
      "이야기(자발산출)": {
        mlu_w_mean: { 4: 3.3, 5: 4.06, 6: 4.5 },
        mlu_w_sd: { 4: 1.46, 5: 2.45, 6: 2.15 },
        mlu_m_mean: { 4: 6.0, 5: 7.46, 6: 8.46 },
        mlu_m_sd: { 4: 2.73, 5: 2.45, 6: 2.15 },
        num_gram_types_mean: { 4: 8.78, 5: 12.22, 6: 14.05 },
        num_gram_types_sd: { 4: 4.71, 5: 3.79, 6: 3.19 },
        num_gram_tokens_mean: { 4: 20.72, 5: 29.87, 6: 36.53 },
        num_gram_tokens_sd: { 4: 13.46, 5: 10.04, 6: 12.63 },
        num_morp_types_mean: { 4: 26.33, 5: 36.7, 6: 41.11 },
        num_morp_types_sd: { 4: 14.29, 5: 9.47, 6: 8.27 },
        num_morp_tokens_mean: { 4: 46.44, 5: 65.39, 6: 78.05 },
        num_morp_tokens_sd: { 4: 28.94, 5: 20.13, 6: 25.31 },
        ratio_gram_mean: { 4: 0.53, 5: 0.43, 6: 0.4 },
        ratio_gram_sd: { 4: 0.22, 5: 0.12, 6: 0.08 },
        ratio_morp_mean: { 4: 0.64, 5: 0.58, 6: 0.55 },
        ratio_morp_sd: { 4: 0.18, 5: 0.09, 6: 0.09 },
        num_word_types_mean: { 4: 17.56, 5: 24.48, 6: 27.05 },
        num_word_types_sd: { 4: 9.88, 5: 6.46, 6: 5.48 },
        num_word_tokens_mean: { 4: 25.72, 5: 35.52, 6: 41.53 },
        num_word_tokens_sd: { 4: 15.87, 5: 10.71, 6: 13.29 },
        ratio_word_mean: { 4: 0.75, 5: 0.7, 6: 0.68 },
        ratio_word_sd: { 4: 0.17, 5: 0.09, 6: 0.11 },
      },
      작문: {
        mlu_w_mean: { 1: 8.57, 2: 8.38, 3: 8.09, 4: 9.06, 5: 8.73, 6: 8.81 },
        mlu_w_sd: { 1: 3.22, 2: 1.71, 3: 2.36, 4: 2.49, 5: 3.68, 6: 3.08 },
        mlu_m_mean: {
          1: 14.79,
          2: 15.11,
          3: 15.36,
          4: 17.33,
          5: 17.33,
          6: 17.08,
        },
        mlu_m_sd: { 1: 4.11, 2: 2.5, 3: 3.86, 4: 4.02, 5: 3.68, 6: 3.08 },
        num_gram_types_mean: {
          1: 15.31,
          2: 16.36,
          3: 23.71,
          4: 24.88,
          5: 33.8,
          6: 32.03,
        },
        num_gram_types_sd: {
          1: 3.38,
          2: 3.03,
          3: 4.12,
          4: 4.63,
          5: 5.7,
          6: 4.91,
        },
        num_gram_tokens_mean: {
          1: 24.53,
          2: 26.78,
          3: 42.91,
          4: 49.6,
          5: 69.15,
          6: 66.22,
        },
        num_gram_tokens_sd: {
          1: 5.59,
          2: 5.12,
          3: 10.01,
          4: 10.27,
          5: 15.99,
          6: 12.94,
        },
        num_morp_types_mean: {
          1: 43.78,
          2: 44.03,
          3: 61.87,
          4: 66.88,
          5: 88.33,
          6: 86.19,
        },
        num_morp_types_sd: {
          1: 11.42,
          2: 7.13,
          3: 11.32,
          4: 15.03,
          5: 14.59,
          6: 13.81,
        },
        num_morp_tokens_mean: {
          1: 58.11,
          2: 60.03,
          3: 90.62,
          4: 103.98,
          5: 137.75,
          6: 136.64,
        },
        num_morp_tokens_sd: {
          1: 15.89,
          2: 10.28,
          3: 22.67,
          4: 24.12,
          5: 30.84,
          6: 24.66,
        },
        ratio_gram_mean: {
          1: 0.63,
          2: 0.62,
          3: 0.57,
          4: 0.51,
          5: 0.5,
          6: 0.49,
        },
        ratio_gram_sd: { 1: 0.09, 2: 0.07, 3: 0.09, 4: 0.09, 5: 0.05, 6: 0.07 },
        ratio_morp_mean: {
          1: 0.76,
          2: 0.74,
          3: 0.69,
          4: 0.65,
          5: 0.64,
          6: 0.64,
        },
        ratio_morp_sd: { 1: 0.06, 2: 0.07, 3: 0.06, 4: 0.07, 5: 0.05, 6: 0.06 },
        num_word_types_mean: {
          1: 28.47,
          2: 27.67,
          3: 38.16,
          4: 42.0,
          5: 54.15,
          6: 54.17,
        },
        num_word_types_sd: {
          1: 9.35,
          2: 5.75,
          3: 8.92,
          4: 11.35,
          5: 9.59,
          6: 9.92,
        },
        num_word_tokens_mean: {
          1: 33.58,
          2: 33.25,
          3: 47.71,
          4: 54.38,
          5: 69.85,
          6: 70.42,
        },
        num_word_tokens_sd: {
          1: 12.01,
          2: 6.89,
          3: 13.98,
          4: 14.94,
          5: 14.48,
          6: 12.98,
        },
        ratio_word_mean: {
          1: 0.86,
          2: 0.84,
          3: 0.81,
          4: 0.78,
          5: 0.77,
          6: 0.77,
        },
        ratio_word_sd: { 1: 0.06, 2: 0.08, 3: 0.06, 4: 0.07, 5: 0.08, 6: 0.06 },
      },
    },

    ref_data: {},
    ref_age: 2,
  };

  let words = [[], [], []];
  let grams = [[], [], []];
  let line_index = 0;

  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let tmp = "";
    let tag = "";
    let par = "";
    let valid = true;
    let tagvalid = false;
    let parvalid = false;
    let par_word_count = 0;
    let statement_raw = lines[i];
    let statement = lines[i].trim(); // trim()은 문자열 양쪽 끝에 있는 공백을 제거해 줌.

    let line_prefix = statement.substring(0, 1);
    if (line_prefix === "아") {
      line_index++;

      for (let j = 0; j < statement.length; j++) {
        const ch = statement[j];
        if (ch === "(") {
          valid = false;
          parvalid = true;
        } else if (ch === ")") {
          valid = true;
          parvalid = false;
          par += " ";
        } else if (ch === "[") {
          valid = false;
          tagvalid = true;
          tag += ch;
        } else if (ch === "]") {
          valid = true;
          tagvalid = false;
          tag += ch;

          //태그 등록
          if (!result.tags.includes(tag)) {
            result.tags.push(tag);
          }

          if (!result.lineByTag[tag]) {
            result.lineByTag[tag] = [];
          }
          result.lineByTag[tag].push(`${line_index}. ${statement}`);

          tag = "";
        } else {
          if (valid) {
            tmp += ch;
          }
          if (parvalid) {
            par += ch;
          }
          if (tagvalid) {
            tag += ch;
          }
        }
      }

      let parTokens = par.split(" ");
      for (let j = 0; j < parTokens.length; j++) {
        if (parTokens[j].length > 0) {
          par_word_count++;
        }
      }

      result.total_par_word_count += par_word_count;
      statement = tmp;
    }

    if (statement.length > 0) {
      //------------------------------------------------------------------
      // 발화의 종류 결정
      let lineOwnerStr = statement.substring(0, 1);
      let lineOwner;
      if (lineOwnerStr === "아") lineOwner = 0;
      else if (lineOwnerStr === "엄") lineOwner = 1;
      else if (lineOwnerStr === "검") lineOwner = 2;
      else if (lineOwnerStr === "+") lineOwner = 3;
      else if (lineOwnerStr === "=") lineOwner = 4;
      else lineOwner = 5;
      //------------------------------------------------------------------

      if (lineOwner === 3) {
        let infoType = statement.substring(1, 3);
        if (infoType === "이름")
          result.info.name = statement.substring(4).trim();
        if (infoType === "성별")
          result.info.gender = statement.substring(4).trim();
        if (infoType === "학년")
          result.info.grade = statement.substring(4).trim();
        infoType = statement.substring(1, 4);
        if (infoType === "검사일") {
          result.info.examdate = statement.substring(5).trim();
        }
        if (infoType === "검사자")
          result.info.examiner = statement.substring(5).trim();
        infoType = statement.substring(1, 5);
        if (infoType === "생년월일")
          result.info.birthday = statement.substring(6).trim();
        if (infoType === "교육기관")
          result.info.school = statement.substring(6).trim();
        if (infoType === "평가지역")
          result.info.region = statement.substring(6).trim();
        if (infoType === "평가기관")
          result.info.institution = statement.substring(6).trim();
        if (infoType === "발화종류") {
          result.info.utteranceType = statement.substring(6).trim();
        }
      } // if (lineOwner === 3)
      else if (lineOwner === 4) {
        // 해당 인덱스에 배열이 없으면 새로 생성
        if (!result.extras[line_index]) {
          result.extras[line_index] = [];
        }
        // 배열에 새로운 해설 문장을 추가
        result.extras[line_index].push(statement);
      } else if (lineOwner < 3) {
        //--------------------------------------------------------------
        // 원문장을 종류별로 저장
        let lineIter = result.statements[lineOwner].length;
        result.statements[lineOwner][lineIter] = statement_raw
          .substring(1)
          .trim();
        //--------------------------------------------------------------

        //--------------------------------------------------------------
        // 이해 안되는 부분이 있는지 확인
        let part_known = 0;
        let part_unknown = 0;
        // statement의 길이만큼 루프를 돌면서 이해 불가 부분을 확인
        for (let j = 1; j < statement.length; j++) {
          let ch = statement[j];
          if (ch === "*") part_unknown = 1;
          else if (ch === " " || ch === "\n" || ch === "\r") {
          } else {
            part_known = 1;
          }
        }
        // 문장에 "XXX"가 있는 경우 완전 이해 불가로 간주
        for (let j = 1; j < statement.length; j++) {
          let sub = statement.substring(j, j + 3);
          if (sub === "XXX") {
            part_known = 0;
            part_unknown = 1;
          }
        }
        //--------------------------------------------------------------

        //--------------------------------------------------------------
        // 이해 가능도별 분석 데이터 얻음
        result.num_line_total[lineOwner]++;
        if (part_known === 0) {
          result.num_line_unknown[lineOwner]++;
          result.statements_understand[lineOwner][lineIter] = 0;
        } else {
          if (part_unknown === 0) {
            result.num_line_known[lineOwner]++;
            result.statements_understand[lineOwner][lineIter] = 2;
          } else {
            result.num_line_partial[lineOwner]++;
            result.statements_understand[lineOwner][lineIter] = 1;
          }
        }
        //--------------------------------------------------------------

        //--------------------------------------------------------------
        // 마지막 글자에 따라 문장을 분류하고 마지막 글자는 제거
        statement = statement.trim();
        let lastch = statement.slice(-1);
        if (lastch === ".") {
          result.num_line_end_period[lineOwner]++;
          statement = statement.slice(0, -1);
        } else if (lastch === "?") {
          result.num_line_end_question[lineOwner]++;
          statement = statement.slice(0, -1);
        } else if (lastch === "!") {
          result.num_line_end_exclamation[lineOwner]++;
          statement = statement.slice(0, -1);
        } else if (lastch === ">") {
          result.num_line_end_bracket[lineOwner]++;
          statement = statement.slice(0, -1);
        } else if (lastch === "^") {
          result.num_line_end_exponential[lineOwner]++;
          statement = statement.slice(0, -1);
        }
        //--------------------------------------------------------------

        //--------------------------------------------------------------
        // 문장을 띄어쓰기에 따라 나눔 (토큰 생성)
        const tokens = statement.split(" ");
        let statementWithStar = 0;
        let localWords = 0;
        let localMorphemes = 0;
        result.word_count[lineOwner][lineIter] = 0;

        for (let j = 1; j < tokens.length; j++) {
          if (tokens[j].length > 0) {
            //------------------------------------------------------
            // 어절 수 저장 (이 변수는 이해 안가는 어절도 수에 포함)
            result.word_count[lineOwner][lineIter]++;

            //------------------------------------------------------
            // 이해 안되는 부분이 있으면 제외
            let omit = 0;
            for (let k = 0; k < tokens[j].length; k++) {
              if (tokens[j].charAt(k) === "*") {
                omit = 1;
                break;
              }
              if (tokens[j].substring(k, k + 3) === "XXX") {
                omit = 1;
                break;
              }
            }
            if (omit === 1) {
              statementWithStar = 1;
              continue;
            }
            //------------------------------------------------------

            result.num_word_tokens[lineOwner]++;
            localWords++;

            const morphemes = tokens[j].split("/");

            const root = morphemes[0];
            const size = result.wordlist[root]
              ? result.wordlist[root].length
              : 0;

            // 이미 있는지 확인
            let found = false;
            for (let k = 0; k < size; k++) {
              if (result.wordlist[root][k] === tokens[j]) {
                result.wordlist_count[root][k]++;
                found = true;
                break;
              }
            }

            if (!found) {
              if (!result.wordlist[root]) {
                result.wordlist[root] = [];
                result.wordlist_count[root] = [];
              }
              result.wordlist[root][size] = tokens[j];
              result.wordlist_count[root][size] = 1;
            }

            //------------------------------------------------------
            // 낱말이 기존에 있었던 것인지 확인
            found = false;
            if (!words[lineOwner]) {
              words[lineOwner] = [];
            }
            for (let k = 0; k < words[lineOwner].length; k++) {
              if (words[lineOwner][k] === morphemes[0]) {
                found = true;
                break;
              }
            }
            if (!found) {
              const size = words[lineOwner].length;
              words[lineOwner][size] = morphemes[0];
            }

            //------------------------------------------------------
            // 문법형태소 분석
            for (let g = 1; g < morphemes.length; g++) {
              result.num_gram_tokens[lineOwner]++;
              localMorphemes++;

              let found = false;
              if (!grams[lineOwner]) {
                grams[lineOwner] = [];
              }
              for (let k = 0; k < grams[lineOwner].length; k++) {
                if (grams[lineOwner][k] === morphemes[g]) {
                  found = true;
                  break;
                }
              }
              if (!found) {
                const size = grams[lineOwner].length;
                grams[lineOwner][size] = morphemes[g];
              }

              found = false;
              if (!result.grams_order[lineOwner]) {
                result.grams_order[lineOwner] = [];
              }
              if (!result.grams_order[lineOwner][g]) {
                result.grams_order[lineOwner][g] = [];
              }
              if (!result.grams_order_count[lineOwner]) {
                result.grams_order_count[lineOwner] = [];
              }
              if (!result.grams_order_count[lineOwner][g]) {
                result.grams_order_count[lineOwner][g] = [];
              }
              for (
                let k = 0;
                k < result.grams_order[lineOwner][g].length;
                k++
              ) {
                if (result.grams_order[lineOwner][g][k] === morphemes[g]) {
                  result.grams_order_count[lineOwner][g][k]++;
                  found = true;
                  break;
                }
              }
              if (!found) {
                const size = result.grams_order[lineOwner][g].length;
                result.grams_order[lineOwner][g][size] = morphemes[g];
                result.grams_order_count[lineOwner][g][size] = 1;
                if (g > result.grams_order_max) result.grams_order_max = g;
              }
            } // for (let g = 1; g < morphemes.length; g++) {
          } // if (tokens[j].length > 0)
        } // for (let j = 1; j < tokens.length; j++)

        if (statementWithStar === 0) {
          if (result.word_count[lineOwner][lineIter] > result.words_max) {
            result.words_max = result.word_count[lineOwner][lineIter];
          }
          result.num_word_tokens_full[lineOwner] += localWords;
          result.num_gram_tokens_full[lineOwner] += localMorphemes;
        }

        result.info.time =
          parseInt(result.info.minutes, 10) * 60 +
          parseInt(result.info.seconds, 10);
      } // else if (lineOwner < 3)
    } // if (statement.length > 0)
  }

  // 나이 계산
  const getAgeFromDates = (examdate, birthday) => {
    // 날짜 문자열을 YYYY.MM.DD에서 YYYY-MM-DD로 변경하여 Date 객체로 변환
    const examDateParts = examdate.split("-").map(Number);
    const birthDateParts = birthday.split("-").map(Number);

    // 검사일과 생년월일을 Date 객체로 생성
    const examDate = new Date(
      examDateParts[0],
      examDateParts[1] - 1,
      examDateParts[2]
    );
    const birthDate = new Date(
      birthDateParts[0],
      birthDateParts[1] - 1,
      birthDateParts[2]
    );

    // 기본 나이 계산
    let age_years = examDate.getFullYear() - birthDate.getFullYear();
    let age_months = examDate.getMonth() - birthDate.getMonth();

    // 생일이 아직 지나지 않았으면 나이를 한 살 적게 계산하고 개월 수 조정
    if (
      age_months < 0 ||
      (age_months === 0 && examDate.getDate() < birthDate.getDate())
    ) {
      age_years--;
      age_months += 12;
    }

    // 개월 수가 음수인 경우(생일이 아직 지나지 않은 경우) 처리
    if (examDate.getDate() < birthDate.getDate()) {
      age_months--;
    }

    // age_months가 음수일 경우, 개월 수를 다시 11로 설정
    if (age_months < 0) {
      age_months += 12;
    }

    return { age_years, age_months };
  };

  const { age_years, age_months } = getAgeFromDates(
    result.info.examdate,
    result.info.birthday
  );
  result.info.age_years = age_years;
  result.info.age_months = age_months;

  // ref_age를 설정하는 부분
  // 자발화의 경우 2세~6세
  // 이야기의 경우 4세~6세
  // 작문의 경우 1학년~6학년
  if (result.info.utteranceType === "자발화") {
    if (result.info.age_years >= 6) {
      result.ref_age = 6;
    } else if (result.info.age_years <= 2) {
      result.ref_age = 2;
    } else {
      result.ref_age = result.info.age_years;
    }
  } else if (result.info.utteranceType === "이야기(회상산출)") {
    if (result.info.age_years >= 6) {
      result.ref_age = 6;
    } else if (result.info.age_years <= 4) {
      result.ref_age = 4;
    } else {
      result.ref_age = result.info.age_years;
    }
  } else if (result.info.utteranceType === "이야기(자발산출)") {
    if (result.info.age_years >= 6) {
      result.ref_age = 6;
    } else if (result.info.age_years <= 4) {
      result.ref_age = 4;
    } else {
      result.ref_age = result.info.age_years;
    }
  } else if (result.info.utteranceType === "작문") {
    if (result.info.grade === "미취학") {
      result.ref_age = 1;
    } else {
      result.ref_age = parseInt(
        result.info.grade.replace("학년", "").trim(),
        10
      );
    }
  }

  // 키를 정렬한 wordlist 객체 생성
  const sorted_wordlist = Object.keys(result.wordlist)
    .sort()
    .reduce((acc, key) => {
      acc[key] = result.wordlist[key];
      return acc;
    }, {});
  result.wordlist = sorted_wordlist;

  for (let i = 0; i < 3; i++) {
    result.num_word_types[i] = words[i].length;
    result.num_gram_types[i] = grams[i].length;

    //----------------------------------------------------------------------
    // 통계치 계산
    result.num_morp_types[i] =
      result.num_word_types[i] + result.num_gram_types[i];
    result.num_morp_tokens[i] =
      result.num_word_tokens[i] + result.num_gram_tokens[i];
    result.ratio_word[i] = result.num_word_types[i] / result.num_word_tokens[i];
    result.ratio_gram[i] = result.num_gram_types[i] / result.num_gram_tokens[i];
    result.ratio_morp[i] = result.num_morp_types[i] / result.num_morp_tokens[i];
    result.mlu_w[i] = result.num_word_tokens_full[i] / result.num_line_known[i];
    result.mlu_m[i] =
      (result.num_word_tokens_full[i] + result.num_gram_tokens_full[i]) /
      result.num_line_known[i];
  }

  const utteranceType = result.info.utteranceType;
  result.ref_data = result.criteria[utteranceType] || result.criteria["자발화"];

  result.mlu_w_pos =
    (result.mlu_w[0] - result.ref_data.mlu_w_mean[result.ref_age]) /
    result.ref_data.mlu_w_sd[result.ref_age];
  result.mlu_m_pos =
    (result.mlu_m[0] - result.ref_data.mlu_m_mean[result.ref_age]) /
    result.ref_data.mlu_m_sd[result.ref_age];
  result.num_gram_types_pos =
    (result.num_gram_types[0] -
      result.ref_data.num_gram_types_mean[result.ref_age]) /
    result.ref_data.num_gram_types_sd[result.ref_age];
  result.num_gram_tokens_pos =
    (result.num_gram_tokens[0] -
      result.ref_data.num_gram_tokens_mean[result.ref_age]) /
    result.ref_data.num_gram_tokens_sd[result.ref_age];
  result.num_morp_types_pos =
    (result.num_morp_types[0] -
      result.ref_data.num_morp_types_mean[result.ref_age]) /
    result.ref_data.num_morp_types_sd[result.ref_age];
  result.num_morp_tokens_pos =
    (result.num_morp_tokens[0] -
      result.ref_data.num_morp_tokens_mean[result.ref_age]) /
    result.ref_data.num_morp_tokens_sd[result.ref_age];
  result.ratio_gram_pos =
    (result.ratio_gram[0] - result.ref_data.ratio_gram_mean[result.ref_age]) /
    result.ref_data.ratio_gram_sd[result.ref_age];
  result.ratio_morp_pos =
    (result.ratio_morp[0] - result.ref_data.ratio_morp_mean[result.ref_age]) /
    result.ref_data.ratio_morp_sd[result.ref_age];
  result.num_word_types_pos =
    (result.num_word_types[0] -
      result.ref_data.num_word_types_mean[result.ref_age]) /
    result.ref_data.num_word_types_sd[result.ref_age];
  result.num_word_tokens_pos =
    (result.num_word_tokens[0] -
      result.ref_data.num_word_tokens_mean[result.ref_age]) /
    result.ref_data.num_word_tokens_sd[result.ref_age];
  result.ratio_word_pos =
    (result.ratio_word[0] - result.ref_data.ratio_word_mean[result.ref_age]) /
    result.ref_data.ratio_word_sd[result.ref_age];

  if (result.num_word_types_pos >= -1.0)
    result.features_td.push("낱말 유형수 (NDW)");
  else result.features_ssd.push("낱말 유형수 (NDW)");
  if (result.num_word_tokens_pos >= -1.0)
    result.features_td.push("낱말 빈도수 (NTW)");
  else result.features_ssd.push("낱말 빈도수 (NTW)");
  if (result.ratio_word_pos >= -1.0)
    result.features_td.push("어휘 다양도 (TTR)");
  else result.features_ssd.push("어휘 다양도 (TTR)");
  if (result.mlu_w_pos >= -1.0)
    result.features_td.push("어절로 본 평균발화길이 (MLUe)");
  else result.features_ssd.push("어절로 본 평균발화길이 (MLUe)");
  if (result.mlu_m_pos >= -1.0)
    result.features_td.push("형태소로 본 평균발화길이 (MLUm)");
  else result.features_ssd.push("형태소로 본 평균발화길이 (MLUm)");
  if (result.num_gram_types_pos >= -1.0)
    result.features_td.push("문법형태소유형수");
  else result.features_ssd.push("문법형태소유형수");
  if (result.num_gram_tokens_pos >= -1.0)
    result.features_td.push("문법형태소빈도수");
  else result.features_ssd.push("문법형태소빈도수");
  if (result.ratio_gram_pos >= -1.0)
    result.features_td.push("문법형태소빈도비율");
  else result.features_ssd.push("문법형태소빈도비율");
  if (result.num_morp_types_pos >= -1.0)
    result.features_td.push("형태소유형수");
  else result.features_ssd.push("형태소유형수");
  if (result.num_morp_tokens_pos >= -1.0)
    result.features_td.push("형태소빈도수");
  else result.features_ssd.push("형태소빈도수");
  if (result.ratio_morp_pos >= -1.0) result.features_td.push("형태소빈도비율");
  else result.features_ssd.push("형태소빈도비율");

  return result;
};
