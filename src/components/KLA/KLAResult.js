import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analyzeText } from "./process_transcription";
import { Box, Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import KLAReportPage2 from "./KLAReportPage2";
import KLAReportPage3 from "./KLAReportPage3";
import KLAReportPage4 from "./KLAReportPage4";
import KLAReportPage6 from "./KLAReportPage6";
import KLAReportPage7 from "./KLAReportPage7";
import KLAReportPage8 from "./KLAReportPage8";
import KLAReportPage9 from "./KLAReportPage9";

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
  formData.append("client_birthday", analysisData.info.birthday); // 생년월일
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
  console.log("user:", user);

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

  useEffect(() => {
    if (inputText) {
      const result = analyzeText(inputText);
      setAnalysis(result);
    }
  }, [inputText]);

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

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;

    const allRefs = [
      pageRefs2.current,
      pageRefs3.current,
      pageRefs4.current,
      ...pageRefs6.current,
      ...pageRefs7.current,
      ...pageRefs8.current,
      ...pageRefs9.current,
    ];

    const canvases = await Promise.all(
      allRefs.map((ref) => {
        if (ref) {
          return html2canvas(ref, {
            scale: 2,
            useCORS: true,
            logging: true,
            windowWidth: ref.scrollWidth,
            windowHeight: ref.scrollHeight,
          });
        }
        return Promise.resolve(null);
      })
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
    <Box sx={{ padding: 3, height: "100vh", overflowY: "auto" }}>
      {/* PDF 다운로드 버튼 */}
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={downloadPDF}>
          PDF로 다운로드
        </Button>
        {/* 저장하기 버튼 */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
          sx={{ ml: 2 }} // 버튼 간격 추가
        >
          저장하기
        </Button>
      </Box>
      <Box>
        {/* ref 배열을 통해 각 페이지에 ref를 설정 */}
        <KLAReportPage2 ref={pageRefs2} customData={analysis} />
        <KLAReportPage3 ref={pageRefs3} customData={analysis} />
        <KLAReportPage4 ref={pageRefs4} customData={analysis} />
        <KLAReportPage6 ref={pageRefs6} customData={analysis} />
        <KLAReportPage7 ref={pageRefs7} customData={analysis} />
        <KLAReportPage8 ref={pageRefs8} customData={analysis} />
        <KLAReportPage9 ref={pageRefs9} customData={analysis} />
      </Box>
    </Box>
  );
}

export default KLAResult;
