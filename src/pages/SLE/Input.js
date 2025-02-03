import React, { useState, useEffect } from "react";
import { Table, Checkbox, Typography, Space, Alert, Progress } from "antd";
import styled from "styled-components";
import surveyData from "./question.json"; // Import JSON file directly
import { useMediaQuery } from "react-responsive";
import { H3 } from "../../component/Typography";
import { PageHeader } from "../../component/Header";
import { PrimaryButton, SecondaryButton } from "../../component/Button";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

// Create a styled Checkbox component to show a check mark inside the box
const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border-color: var(--border-disable); /* Set the border color */
  }

  /* When checked, change the border color */
  .ant-checkbox-input:checked + .ant-checkbox-inner {
    border-color: var(--fg-primary); /* Set the border color when checked */
    background-color: var(--fg-primary);
  }

  /* When hovered, add a subtle border effect */
  .ant-checkbox-inner:hover {
    border-color: var(--fg-primary);
  }
`;

const Input = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});

  useEffect(() => {
    console.log("surveyData:", surveyData);
  }, []);

  const handleSelect = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const totalScore = Object.values(responses).reduce(
    (acc, score) => acc + score,
    0
  );

  // Split questions into two categories: A and B
  const categoryAQuestions = surveyData.questions.filter(
    (q) => q.category === "언어 이해 및 표현"
  );
  const categoryBQuestions = surveyData.questions.filter(
    (q) => q.category === "말 및 문해"
  );

  const totalQuestions = surveyData.questions.length;
  const answeredQuestions = Object.keys(responses).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "질문",
      dataIndex: "question",
      key: "question",
      render: (text, record) => (
        <Space direction="vertical">
          <Text strong>{text}</Text>
          {record.example && (
            <Text type="secondary">
              {"예)"} {record.example}
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: "예",
      key: "yes",
      width: 100,
      hidden: !isDesktop,
      render: (_, record) => (
        <CustomCheckbox
          checked={responses[record.id] === record.answers.yes}
          onChange={() => handleSelect(record.id, record.answers.yes)}
        ></CustomCheckbox>
      ),
    },
    {
      title: "아니요",
      key: "no",
      width: 100,
      hidden: !isDesktop,
      render: (_, record) => (
        <CustomCheckbox
          checked={responses[record.id] === record.answers.no}
          onChange={() => handleSelect(record.id, record.answers.no)}
        ></CustomCheckbox>
      ),
    },
    {
      title: "모르겠음",
      key: "unknown",
      width: 100,
      hidden: !isDesktop,
      render: (_, record) => (
        <CustomCheckbox
          checked={responses[record.id] === record.answers.unknown}
          onChange={() => handleSelect(record.id, record.answers.unknown)}
        ></CustomCheckbox>
      ),
    },
    {
      title: "응답",
      key: "answers",
      width: 150,
      hidden: isDesktop,
      render: (_, record) => (
        <Checkbox.Group
          onChange={(e) => handleSelect(record.id, e.target.value)}
          value={responses[record.id]}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Checkbox value={record.answers.yes}>예</Checkbox>
          <Checkbox value={record.answers.no}>아니요</Checkbox>
          <Checkbox value={record.answers.unknown}>모르겠음</Checkbox>
        </Checkbox.Group>
      ),
    },
  ];

  return (
    <PageContainer>
      <div style={{ position: "sticky", top: "68px", zIndex: "1" }}>
        <PageHeader title="말 언어 문해기초 선별 체크리스트 (Speech Language Early Literacy Screening Checklist)" />
        {/* Progress Bar */}
        <Progress
          percent={progressPercentage}
          status="active"
          showInfo={false}
          strokeColor="#52c41a"
          style={{
            backgroundColor: "var(--bg-body)",
          }}
        />
      </div>

      <AlertContainer
        description={
          <AlertContentWrapper>
            <li>
              각 질문 항목에 대하여 '예' 또는 '아니요'를 선택하여
              표시해주십시오.
            </li>
            <li>'모르겠음'으로 표시하는 경우는 최소화해 주십시오.</li>
            <li>
              '모르겠음'으로 표시하는 경우 : 유아의 수행력을 판단하기 어려운
              경우에만 사용하십시오.
            </li>
          </AlertContentWrapper>
        }
        type="info"
      />

      <H3>언어 이해 및 표현</H3>
      <Table
        columns={columns}
        dataSource={categoryAQuestions} // Display questions from Category A
        rowKey="id"
        pagination={false}
      />

      <H3>말 및 문해</H3>
      <Table
        columns={columns}
        dataSource={categoryBQuestions} // Display questions from Category B
        rowKey="id"
        pagination={false}
      />

      {/* <Text strong>총점: {totalScore}</Text> */}

      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <SecondaryButton size="large">취소</SecondaryButton>
        <PrimaryButton
          disabled={progressPercentage !== 100}
          size="large"
          onClick={() => {
            navigate("/sle/analysis", { state: { totalScore: totalScore } });
          }}
        >
          결과분석
        </PrimaryButton>
      </Space>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 64px 24px;
  box-sizing: border-box;
  max-width: 1280px;
  margin: 0 auto;
  gap: 24px;
`;

const AlertContainer = styled(Alert)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  border: none;
  margin-top: 16px;
`;

const AlertContentWrapper = styled.div`
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: normal;
  font-size: 14px;
`;

export default Input;
