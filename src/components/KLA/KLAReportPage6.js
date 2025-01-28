import React, { forwardRef } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const KLAReportPage6 = forwardRef(({ customData }, ref) => {
  const wordlistEntries = Object.entries(customData.wordlist); // 낱말 목록을 배열로 변환
  const wordlistEntriesCount = Object.entries(customData.wordlist_count);

  const createTableArrays = (wordlistEntries, wordlistEntriesCount) => {
    const wordsArray = [];
    const countsArray = [];

    wordlistEntries.forEach(([root, variations]) => {
      // root에 매칭되는 wordlist_count를 찾기
      const wordCountData = wordlistEntriesCount.find(
        ([word]) => word === root
      );

      if (wordCountData) {
        // 루트 단어와 총 개수를 첫 번째 요소로 추가
        const totalCount = wordCountData[1].reduce((a, b) => a + b, 0);
        wordsArray.push(`${root}+`);
        countsArray.push(totalCount);

        // 변형된 형태와 그 개수들을 각각 추가
        variations.forEach((variation, variationIndex) => {
          wordsArray.push(variation);
          countsArray.push(wordCountData[1][variationIndex]);
        });
      }
    });

    return [wordsArray, countsArray];
  };

  // wordsArray와 countsArray 생성
  const [wordsArray, countsArray] = createTableArrays(
    wordlistEntries,
    wordlistEntriesCount
  );

  // 라인 수로 페이지를 나누기 위한 함수
  const splitIntoPagesByLines = (wordsArray, countsArray, maxLinesPerPage) => {
    const pages = [];
    let currentLines = 0;
    let currentPage = { words: [], counts: [] };

    wordsArray.forEach((word, index) => {
      if (currentLines + 1 > maxLinesPerPage) {
        // 현재 페이지에 추가할 수 없으면 페이지를 나누고 새로운 페이지로 이동
        pages.push(currentPage);
        currentPage = { words: [], counts: [] };
        currentLines = 0;
      }

      // 현재 페이지에 단어와 개수를 추가
      currentPage.words.push(word);
      currentPage.counts.push(countsArray[index]);
      currentLines += 1; // 한 줄 추가
    });

    // 마지막 페이지 추가
    if (currentPage.words.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  };

  // wordsArray와 countsArray를 이용하여 페이지 생성
  const pages = splitIntoPagesByLines(wordsArray, countsArray, 70); // 예를 들어 36줄로 페이지를 나눔

  return (
    <Box ref={ref}>
      {pages.map((page, pageIndex) => {
        const halfIndex = Math.ceil(page.words.length / 2); // 반으로 나눌 기준점

        // 첫 번째 칼럼과 두 번째 칼럼에 들어갈 데이터 분리
        const firstColumnWords = page.words.slice(0, halfIndex);
        const firstColumnCounts = page.counts.slice(0, halfIndex);
        const secondColumnWords = page.words.slice(halfIndex);
        const secondColumnCounts = page.counts.slice(halfIndex);

        return (
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
              breakInside: "avoid",
              aspectRatio: "794 / 1123",
            }}
          >
            <Paper
              elevation={3}
              sx={{ padding: 4, height: "93%", border: "3px solid #4b2354" }}
            >
              <Box className="header-section" sx={{ marginBottom: 4 }}>
                {/* Title Section */}
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
                            sx={{
                              fontSize: "20px",
                              fontFamily: "Noto Sans KR",
                            }}
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
                            sx={{
                              fontSize: "20px",
                              fontFamily: "Noto Sans KR",
                            }}
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
                  className="kla-report-page6-analysis-result"
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
                          colSpan="2"
                          style={{
                            fontSize: "20px",
                            backgroundColor: "#f0f0f0",
                            border: "none",
                            textAlign: "left",
                          }}
                        >
                          낱말 목록
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            width: "50%",
                            verticalAlign: "top",
                            paddingRight: "20px",
                          }}
                        >
                          {/* 첫 번째 칼럼 */}
                          <table style={{ width: "100%" }}>
                            <tbody>
                              {firstColumnWords.map((word, index) => (
                                <tr key={index}>
                                  <td
                                    style={{
                                      fontSize: "12px",
                                      backgroundColor: "#ffffff",
                                      borderBottom: "1px solid #d3d3d3",
                                      textAlign: "left",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    {word}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: "12px",
                                      backgroundColor: "#ffffff",
                                      borderBottom: "1px solid #d3d3d3",
                                      textAlign: "center",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    {firstColumnCounts[index]}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                        <td
                          style={{
                            width: "50%",
                            verticalAlign: "top",
                            paddingLeft: "20px",
                          }}
                        >
                          {/* 두 번째 칼럼 */}
                          <table style={{ width: "100%" }}>
                            <tbody>
                              {secondColumnWords.map((word, index) => (
                                <tr key={index}>
                                  <td
                                    style={{
                                      fontSize: "12px",
                                      backgroundColor: "#ffffff",
                                      borderBottom: "1px solid #d3d3d3",
                                      textAlign: "left",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    {word}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: "12px",
                                      backgroundColor: "#ffffff",
                                      borderBottom: "1px solid #d3d3d3",
                                      textAlign: "center",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    {secondColumnCounts[index]}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Box>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
});

export default KLAReportPage6;
