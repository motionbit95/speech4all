import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaTrash, FaFilePdf, FaDownload } from "react-icons/fa";
import "../../components/KLA/KLAHistory.css";
import { PageHeader } from "../../component/Header";
import { Button, Pagination, Select, Space, Table } from "antd";
import styled from "styled-components";

function History({ user }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);

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
    <PageContainer>
      <PageHeader title="분석 기록">
        <Select
          defaultValue="10"
          onChange={(value) => setPageSize(value)}
          style={{ width: 120 }}
        >
          <Select.Option value="10">10개씩 보기</Select.Option>
          <Select.Option value="20">20개씩 보기</Select.Option>
          <Select.Option value="30">30개씩 보기</Select.Option>
          <Select.Option value="40">40개씩 보기</Select.Option>
          <Select.Option value="50">50개씩 보기</Select.Option>
        </Select>
      </PageHeader>
      <TableContainer>
        <Table
          dataSource={history}
          columns={[
            {
              title: "이름",
              dataIndex: "client_name",
              key: "client_name",
            },
            {
              title: "성별",
              dataIndex: "client_gender",
              key: "client_gender",
            },
            {
              title: "생년월일",
              dataIndex: "client_birthday",
              key: "client_birthday",
            },
            {
              title: "분석일",
              dataIndex: "analysis_date",
              key: "analysis_date",
            },
            {
              title: "보고서",
              dataIndex: "pdf_path",
              key: "pdf_path",
              render: (text, record) =>
                record.pdf_path ? (
                  <Space
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDownloadPDF(record)}
                  >
                    <FaFilePdf color="var(--text-secondary)" />
                    <span>{`${record.client_name}_report.pdf`}</span>
                  </Space>
                ) : (
                  <span style={{ color: "var(--text-secondary)" }}>
                    파일이 없습니다.
                  </span>
                ),
            },
            {
              title: "삭제",
              dataIndex: "id",
              key: "id",
              render: (_, record) => {
                return (
                  <Button
                    type="link"
                    danger
                    style={{ padding: 0 }}
                    onClick={() => handleDelete(record.id)}
                  >
                    <FaTrash />
                  </Button>
                );
              },
            },
          ]}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: false,
            style: { justifyContent: "center" },
          }}
        />
      </TableContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-body);
  max-width: 1280px;
  margin: 0 auto;
  gap: 16px;
`;

const TableContainer = styled.div`
  padding: 20px;
  background-color: var(--bg-body);
  box-sizing: border-box;
`;

export default History;
