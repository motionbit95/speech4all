import React, { forwardRef } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const KLAReportPage4 = forwardRef(({ customData }, ref) => {
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

          {/* ================ 분석 결과 ================ */}
          <Box
            className="kla-report-page4-analysis-result"
            sx={{ marginBottom: 4 }}
          >
            <Typography
              variant="h5"
              sx={{ fontFamily: "Noto Sans KR", marginBottom: 2 }}
            >
              분석 결과
            </Typography>

            <table
              className="analysis-table"
              style={{
                width: "100%",
                tableLayout: "auto",
                borderCollapse: "collapse",
                fontFamily: "Noto Sans KR",
              }}
            >
              <tbody>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      fontSize: "20px",
                      backgroundColor: "#f0f0f0",
                      border: "none",
                    }}
                  >
                    발화 정보
                  </td>
                </tr>
                <tr>
                  <td
                    rowSpan="4"
                    style={{
                      position: "relative",
                      zIndex: 10,
                      width: "25%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    이해가능도별
                    <br />
                    발화수
                  </td>
                  <td
                    style={{
                      width: "40%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    전체발화수
                  </td>
                  <td
                    style={{
                      width: "35%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {customData.num_line_total[0]}개
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "40%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    이해 불가
                  </td>
                  <td
                    style={{
                      width: "35%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {customData.num_line_unknown[0]}개
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "40%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    부분 이해 가능
                  </td>
                  <td
                    style={{
                      width: "35%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {customData.num_line_partial[0]}개
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "40%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    완전 이해 가능
                  </td>
                  <td
                    style={{
                      width: "35%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {customData.num_line_known[0]}개
                  </td>
                </tr>
                <tr>
                  <td
                    rowSpan="5"
                    style={{
                      position: "relative",
                      zIndex: 10,
                      width: "25%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    이해가능발화
                    <br />
                    유형분석
                  </td>
                  <td
                    style={{
                      width: "40%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    평서문 발화(.)
                  </td>
                  <td
                    style={{
                      width: "35%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {customData.num_line_end_period[0]}개
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "40%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    의문문 발화(?)
                  </td>
                  <td
                    style={{
                      width: "35%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {customData.num_line_end_question[0]}개
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "40%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    감탄문 발화(!)
                  </td>
                  <td
                    style={{
                      width: "35%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {customData.num_line_end_exclamation[0]}개
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "40%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    중첩 발화(&gt;)
                  </td>
                  <td
                    style={{
                      width: "35%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {customData.num_line_end_bracket[0]}개
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "40%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    미완성 발화(^)
                  </td>
                  <td
                    style={{
                      width: "35%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {customData.num_line_end_exponential[0]}개
                  </td>
                </tr>
              </tbody>
            </table>

            <table
              className="utterance-list"
              style={{
                width: "100%",
                tableLayout: "auto",
                borderCollapse: "collapse",
                fontFamily: "Noto Sans KR",
                marginTop: "20px",
              }}
            >
              <tbody>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      fontSize: "20px",
                      backgroundColor: "#f0f0f0",
                      border: "none",
                      height: "50px",
                    }}
                  >
                    [] 있는 발화 목록
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "20%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    태그 종류
                  </td>
                  <td
                    style={{
                      width: "80%",
                      fontSize: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    발화 예시
                  </td>
                </tr>
                {Object.keys(customData.lineByTag).map((tag) => (
                  <tr key={tag}>
                    <td
                      style={{
                        width: "20%",
                        fontSize: "16px",
                        backgroundColor: "#ffffff",
                        border: "1px solid black",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {tag}
                    </td>
                    <td
                      style={{
                        width: "80%",
                        fontSize: "16px",
                        backgroundColor: "#ffffff",
                        border: "1px solid black",
                        textAlign: "left",
                        verticalAlign: "middle",
                        padding: "8px",
                      }}
                    >
                      {customData.lineByTag[tag].map((line, index) => {
                        // 줄 번호 추출
                        const lineNumber = parseInt(line.split(".")[0], 10);
                        return (
                          <div key={index}>
                            {line}
                            {/* extras 데이터가 있을 경우만 표시 */}
                            {customData.extras[lineNumber] && (
                              <div>
                                {customData.extras[lineNumber].map(
                                  (extra, extraIndex) => (
                                    <div key={extraIndex}>{extra}</div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
});

export default KLAReportPage4;
