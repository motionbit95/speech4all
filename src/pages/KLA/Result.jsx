import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analyzeText } from "../../components/KLA/process_transcription";
import { Box, Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import KLAReportPage2 from "../../components/KLA/KLAReportPage2";
import KLAReportPage3 from "../../components/KLA/KLAReportPage3";
import KLAReportPage4 from "../../components/KLA/KLAReportPage4";
import KLAReportPage6 from "../../components/KLA/KLAReportPage6";
import KLAReportPage7 from "../../components/KLA/KLAReportPage7";
import KLAReportPage8 from "../../components/KLA/KLAReportPage8";
import KLAReportPage9 from "../../components/KLA/KLAReportPage9";
import { Col, Image, Pagination, Space, Typography } from "antd";
import styled from "styled-components";
import { PageHeader } from "../../component/Header";
import { H1, H4 } from "../../component/Typography";
import { PrimaryButton, SecondaryButton } from "../../component/Button";
import { useMediaQuery } from "react-responsive";

// 서버에 분석 결과와 PDF를 저장하는 함수
const saveAnalysisToServer = async (
  userId,
  analysisData,
  inputText,
  pdfBlob
) => {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("client_name", analysisData.info.name);
  formData.append("client_birthday", analysisData.info.birthday);
  formData.append("client_gender", analysisData.info.gender);
  formData.append("analysis_date", analysisData.info.examdate);
  formData.append("input_text", inputText);
  formData.append("analysis_result", JSON.stringify(analysisData));
  formData.append("pdf_path", pdfBlob, `${analysisData.info.name}_report.pdf`);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/saveAnalysis`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      alert("분석 결과가 성공적으로 저장되었습니다!");
    } else {
      throw new Error("저장에 실패했습니다.");
    }
  } catch (error) {
    console.error("Error saving analysis:", error);
    alert("저장 중 오류가 발생했습니다.");
  }
};

function KLAResult() {
  const location = useLocation();
  const { inputText, user } = location.state || { inputText: "", user: null };

  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

  const [currentPage, setCurrentPage] = useState(1);
  const [analysis, setAnalysis] = useState({
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
      age_years: 0,
      age_months: 0,
      utteranceType: "",
    },
    mlu_w: [0, 0, 0, 0],
    mlu_m: [0, 0, 0, 0],
    num_gram_types: [0, 0, 0, 0],
    num_gram_tokens: [0, 0, 0, 0],
    num_morp_types: [0, 0, 0, 0],
    num_morp_tokens: [0, 0, 0, 0],
    ratio_gram: [0, 0, 0, 0],
    ratio_morp: [0, 0, 0, 0],
    num_word_types: [0, 0, 0, 0],
    num_word_tokens: [0, 0, 0, 0],
    ratio_word: [0, 0, 0, 0],
    num_line_total: [0, 0, 0, 0],
    num_line_unknown: [0, 0, 0, 0],
    num_line_partial: [0, 0, 0, 0],
    num_line_known: [0, 0, 0, 0],
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
    mlu_w_pos: 0.0,
    mlu_m_pos: 0.0,
    num_gram_types_pos: 0.0,
    num_graph_tokens_pos: 0.0,
    num_morp_types_pos: 0.0,
    num_morp_tokens_pos: 0.0,
    ratio_gram_pos: 0.0,
    ratio_morp_pos: 0.0,
    num_word_types_pos: 0.0,
    num_word_tokens_pos: 0.0,
    ratio_word_pos: 0.0,
  });
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (inputText) {
      const result = analyzeText(inputText);
      setAnalysis(result);
    }
  }, [inputText]);

  const thumbnailRefs2 = useRef();
  const thumbnailRefs3 = useRef();
  const thumbnailRefs4 = useRef();
  const thumbnailRefs6 = useRef([]); // 배열 형태로 초기화
  const thumbnailRefs7 = useRef([]);
  const thumbnailRefs8 = useRef([]);
  const thumbnailRefs9 = useRef([]);

  const pageRefs2 = useRef();
  const pageRefs3 = useRef();
  const pageRefs4 = useRef();
  const pageRefs6 = useRef([]); // 배열 형태로 초기화
  const pageRefs7 = useRef([]);
  const pageRefs8 = useRef([]);
  const pageRefs9 = useRef([]);

  useEffect(() => {
    [pageRefs6, pageRefs7, pageRefs8, pageRefs9].forEach((ref) => {
      if (!Array.isArray(ref.current)) {
        ref.current = [];
      }
    });

    // 컴포넌트 언마운트 시 ref 배열 초기화
    return () => {
      pageRefs6.current = [];
      pageRefs7.current = [];
      pageRefs8.current = [];
      pageRefs9.current = [];
    };
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generatePDF = async () => {
    setIsExporting(true);
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;

    // Wait for a brief moment to ensure elements are ready
    await delay(500);

    const allRefs = [
      pageRefs2.current,
      pageRefs3.current,
      pageRefs4.current,
      ...pageRefs6.current,
      ...pageRefs7.current,
      ...pageRefs8.current,
      ...pageRefs9.current,
    ];

    try {
      const canvases = await Promise.all(
        allRefs.map((ref) =>
          ref
            ? html2canvas(ref, {
                scale: 2,
                useCORS: true,
                logging: true,
                windowWidth: ref.scrollWidth,
                windowHeight: ref.scrollHeight,
              })
            : Promise.resolve(null)
        )
      );

      canvases.forEach((canvas, index) => {
        if (canvas) {
          const imgData = canvas.toDataURL("image/jpeg", 0.75);
          const imgWidth = pdfWidth;
          const imgHeight = (canvas.height * pdfWidth) / canvas.width;

          if (index > 0) {
            pdf.addPage();
          }
          pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        }
      });

      return pdf;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return null;
    } finally {
      setIsExporting(false);
    }
  };

  const downloadPDF = async () => {
    const pdf = await generatePDF();
    pdf.save("report.pdf");
  };

  const handleSave = async () => {
    if (user && user.id) {
      const pdf = await generatePDF();
      const pdfBlob = pdf.output("blob");
      await saveAnalysisToServer(user.id, analysis, inputText, pdfBlob);
    } else {
      alert("사용자 정보가 없습니다. 저장할 수 없습니다.");
    }
  };

  return (
    <div>
      <PageHeader title="결과 보고서" />

      <IndicatorContainer isMobile={isMobile}>
        <SideComponent align="flex-start" style={{ width: "100%" }}>
          <H4>report.pdf</H4>
        </SideComponent>

        <PaginationWrapper isMobile={isMobile}>
          <Pagination
            simple
            defaultCurrent={1}
            total={7} // Update this to reflect the actual number of pages you have
            pageSize={1}
            hideOnSinglePage
            onChange={(page) => setCurrentPage(page)}
          />
        </PaginationWrapper>

        <SideComponent>
          <Space
            style={{
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <SecondaryButton size="large" onClick={handleSave}>
              저장하기
            </SecondaryButton>
            <PrimaryButton size="large" onClick={downloadPDF}>
              PDF 내려받기
            </PrimaryButton>
          </Space>
        </SideComponent>
      </IndicatorContainer>

      <PageContainer>
        <Col
          span={isMobile ? 24 : 6}
          style={{
            maxWidth: isMobile ? "100%" : "300px",
          }}
        >
          <PreviewContainer
            isMobile={isMobile}
            scale={isMobile ? 0.4 : 0.3}
            direction="vertical"
          >
            <PreviewWrapper
              onClick={() => setCurrentPage(1)}
              isSelected={currentPage === 1}
            >
              <KLAReportPage2 ref={thumbnailRefs2} customData={analysis} />
            </PreviewWrapper>
            <PreviewWrapper
              onClick={() => setCurrentPage(2)}
              isSelected={currentPage === 2}
            >
              <KLAReportPage3 ref={thumbnailRefs3} customData={analysis} />
            </PreviewWrapper>
            <PreviewWrapper
              onClick={() => setCurrentPage(3)}
              isSelected={currentPage === 3}
            >
              <KLAReportPage4 ref={thumbnailRefs4} customData={analysis} />
            </PreviewWrapper>
            <PreviewWrapper
              onClick={() => setCurrentPage(4)}
              isSelected={currentPage === 4}
            >
              <KLAReportPage6 ref={thumbnailRefs6} customData={analysis} />
            </PreviewWrapper>
            <PreviewWrapper
              onClick={() => setCurrentPage(5)}
              isSelected={currentPage === 5}
            >
              <KLAReportPage7 ref={thumbnailRefs7} customData={analysis} />
            </PreviewWrapper>
            <PreviewWrapper
              onClick={() => setCurrentPage(6)}
              isSelected={currentPage === 6}
            >
              <KLAReportPage8 ref={thumbnailRefs8} customData={analysis} />
            </PreviewWrapper>
            <PreviewWrapper
              onClick={() => setCurrentPage(7)}
              isSelected={currentPage === 7}
            >
              <KLAReportPage9 ref={thumbnailRefs9} customData={analysis} />
            </PreviewWrapper>
          </PreviewContainer>
        </Col>

        <Col span={18} style={{ display: isMobile ? "none" : "block" }}>
          <DetailContainer>
            <DetailWrapper
              isSelect={currentPage === 1}
              isExporting={isExporting}
            >
              <KLAReportPage2 ref={pageRefs2} customData={analysis} />
            </DetailWrapper>
            <DetailWrapper
              isSelect={currentPage === 2}
              isExporting={isExporting}
            >
              <KLAReportPage3 ref={pageRefs3} customData={analysis} />
            </DetailWrapper>
            <DetailWrapper
              isSelect={currentPage === 3}
              isExporting={isExporting}
            >
              <KLAReportPage4 ref={pageRefs4} customData={analysis} />
            </DetailWrapper>
            <DetailWrapper
              isSelect={currentPage === 4}
              isExporting={isExporting}
            >
              <KLAReportPage6 ref={pageRefs6} customData={analysis} />
            </DetailWrapper>
            <DetailWrapper
              isSelect={currentPage === 5}
              isExporting={isExporting}
            >
              <KLAReportPage7 ref={pageRefs7} customData={analysis} />
            </DetailWrapper>
            <DetailWrapper
              isSelect={currentPage === 6}
              isExporting={isExporting}
            >
              <KLAReportPage8 ref={pageRefs8} customData={analysis} />
            </DetailWrapper>
            <DetailWrapper
              isSelect={currentPage === 7}
              isExporting={isExporting}
            >
              <KLAReportPage9 ref={pageRefs9} customData={analysis} />
            </DetailWrapper>
          </DetailContainer>
        </Col>
      </PageContainer>
    </div>
  );
}

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

const PaginationWrapper = styled.div`
  flex: 2;
  display: ${(isMobile) => (isMobile ? "none" : "flex")};
  justify-content: center;
`;

const PageContainer = styled.div`
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  gap: 16px;

  height: 100vh;

  overflow: scroll;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  transform-origin: top left;
  transform: scale(${(props) => props.scale});
  width: calc(100% * (1 / ${(props) => props.scale}));
  align-items: center;
  height: ${({ scale, isMobile }) =>
    isMobile ? "100%" : (1123 + 120) * (1 / scale)}px;);
  overflow: ${({ isMobile }) => (isMobile ? "auto" : "scroll")};

  minwidth: 300px;
`;

const PreviewWrapper = styled.div`
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? "var(--bg-primary)" : "transparent"};
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  height: ${(props) => (1123 + 120) * (1 / props.scale)}px;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DetailWrapper = styled.div`
  display: flex;
  visibility: ${({ isExporting, isSelect }) =>
    isExporting || isSelect
      ? "visible"
      : "hidden"}; // Only visible when exporting or selected
  position: absolute; // Prevent layout shifts
`;

export default KLAResult;
