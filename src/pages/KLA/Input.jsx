import React from "react";
import { PageHeader } from "../../component/Header";
import { H3, H4 } from "../../component/Typography";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Col, Form, Row, Select, Space } from "antd";
import { DateInput, RadioInput, TextInput } from "../../component/Input";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { PrimaryButton, SecondaryButton } from "../../component/Button";
import { useNavigate } from "react-router-dom";

const { Item } = Form;

const FIELD_REQUIRED_TEXT = (
  <span style={{ color: "var(--fg-primary)" }}>(필수)</span>
);

function Input(props) {
  const { user } = props;
  const isDesktop = useMediaQuery({ query: "(min-width: 576px)" });
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = () => {
    const formData = form.getFieldsValue();

    const fullInputText = `
    +이름 ${formData.name}
    +성별 ${formData.gender}
    +검사일 ${formData.examdate.format("YYYY-MM-DD")}
    +생년월일 ${formData.birthday.format("YYYY-MM-DD")}
    +검사자 ${formData.examiner}
    +교육기관 ${formData.school}
    +학년 ${formData.grade}
    +평가지역 ${formData.region}
    +평가기관 ${formData.institution}
    +발화종류 ${formData.utteranceType}
    ${formData.inputText}`;

    // console.log("fullInputText:", fullInputText, user);
    navigate("/kla/result", { state: { inputText: fullInputText, user } });
  };

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

  return (
    <div>
      <PageHeader
        title="신규 발화 분석"
        onSubmit={() => form.submit()}
        buttonText="분석하기"
      />
      <Form
        form={form}
        name="input-form"
        layout={isDesktop ? "vertical" : "horizontal"}
        requiredMark={false}
        onFinish={onFinish}
      >
        <PageContainer>
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
          </InputWrapper>

          <InputWrapper>
            <H3>발화 데이터 입력</H3>
            <Row gutter={[16, 16]}>
              {renderField(
                "utteranceType",
                "발화 종류",
                <RadioInput
                  size="large"
                  options={[
                    { label: "자발화", value: "자발화" },
                    { label: "이야기(회상산출)", value: "이야기(회상산출)" },
                    { label: "이야기(자발산출)", value: "이야기(자발산출)" },
                    { label: "작문", value: "작문" },
                  ]}
                />,
                { colSpanDesktop: 24 }
              )}
              {renderField(
                "inputText",
                "전사 데이터",
                <TextArea
                  size="large"
                  placeholder="전사 데이터를 입력해주세요."
                  rows={20}
                />,
                { colSpanDesktop: 24 }
              )}
            </Row>
            <Space style={{ justifyContent: "flex-end" }}>
              <SecondaryButton size="large" onClick={() => navigate(-1)}>
                취소
              </SecondaryButton>
              <PrimaryButton size="large" htmlType="submit">
                분석하기
              </PrimaryButton>
            </Space>
          </InputWrapper>
        </PageContainer>
      </Form>
    </div>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-disable);
  max-width: 1280px;
  margin: 0 auto;
  gap: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: var(--bg-body);
`;

export default Input;
