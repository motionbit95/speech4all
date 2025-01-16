import React, { forwardRef } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const KLAReportPage8 = forwardRef(({ customData }, ref) => {
  // 어절 수별로 문장을 분류한 결과를 displayArray에 저장
  const displayArray = [];
  const groupedStatements = customData.word_count[0].reduce((acc, _, idx) => {
    const wordCount = customData.word_count[0][idx];
    const understanding = customData.statements_understand[0][idx];
    const statement = `${idx + 1}. ${customData.statements[0][idx]}`;

    if (understanding === 2) {
      if (!acc[wordCount]) {
        acc[wordCount] = [];
      }
      acc[wordCount].push(statement);
    }
    return acc;
  }, {});

  Object.entries(groupedStatements).forEach(([wordCount, statements]) => {
    displayArray.push(`${wordCount}어절:`);
    statements.forEach((statement) => {
      displayArray.push(statement);
    });
  });

  // 페이지를 나누기 위한 함수
  const splitIntoPagesByLines = (array, maxLinesPerPage) => {
    const pages = [];
    let currentPage = [];

    array.forEach((item, index) => {
      if (currentPage.length >= maxLinesPerPage) {
        pages.push(currentPage);
        currentPage = [];
      }
      currentPage.push(item);
    });

    // 마지막 페이지 추가
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }
    return pages;
  };

  // displayArray를 페이지로 나눔 (예: 40줄마다 페이지를 나눔)
  const pages = splitIntoPagesByLines(displayArray, 36);

  return (
    <Box ref={ref}>
      {pages.map((page, pageIndex) => (
        <Box
          key={pageIndex}
          ref={(el) => {
            if (!ref.current) {
              ref.current = []; // 배열로 초기화
            }
            ref.current[pageIndex] = el;
          }}
          className="page"
          sx={{
            width: "794px",
            height: "1123px",
            padding: 3,
            backgroundColor: "white",
            boxShadow: 3,
            margin: "20px",
            pageBreakAfter: "always",
          }}
        >
          <Paper
            elevation={3}
            sx={{ padding: 4, height: "93%", border: "3px solid #4b2354" }}
          >
            {/* 헤더 섹션 */}
            <Box className="header-section" sx={{ marginBottom: 4 }}>
              <Box className="kla-title" sx={{ marginBottom: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontFamily: "Noto Sans KR" }}
                >
                  <span style={{ color: "#4b2354", fontWeight: "bold" }}>
                    KLA
                  </span>
                  <span style={{ color: "#999" }}>
                    {" "}
                    Korean Language Analysis
                  </span>
                </Typography>
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
              <Box
                className="kla-report-page3-data-type"
                sx={{ marginBottom: 4 }}
              >
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
                      checked={[
                        "이야기(회상산출)",
                        "이야기(자발산출)",
                      ].includes(customData.info.utteranceType)}
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
                      checked={
                        customData.info.utteranceType === "이야기(회상산출)"
                      }
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
                      checked={
                        customData.info.utteranceType === "이야기(자발산출)"
                      }
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

              {/* 분석 결과 */}
              <Box
                className="kla-report-page8-analysis-result"
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
                        colSpan="1"
                        style={{
                          fontSize: "16px",
                          backgroundColor: "#f0f0f0",
                          border: "none",
                        }}
                      >
                        어절수 별 발화 목록
                      </td>
                    </tr>
                    <tr>
                      <td style={{ height: "5px" }}></td>
                    </tr>

                    {/* 페이지별 displayArray를 출력 */}
                    {page.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            width: "100%",
                            fontSize: "12px",
                            backgroundColor: item.includes("어절:")
                              ? "#f0f0f0"
                              : "#ffffff",
                            border: "none",
                            textAlign: "left",
                            verticalAlign: "middle",
                          }}
                        >
                          {item}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          </Paper>
        </Box>
      ))}
    </Box>
  );
});

export default KLAReportPage8;
