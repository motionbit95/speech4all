import React, { forwardRef } from "react";
import "./KLAReportPage3.css";
import {
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import HorizontalBarChart from "./HorizontalBarChart";

const KLAReportPage3 = forwardRef(({ customData }, ref) => {
  const calculatePosition = (pos) => {
    let left_end = 1;
    let right_end = 100;
    if (pos <= -2.17) {
      return left_end;
    } else if (pos >= 2.17) {
      return right_end;
    } else {
      // 선형 변환 공식
      return ((pos + 2.17) / (2.17 + 2.17)) * (right_end - left_end) + left_end;
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        width: "794px", // A4 width in pixels
        height: "1123px", // A4 height in pixels
        padding: 3,
        backgroundColor: "white",
        boxShadow: 3, // 그림자 추가
        margin: "20px", // 바깥쪽 여백 추가
        //overflowY: 'auto', // 내용이 넘칠 경우 스크롤
        aspectRatio: "794 / 1123",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, height: "93%", border: "3px solid #4b2354" }}
      >
        {" "}
        {/* 버건디색 테두리 */}
        <Box className="header-section" sx={{ marginBottom: 4 }}>
          {/* Title Section */}
          <Box className="kla-title" sx={{ marginBottom: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Noto Sans KR" }}
            >
              <span style={{ color: "#4b2354", fontWeight: "bold" }}>KLA</span>{" "}
              {/* KLA 강조 */}
              <span style={{ color: "#999" }}>
                {" "}
                Korean Language Analysis
              </span>{" "}
              {/* 나머지 텍스트는 회색 */}
            </Typography>
            {/* 검사일, 이름, 생활연령, 학년을 flex로 배치 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "Noto Sans KR",
                fontSize: "20px",
              }}
            >
              <Typography
                sx={{ fontSize: "20px !important", fontWeight: "normal" }}
              >
                검사일 | {customData.info.examdate}
              </Typography>
              <Typography
                sx={{ fontSize: "20px !important", fontWeight: "normal" }}
              >
                이름 | {customData.info.name}
              </Typography>
              <Typography
                sx={{ fontSize: "20px !important", fontWeight: "normal" }}
              >
                생활연령 | {customData.info.age_years}세{" "}
                {customData.info.age_months}개월
              </Typography>
              <Typography
                sx={{ fontSize: "20px !important", fontWeight: "normal" }}
              >
                학년 | {customData.info.grade}
              </Typography>
            </Box>
          </Box>

          {/* ================ 자료 유형 ================ */}
          <Box className="kla-report-page3-data-type" sx={{ marginBottom: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontFamily: "Noto Sans KR", marginBottom: 2 }}
            >
              자료 유형
            </Typography>

            {/* 각 체크박스 및 라벨을 감싸는 박스 */}
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              {/* 자발화 */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#E6E0F8",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  flexGrow: 1, // 각 항목이 동일한 비율로 공간 차지
                  justifyContent: "center", // 텍스트를 중앙 정렬
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customData.info.utteranceType === "자발화"}
                      sx={{ transform: "scale(1.0)" }}
                    />
                  }
                  label={
                    <Typography
                      sx={{ fontSize: "20px", fontFamily: "Noto Sans KR" }}
                    >
                      자발화
                    </Typography>
                  }
                  sx={{ fontFamily: "Noto Sans KR" }}
                />
              </Box>

              {/* 이야기 */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#E6E0F8",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  flexGrow: 1, // 각 항목이 동일한 비율로 공간 차지
                  justifyContent: "center", // 텍스트를 중앙 정렬
                }}
              >
                <Checkbox
                  checked={["이야기(회상산출)", "이야기(자발산출)"].includes(
                    customData.info.utteranceType
                  )}
                  sx={{ transform: "scale(1.0)", marginRight: "0px" }}
                />
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Noto Sans KR",
                    marginRight: "12px",
                  }}
                >
                  이야기
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Noto Sans KR",
                    marginRight: "4px",
                  }}
                >
                  (
                </Typography>
                <Checkbox
                  checked={customData.info.utteranceType === "이야기(회상산출)"}
                  sx={{
                    transform: "scale(1.0)",
                    padding: 0,
                    marginRight: "4px",
                  }}
                />
                <Typography
                  sx={{ fontSize: "20px", fontFamily: "Noto Sans KR" }}
                >
                  회상산출
                </Typography>
                <Checkbox
                  checked={customData.info.utteranceType === "이야기(자발산출)"}
                  sx={{
                    transform: "scale(1.0)",
                    padding: 0,
                    marginRight: "4px",
                    marginLeft: "12px",
                  }}
                />
                <Typography
                  sx={{ fontSize: "20px", fontFamily: "Noto Sans KR" }}
                >
                  자발산출
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Noto Sans KR",
                    marginLeft: "4px",
                  }}
                >
                  )
                </Typography>
              </Box>

              {/* 작문 */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#E6E0F8",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  flexGrow: 1, // 각 항목이 동일한 비율로 공간 차지
                  justifyContent: "center", // 텍스트를 중앙 정렬
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customData.info.utteranceType === "작문"}
                    />
                  }
                  label={
                    <Typography
                      sx={{ fontSize: "20px", fontFamily: "Noto Sans KR" }}
                    >
                      작문
                    </Typography>
                  }
                  sx={{ fontFamily: "Noto Sans KR" }}
                />
              </Box>
            </Box>
          </Box>

          {/* ================ 자료 특성 ================ */}
          <Box
            className="kla-report-page3-data-feature"
            sx={{ marginBottom: 4 }}
          >
            <Typography
              variant="h5"
              sx={{ fontFamily: "Noto Sans KR", marginBottom: 2 }}
            >
              자료 특성
            </Typography>

            {customData.info.utteranceType === "자발화" && (
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontFamily: "Noto Sans KR",
                  marginBottom: 2,
                }}
              >
                아래 분석 결과는 놀이 및 책 상호작용 상황, 혹은 자연스러운 대화
                상황에서 수집된 대상자의 완전 이해 가능한 자발화 (
                {customData.num_line_total[0]}) 발화를 분석하여 동일 ( 연령 )
                집단과 비교하여 살펴본 준거이다.
              </Typography>
            )}

            {customData.info.utteranceType === "이야기(회상산출)" && (
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontFamily: "Noto Sans KR",
                  marginBottom: 2,
                }}
              >
                아래 분석 결과는 공 · 그네 이야기를 모두 ( 회상 ) 산출한
                대상자의 이야기 발화를 분석하여 동일 ( 연령 ) 집단과 비교하여
                살펴본 준거이다.
              </Typography>
            )}

            {customData.info.utteranceType === "이야기(자발산출)" && (
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontFamily: "Noto Sans KR",
                  marginBottom: 2,
                }}
              >
                아래 분석 결과는 공 · 그네 이야기를 모두 ( 자발 ) 산출한
                대상자의 이야기 발화를 분석하여 동일 ( 연령 ) 집단과 비교하여
                살펴본 준거이다.
              </Typography>
            )}

            {customData.info.utteranceType === "작문" && (
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontFamily: "Noto Sans KR",
                  marginBottom: -2,
                }}
              >
                아래 분석 결과는 두 가지 작문 과제를 모두 작성한 대상자의 작문
                문장을 분석하여 동일 ( 학년 ) 집단과 비교하여 살펴본 준거이다.
                학년별 작문 과제 종류(K-CELF-5 쓰기) - 1-2학년: 현장학습 &
                가방싸기, 3-4학년: 개학날 & 아침조회, 5-6학년: 여름방학 & 예주의
                숙제
              </Typography>
            )}
          </Box>

          {/* ================ 대상자 결과 요약 ================ */}
          <Typography
            variant="h5"
            sx={{ fontFamily: "Noto Sans KR", marginBottom: 2 }}
          >
            대상자 결과 요약
          </Typography>

          <table
            className="data-table"
            style={{
              width: "100%",
              tableLayout: "fixed",
              borderCollapse: "collapse",
              fontFamily: "Noto Sans KR",
            }}
          >
            <thead>
              <tr>
                <th rowSpan="2" style={{ width: "10%" }}>
                  영역
                </th>
                <th rowSpan="2" style={{ width: "20%" }}>
                  측정치
                </th>
                <th rowSpan="2" style={{ width: "10%" }}>
                  결과값
                </th>
                <th colSpan="9" style={{ width: "60%" }}>
                  대상 아동의 위치
                </th>
              </tr>
              <tr className="position-header">
                <th style={{ fontSize: "12px" }}>-2SD</th>
                <th style={{ fontSize: "12px", color: "gray" }}>-1.5</th>
                <th style={{ fontSize: "12px" }}>-1SD</th>
                <th style={{ fontSize: "12px", color: "gray" }}>-0.5</th>
                <th style={{ fontSize: "12px" }}>평균</th>
                <th style={{ fontSize: "12px", color: "gray" }}>+0.5</th>
                <th style={{ fontSize: "12px" }}>+1SD</th>
                <th style={{ fontSize: "12px", color: "gray" }}>+1.5</th>
                <th style={{ fontSize: "12px" }}>+2SD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="3">의미</td>
                <td>날말 유형수 (NDW)</td>
                <td>{customData.num_word_types[0]}</td>
                <td colSpan="9" className="chart-cell">
                  <HorizontalBarChart
                    position={calculatePosition(customData.num_word_types_pos)}
                  />
                </td>
              </tr>
              <tr>
                <td>날말 빈도수 (NTW)</td>
                <td>{customData.num_word_tokens[0]}</td>
                <td colSpan="9" className="chart-cell">
                  <HorizontalBarChart
                    position={calculatePosition(customData.num_word_tokens_pos)}
                  />
                </td>
              </tr>
              <tr>
                <td>어휘 다양도 (TTR)</td>
                <td>{customData.ratio_word[0].toFixed(2)}</td>
                <td colSpan="9" className="chart-cell">
                  <HorizontalBarChart
                    position={calculatePosition(customData.ratio_word_pos)}
                  />
                </td>
              </tr>
              <tr>
                <td rowSpan="8">문법</td>
                <td>
                  어절로 본 평균
                  <br />
                  발화길이 (MLUe)
                </td>
                <td>{customData.mlu_w[0].toFixed(2)}</td>
                <td colSpan="9" className="chart-cell">
                  <HorizontalBarChart
                    position={calculatePosition(customData.mlu_w_pos)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  형태소로 본 평균
                  <br />
                  발화길이 (MLUm)
                </td>
                <td>{customData.mlu_m[0].toFixed(2)}</td>
                <td colSpan="9" className="chart-cell">
                  <HorizontalBarChart
                    position={calculatePosition(customData.mlu_m_pos)}
                  />
                </td>
              </tr>
              <tr>
                <td>문법형태소유형수</td>
                <td>{customData.num_gram_types[0]}</td>
                <td colSpan="9" className="chart-cell">
                  <HorizontalBarChart
                    position={calculatePosition(customData.num_gram_types_pos)}
                  />
                </td>
              </tr>
              <tr>
                <td>문법형태소빈도수</td>
                <td>{customData.num_gram_tokens[0]}</td>
                <td colSpan="9" className="chart-cell">
                  <HorizontalBarChart
                    position={calculatePosition(customData.num_gram_tokens_pos)}
                  />
                </td>
              </tr>
              <tr>
                <td>문법형태소빈도비율</td>
                <td>{customData.ratio_gram[0].toFixed(2)}</td>
                <td colSpan="9" className="chart-cell">
                  <HorizontalBarChart
                    position={calculatePosition(customData.ratio_gram_pos)}
                  />
                </td>
              </tr>
              <tr>
                <td>형태소유형수</td>
                <td>{customData.num_morp_types[0]}</td>
                <td colSpan="9" className="chart-cell">
                  <HorizontalBarChart
                    position={calculatePosition(customData.num_morp_types_pos)}
                  />
                </td>
              </tr>
              <tr>
                <td>형태소빈도수</td>
                <td>{customData.num_morp_tokens[0]}</td>
                <td colSpan="9" className="chart-cell">
                  <HorizontalBarChart
                    position={calculatePosition(customData.num_morp_tokens_pos)}
                  />
                </td>
              </tr>
              <tr>
                <td>형태소빈도비율</td>
                <td>{customData.ratio_morp[0].toFixed(2)}</td>
                <td colSpan="9" className="chart-cell">
                  <HorizontalBarChart
                    position={calculatePosition(customData.ratio_morp_pos)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Paper>
    </Box>
  );
});

export default KLAReportPage3;
