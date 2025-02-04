import React, { useState, useEffect } from "react";
import {
  Table,
  Checkbox,
  Typography,
  Space,
  Alert,
  Progress,
  Select,
  Row,
  Col,
  Form,
} from "antd";
import styled from "styled-components";
import surveyData from "./question.json"; // Import JSON file directly
import { useMediaQuery } from "react-responsive";
import { H3, H4 } from "../../component/Typography";
import { PageHeader } from "../../component/Header";
import { PrimaryButton, SecondaryButton } from "../../component/Button";
import { useNavigate } from "react-router-dom";
import { BiInfoCircle } from "react-icons/bi";
import { DateInput, RadioInput, TextInput } from "../../component/Input";
import dayjs from "dayjs";

const { Text } = Typography;
const { Item } = Form;

const FIELD_REQUIRED_TEXT = (
  <span style={{ color: "var(--fg-primary)" }}>(필수)</span>
);

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
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({});

  const [form] = Form.useForm();

  useEffect(() => {
    console.log("surveyData:", surveyData);
  }, []);

  const renderField = (name, label, Component, options = {}) => (
    <Col
      span={
        isDesktop ? options.colSpanDesktop || 12 : options.colSpanMobile || 24
      }
    >
      <Item
        name={name}
        label={
          <H4>
            {label} {FIELD_REQUIRED_TEXT}
          </H4>
        }
        rules={[
          {
            required: true,
            message: `${label}${
              label === "전사 데이터" ? "를" : "을"
            } 입력해주세요.`,
          },
        ]}
        {...options.itemProps}
      >
        {Component}
      </Item>
    </Col>
  );

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    setInfo(values);
    form.resetFields();
    setStep(2);
  };

  const handleSelect = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  // Calculate score for each category
  const calculateScore = (categoryQuestions) => {
    return categoryQuestions.reduce((score, question) => {
      const response = responses[question.id];
      return score + (response === question.answers.yes ? 1 : 0); // Assuming "yes" answers add score
    }, 0);
  };

  // Get questions by category
  const categoryAQuestions = surveyData.questions.filter(
    (q) => q.category === "언어 이해 및 표현"
  );
  const categoryBQuestions = surveyData.questions.filter(
    (q) => q.category === "말 및 문해"
  );

  const totalQuestions = surveyData.questions.length;
  const answeredQuestions = Object.keys(responses).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  // Calculate category scores
  const categoryAScore = calculateScore(categoryAQuestions);
  const categoryBScore = calculateScore(categoryBQuestions);

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
    <>
      {step === 1 && (
        <PageContainer>
          <PageHeader title="말 언어 문해기초 선별 체크리스트 (Speech Language Early Literacy Screening Checklist)" />
          <AlertContainer
            message={
              <AlertTitleWrapper>
                <BiInfoCircle
                  size={20}
                  style={{ color: "var(--fg-primary)" }}
                />
                언어발달 조기 선별의 중요성
              </AlertTitleWrapper>
            }
            description={
              <AlertContentWrapper>
                <li>
                  학령전기 아동의 말·언어 발달지연은 학령기의 말·언어 능력뿐만
                  아니라 읽고 쓰는 능력에도 영향을 주게 됩니다.
                </li>
                <li>
                  따라서 학교 입학 전 학령전기 말· 언어발달과 문해기초 능력에
                  대한 조기 선별이 이루어져야 합니다.
                </li>
              </AlertContentWrapper>
            }
            type="info"
          />

          <AlertContainer
            message={
              <AlertTitleWrapper>
                <BiInfoCircle
                  size={20}
                  style={{ color: "var(--fg-primary)" }}
                />
                개발 배경 및 활용 안내 
              </AlertTitleWrapper>
            }
            description={
              <AlertContentWrapper>
                <li>
                  본 체크리스트는 학령전기 만 5-6세 아동의 말·언어 발달과
                  문해기초 능력을 조기에 선별하고자 개발되었습니다.
                </li>
                <li>
                  선별 체크리스트 결과를 바탕으로 말·언어발달지연 아동을 조기에
                  확인할 수 있는 심층검사를 제공하고, 예방적 차원에서의 조기
                  중재 기틀을 마련하고자 합니다.
                </li>
              </AlertContentWrapper>
            }
            type="info"
          />

          <Form
            form={form}
            name="input-form"
            layout={isDesktop ? "vertical" : "horizontal"}
            requiredMark={false}
            onFinish={onFinish}
          >
            <Space
              direction="vertical"
              size={16}
              style={{ width: "100%", backgroundColor: "var(--bg-disable)" }}
            >
              <InputWrapper>
                <H3>발화자 정보 입력</H3>
                <Row gutter={[16, 16]}>
                  {renderField(
                    "name",
                    "발화자 이름",
                    <TextInput
                      size="large"
                      placeholder="발화자명을 입력해주세요."
                    />,
                    { colSpanDesktop: 8, colSpanMobile: 24 }
                  )}
                  {renderField(
                    "birthday",
                    "생년월일",
                    <DateInput
                      size="large"
                      placeholder="생년월일을 입력해주세요."
                    />,
                    {
                      itemProps: { initialValue: dayjs() },
                      colSpanDesktop: 8,
                      colSpanMobile: 24,
                    }
                  )}
                  {renderField(
                    "gender",
                    "성별",
                    <RadioInput
                      size="large"
                      options={[
                        { label: "남자", value: "남" },
                        { label: "여자", value: "여" },
                      ]}
                    />,
                    { colSpanDesktop: 8, colSpanMobile: 24 }
                  )}
                  {renderField(
                    "school",
                    "교육기관",
                    <Select size="large" placeholder="교육 기관 선택">
                      <Select.Option value="어린이집">어린이집</Select.Option>
                      <Select.Option value="유치원">유치원</Select.Option>
                      <Select.Option value="초등학교">초등학교</Select.Option>
                      <Select.Option value="해당없음">해당없음</Select.Option>
                    </Select>
                  )}
                  {renderField(
                    "grade",
                    "학년",
                    <Select size="large" placeholder="학년 선택">
                      <Select.Option value="미취학">미취학</Select.Option>
                      <Select.Option value="1학년">1학년</Select.Option>
                      <Select.Option value="2학년">2학년</Select.Option>
                      <Select.Option value="3학년">3학년</Select.Option>
                      <Select.Option value="4학년">4학년</Select.Option>
                      <Select.Option value="5학년">5학년</Select.Option>
                      <Select.Option value="6학년">6학년</Select.Option>
                    </Select>
                  )}
                </Row>
              </InputWrapper>

              <InputWrapper>
                <H3>평가자 정보 입력</H3>
                <Row gutter={[16, 16]}>
                  {renderField(
                    "examiner",
                    "검사자 이름",
                    <TextInput
                      size="large"
                      placeholder="검사자명을 입력해주세요."
                    />
                  )}
                  {renderField(
                    "examdate",
                    "검사일자",
                    <DateInput
                      size="large"
                      placeholder="검사일자를 입력해주세요."
                    />,
                    { itemProps: { initialValue: dayjs() } }
                  )}
                  {renderField(
                    "region",
                    "평가지역",
                    <TextInput
                      size="large"
                      placeholder="평가지역을 입력해주세요."
                    />
                  )}
                  {renderField(
                    "institution",
                    "평가기관",
                    <TextInput
                      size="large"
                      placeholder="평가기관을 입력해주세요."
                    />
                  )}
                </Row>
                <Space
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <SecondaryButton size="large" onClick={() => navigate(-1)}>
                    취소
                  </SecondaryButton>
                  <PrimaryButton size="large" htmlType="submit">
                    다음
                  </PrimaryButton>
                </Space>
              </InputWrapper>
            </Space>
          </Form>
        </PageContainer>
      )}
      {step === 2 && (
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
          {/* <Text strong>총점: {categoryAScore}</Text> */}

          <H3>말 및 문해</H3>
          <Table
            columns={columns}
            dataSource={categoryBQuestions} // Display questions from Category B
            rowKey="id"
            pagination={false}
          />
          {/* <Text strong>총점: {categoryBScore}</Text> */}

          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <SecondaryButton size="large">취소</SecondaryButton>
            <PrimaryButton
              disabled={progressPercentage !== 100}
              size="large"
              onClick={() => {
                navigate("/sle/analysis", {
                  state: {
                    categoryAScore: categoryAScore,
                    categoryBScore: categoryBScore,
                    info: info,
                  },
                });
              }}
            >
              결과분석
            </PrimaryButton>
          </Space>
        </PageContainer>
      )}
    </>
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

const AlertTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  font-weight: bold;
  align-items: center;
`;

const AlertContentWrapper = styled.div`
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: normal;
  font-size: 14px;

  padding: 0 45px;
  box-sizing: border-box;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: var(--bg-body);
`;

export default Input;
