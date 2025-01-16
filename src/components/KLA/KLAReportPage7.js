import React, { forwardRef } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const KLAReportPage7 = forwardRef(({ customData }, ref) => {
  const groupedMorphemesArray = [];
  console.log("grams_order:", customData.grams_order[0]);

  customData.grams_order[0].forEach((morphemeList, index) => {
    console.log("morphemeList:", morphemeList);
    console.log("index:", index);
    groupedMorphemesArray.push(`${index}번째 나온 문법형태소`);
    morphemeList.forEach((morpheme, morphemeIdx) => {
      const count = customData.grams_order_count[0][index][morphemeIdx];
      groupedMorphemesArray.push([morpheme, count]);
    });
    groupedMorphemesArray.push([]);
  });

  // 페이지를 나누기 위한 함수
  const splitIntoPagesByLines = (array, maxLinesPerPage) => {
    const pages = [];
    let currentLines = 0;
    let currentPage = [];

    array.forEach((item) => {
      if (currentLines + 1 > maxLinesPerPage) {
        pages.push(currentPage);
        currentPage = [];
        currentLines = 0;
      }
      currentPage.push(item);
      currentLines += 1;
    });

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  };

  const pages = splitIntoPagesByLines(groupedMorphemesArray, 60);

  return (
    <Box ref={ref}>
      {pages.map((page, pageIndex) => {
        const halfIndex = Math.ceil(page.length / 2);

        // 각 페이지를 두 칼럼으로 분리
        const firstColumn = page.slice(0, halfIndex);
        const secondColumn = page.slice(halfIndex);

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
            }}
          >
            <Paper
              elevation={3}
              sx={{ padding: 4, height: "93%", border: "3px solid #4b2354" }}
            >
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

                {/* 문법형태소 목록 */}
                <Box
                  className="kla-report-page7-analysis-result"
                  sx={{ marginBottom: 4 }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontFamily: "Noto Sans KR", marginBottom: 2 }}
                  >
                    문법형태소 목록
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
                          style={{
                            width: "50%",
                            verticalAlign: "top",
                            paddingRight: "20px",
                          }}
                        >
                          <table style={{ width: "100%" }}>
                            <tbody>
                              {firstColumn.map((item, index) => (
                                <tr key={`first-${index}`}>
                                  {typeof item === "string" ? (
                                    <td
                                      colSpan="2"
                                      style={{
                                        fontSize: "12px",
                                        backgroundColor: "#f0f0f0", // 회색 배경
                                        borderBottom: "1px solid #d3d3d3",
                                        textAlign: "left",
                                        verticalAlign: "middle",
                                        paddingLeft: "0px",
                                      }}
                                    >
                                      {item}
                                    </td>
                                  ) : (
                                    <>
                                      <td
                                        style={{
                                          fontSize: "12px",
                                          backgroundColor: "#ffffff",
                                          borderBottom: "1px solid #d3d3d3",
                                          textAlign: "left",
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {item[0]}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: "12px",
                                          backgroundColor: "#ffffff",
                                          borderBottom: "1px solid #d3d3d3",
                                          textAlign: "right",
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {item[1]}
                                      </td>
                                    </>
                                  )}
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
                          <table style={{ width: "100%" }}>
                            <tbody>
                              {secondColumn.map((item, index) => (
                                <tr key={`second-${index}`}>
                                  {typeof item === "string" ? (
                                    <td
                                      colSpan="2"
                                      style={{
                                        fontSize: "12px",
                                        backgroundColor: "#f0f0f0", // 회색 배경
                                        borderBottom: "1px solid #d3d3d3",
                                        textAlign: "left",
                                        verticalAlign: "middle",
                                        paddingLeft: "0px",
                                      }}
                                    >
                                      {item}
                                    </td>
                                  ) : (
                                    <>
                                      <td
                                        style={{
                                          fontSize: "12px",
                                          backgroundColor: "#ffffff",
                                          borderBottom: "1px solid #d3d3d3",
                                          textAlign: "left",
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {item[0]}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: "12px",
                                          backgroundColor: "#ffffff",
                                          borderBottom: "1px solid #d3d3d3",
                                          textAlign: "right",
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {item[1]}
                                      </td>
                                    </>
                                  )}
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

export default KLAReportPage7;
