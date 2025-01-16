import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaTrash, FaFilePdf } from "react-icons/fa";
import "./KLAHistory.css";

function KLAHistory({ user }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 기록 불러오기 함수
  const fetchHistory = useCallback(async () => {
    if (!user || !user.id) {
      console.error("User is not logged in", user, user?.id);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/history`,
        {
          params: { user_id: user.id },
          withCredentials: true,
        }
      );
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // 삭제 함수
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/history/${id}`,
        {
          withCredentials: true,
        }
      );
      alert("삭제되었습니다.");
      fetchHistory(); // 삭제 후 기록 갱신
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  // PDF 다운로드 함수
  const handleDownloadPDF = async (record) => {
    if (!record.pdf_path) {
      alert("PDF 파일이 존재하지 않습니다.");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/downloadPDF/${record.id}`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${record.client_name}_report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("PDF 다운로드에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="kla-history">
      <h2>분석 기록</h2>
      {history.length > 0 ? (
        <table className="history-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>성별</th>
              <th>생년월일</th>
              <th>분석일</th>
              <th>보고서</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record.id}>
                <td>{record.client_name}</td>
                <td>{record.client_gender}</td>
                <td>{record.client_birthday}</td>
                <td>{record.analysis_date}</td>
                <td>
                  {record.pdf_path ? (
                    <FaFilePdf
                      className="pdf-icon"
                      title="PDF 다운로드"
                      onClick={() => handleDownloadPDF(record)}
                    />
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td>
                  <FaTrash
                    className="delete-icon"
                    title="삭제"
                    onClick={() => handleDelete(record.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>분석 기록이 없습니다.</p>
      )}
    </div>
  );
}

export default KLAHistory;
