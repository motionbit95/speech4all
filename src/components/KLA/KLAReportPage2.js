import React, { forwardRef } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

const KLAReportPage2 = forwardRef(({ customData }, ref) => {
  // features_td와 features_ssd를 가져와 텍스트로 변환
  const similarFeatures =
    customData.features_td && customData.features_td.length > 0
      ? customData.features_td.join(", ")
      : "없음";

  const delayedFeatures =
    customData.features_ssd && customData.features_ssd.length > 0
      ? customData.features_ssd.join(", ")
      : "없음";

  return (
    <Box
      ref={ref}
      sx={{
        width: "794px", // A4 width in pixels
        height: "1123px", // A4 height in pixels
        padding: 3,
        backgroundColor: "white",
        boxShadow: 3, // 그림자 추가
        margin: "20px",
        aspectRatio: "794 / 1123",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, height: "93%", border: "3px solid #4b2354" }}
      >
        {/* 버건디색 테두리 */}
        {/* 이미지 추가 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <img
            src="/logo_KLAReport.png"
            alt="KLA Report Logo"
            style={{ width: "100%", maxWidth: "794px", height: "auto" }}
          />
        </Box>
        <Box sx={{ marginBottom: 10 }}>
          <Typography
            variant="h6"
            sx={{ fontSize: "20px", fontFamily: "Noto Sans KR" }}
          >
            대상 | 3세 ~ 초등학교 6학년
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: "20px", fontFamily: "Noto Sans KR" }}
          >
            연구개발 | 배소영 · 하승희 · 소정민
          </Typography>
        </Box>
        {/* 사용자 정보 테이블 */}
        <TableContainer
          component={Paper}
          sx={{ marginBottom: 6, border: "none", boxShadow: "none" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {/* 사용자 정보 표시 */}
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#E6E0F8",
                    width: "20%",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  이름
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    width: "30%",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  {customData.info.name}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "white",
                    width: "2%",
                    padding: 0,
                    border: "none",
                  }}
                />
                {/* 흰색 간격 추가 */}
                <TableCell
                  sx={{
                    backgroundColor: "#E6E0F8",
                    width: "20%",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  성별
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    width: "30%",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  {customData.info.gender}
                </TableCell>
              </TableRow>
              {/* 공백 추가 */}
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "white",
                    height: "10px",
                    padding: 0,
                    border: "none",
                  }}
                  colSpan={5}
                />
              </TableRow>
              {/* 검사일과 생년월일 */}
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#E6E0F8",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  검사일
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  {customData.info.examdate}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "white",
                    width: "2%",
                    padding: 0,
                    border: "none",
                  }}
                />
                <TableCell
                  sx={{
                    backgroundColor: "#E6E0F8",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  생년월일
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  {customData.info.birthday}
                </TableCell>
              </TableRow>
              {/* 공백 추가 */}
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "white",
                    height: "10px",
                    padding: 0,
                    border: "none",
                  }}
                  colSpan={5}
                />
              </TableRow>

              {/* 생활연령과 검사자 */}
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#E6E0F8",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  생활연령
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  만 {customData.info.age_years}세 {customData.info.age_months}
                  개월
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "white",
                    width: "2%",
                    padding: 0,
                    border: "none",
                  }}
                />
                <TableCell
                  sx={{
                    backgroundColor: "#E6E0F8",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  검사자
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  {customData.info.examiner}
                </TableCell>
              </TableRow>
              {/* 공백 추가 */}
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "white",
                    height: "10px",
                    padding: 0,
                    border: "none",
                  }}
                  colSpan={5}
                />
              </TableRow>

              {/* 교육기관과 학년 */}
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#E6E0F8",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  교육기관
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  {customData.info.school}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "white",
                    width: "2%",
                    padding: 0,
                    border: "none",
                  }}
                />
                <TableCell
                  sx={{
                    backgroundColor: "#E6E0F8",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  학년
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  {customData.info.grade}
                </TableCell>
              </TableRow>
              {/* 공백 추가 */}
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "white",
                    height: "10px",
                    padding: 0,
                    border: "none",
                  }}
                  colSpan={5}
                />
              </TableRow>

              {/* 평가지역과 평가기관 */}
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#E6E0F8",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  평가지역
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  {customData.info.region}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "white",
                    width: "2%",
                    padding: 0,
                    border: "none",
                  }}
                />
                <TableCell
                  sx={{
                    backgroundColor: "#E6E0F8",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  평가기관
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    border: "none",
                    padding: "6px 6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "20px",
                  }}
                >
                  {customData.info.institution}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* 또래 아동과 유사한 측정치 / 지연된 측정치 테이블 */}
        <TableContainer
          component={Paper}
          sx={{ border: "1px solid black", marginBottom: 2 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "18px",
                    fontFamily: "Noto Sans KR",
                    textAlign: "left",
                    verticalAlign: "top",
                    border: "1px solid black", // 검은색 테두리
                    padding: "8px", // 적절한 패딩 설정
                    height: "200px",
                    width: "50%", // 50%로 고정
                  }}
                >
                  또래 아동과 유사한 측정치
                  <Typography sx={{ fontSize: "16px", marginTop: 2 }}>
                    {similarFeatures}
                  </Typography>
                  {/* features_td 내용 추가 */}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "18px",
                    fontFamily: "Noto Sans KR",
                    textAlign: "left",
                    verticalAlign: "top",
                    border: "1px solid black", // 검은색 테두리
                    padding: "8px", // 적절한 패딩 설정
                    height: "200px",
                    width: "50%", // 50%로 고정
                  }}
                >
                  또래 아동에 비해 지연된 측정치
                  <Typography sx={{ fontSize: "16px", marginTop: 2 }}>
                    {delayedFeatures}
                  </Typography>
                  {/* features_ssd 내용 추가 */}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* 임상적 인상 */}
        <TableContainer
          component={Paper}
          sx={{ border: "1px solid black", marginBottom: 4 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "18px",
                    fontFamily: "Noto Sans KR",
                    textAlign: "left",
                    verticalAlign: "top",
                    border: "1px solid black", // 검은색 테두리
                    padding: "8px", // 적절한 패딩 설정
                    height: "120px",
                  }}
                >
                  결과 요약 및 임상적 권고사항
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
});

export default KLAReportPage2;
