import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { H1, H2, H3, H4 } from "../../component/Typography";
import { Col, Descriptions, Divider, Pagination, Row, Space } from "antd";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { PrimaryButton, SecondaryButton } from "../../component/Button";
import axios from "axios";

const convertToRtfUnicode = (text) => {
  return text
    .split("")
    .map((char) => `\\u${char.charCodeAt(0)}`)
    .join("");
};

const formatExamDate = (examDate) => {
  const date = new Date(examDate.$d); // dayjs 객체에서 실제 Date 객체를 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 두 자리로 맞추기
  const day = String(date.getDate()).padStart(2, "0"); // 일을 두 자리로 맞추기

  // YYYY-MM-DD 형식으로 반환
  return `${year}-${month}-${day}`;
};

function Analysis(props) {
  const location = useLocation();
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
  const [rtfContent, setRtfContent] = useState(null);
  const [htmlContent, setHtmlContent] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("location.state:", location.state);
    if (location.state) {
      insertDataToFile(location.state);
    }
  }, [location.state]); // location.state가 변경될 때마다 호출

  // 여러 템플릿 변수에 데이터를 삽입하는 함수
  const insertDataToFile = async (data) => {
    try {
      const response = await fetch("/template.rtf");
      const content = await response.text();

      // 템플릿 내 변수들에 해당 데이터를 삽입
      let updatedContent = content;

      // 여러 변수를 하나씩 처리 (여기서는 예시로 CHILDENNAME, PARENTSNAME을 사용)
      updatedContent = updatedContent.replace(
        "{LOCATION}",
        convertToRtfUnicode(data.info.region)
      );
      updatedContent = updatedContent.replace(
        "{ORGANIZE}",
        convertToRtfUnicode(data.info.institution)
      );
      updatedContent = updatedContent.replace(
        "{TEACHERNAME}",
        convertToRtfUnicode(data.info.examiner)
      );
      updatedContent = updatedContent.replace(
        "{DATE}",
        formatExamDate(data.info.examdate)
      );
      updatedContent = updatedContent.replace(
        "{GENDER}",
        convertToRtfUnicode(data.info.gender)
      );
      updatedContent = updatedContent.replace(
        "{CHILDENNAME}",
        convertToRtfUnicode(data.info.name)
      );
      updatedContent = updatedContent.replace(
        "{TOTALSCORE}",
        data.categoryAScore + data.categoryBScore
      );
      updatedContent = updatedContent.replace("{SCOREA}", data.categoryAScore);
      updatedContent = updatedContent.replace("{SCOREB}", data.categoryBScore);

      setRtfContent(updatedContent); // 업데이트된 RTF 콘텐츠 상태에 설정

      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/convert-rtf`, {
          data: { ...data, examdate: formatExamDate(data.info.examdate) },
        })
        .then((response) => {
          console.log("RTF 변환 결과:", response.data);
          setHtmlContent(response.data);
        })
        .catch((error) => {
          console.log("RTF 변환 오류:", error);
        });

      // console.log("updatedContent:", updatedContent);
    } catch (error) {
      console.error("파일 로드 실패:", error);
    }
  };

  const downloadRTF = () => {
    if (!rtfContent) {
      console.error("RTF 콘텐츠가 없습니다.");
      return;
    }

    // RTF 파일을 Blob으로 생성하여 다운로드
    const blob = new Blob([rtfContent], { type: "application/rtf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.rtf"; // 다운로드 파일 이름
    link.click(); // 자동으로 다운로드 시작
    URL.revokeObjectURL(link.href); // 메모리 해제
  };

  return (
    <PageContainer>
      <H3>결과 요약</H3>
      <Row style={{ alignItems: "center" }}>
        <Col span={8}>
          <TableHeader>총점</TableHeader>
        </Col>
        <Col span={16}>
          <TableHeader>영역별 세부점수</TableHeader>
        </Col>
        <Col span={8}>
          <TableDescriptions
            style={{ height: "96px", backgroundColor: "rgb(52, 199, 89, 0.1)" }}
          >
            양호
          </TableDescriptions>
        </Col>
        <Col span={16}>
          <Row>
            <Col span={12}>
              <TableDescriptions style={{ fontWeight: "bold" }}>
                언어 이해 및 표현
              </TableDescriptions>
            </Col>
            <Col span={12}>
              <TableDescriptions style={{ fontWeight: "bold" }}>
                말 및 문해
              </TableDescriptions>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <TableDescriptions
                style={{ backgroundColor: "rgb(52, 199, 89, 0.1)" }}
              >
                양호
              </TableDescriptions>
            </Col>
            <Col span={12}>
              <TableDescriptions
                style={{ backgroundColor: "rgb(52, 199, 89, 0.1)" }}
              >
                양호
              </TableDescriptions>
            </Col>
          </Row>
        </Col>
      </Row>

      <IndicatorContainer isMobile={isMobile}>
        <SideComponent align="flex-start" style={{ width: "100%" }}>
          <H4>report.rtf</H4>
        </SideComponent>

        <SideComponent>
          <Space
            style={{
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <PrimaryButton size="large" onClick={downloadRTF}>
              RTF 내려받기
            </PrimaryButton>
          </Space>
        </SideComponent>
      </IndicatorContainer>

      <PreviewContainer
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        style={{
          textAlign: "left",
          padding: "24px",
          border: "1px solid black",
        }}
      />
    </PageContainer>
  );
}

const PreviewContainer = styled.div``;

const PageContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  padding: 64px 24px;
  box-sizing: border-box;
  max-width: 880px;
  margin: 0 auto;
  gap: 24px;
`;

const TableHeader = styled.div`
  height: 48px;
  background-color: var(--bg-light);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const TableDescriptions = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 24px;
  box-sizing: border-box;
  background-color: var(--bg-disable);
  gap: 16px;
`;

const SideComponent = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${({ align }) => align || "flex-start"};
  width: 100%;
`;

export default Analysis;
