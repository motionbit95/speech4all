import React, { useEffect } from "react";
import { PageHeader } from "../../component/Header";
import { Col, Form, Row, Table, Tag } from "antd";
import { H4 } from "../../component/Typography";
import { PasswordInput, TextInput } from "../../component/Input";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const { Item } = Form;

function MyPage(props) {
  const { user } = props;
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useEffect(() => {
    console.log("user:", user);
  }, [user]);

  const renderField = (name, label, Component, options = {}) => (
    <Col
      span={
        isDesktop ? options.colSpanDesktop || 12 : options.colSpanMobile || 24
      }
    >
      <Item
        name={name}
        label={<H4>{label}</H4>}
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
    <PageContainer>
      <PageHeader title="마이페이지" />
      {user && (
        <InputContainer>
          <Form
            requiredMark={false}
            layout={"vertical"}
            initialValues={{
              email: user.email,
              password: user.password,
              organization: user.organization || "기관",
            }}
          >
            <Row gutter={[16, 16]}>
              {renderField(
                "email",
                "이메일",
                <TextInput disabled size="large" />,
                { colSpanDesktop: 12, colSpanMobile: 24 }
              )}
              {renderField(
                "password",
                "패스워드",
                <PasswordInput size="large" />,
                { colSpanDesktop: 12, colSpanMobile: 24 }
              )}
              {renderField(
                "organization",
                "회원 유형",
                <TextInput disabled size="large" />,
                { colSpanDesktop: 12, colSpanMobile: 24 }
              )}
              {renderField(
                "license",
                "사용권",
                <Table
                  scroll={{ x: "max-content" }}
                  pagination={false}
                  size="large"
                  columns={[
                    {
                      title: "번호",
                      dataIndex: "index",
                      key: "index",
                      render: (text, record, index) => index + 1,
                    },
                    {
                      title: "항목",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "사용여부",
                      dataIndex: "status",
                      key: "status",
                      render: (text) => {
                        return (
                          <Tag
                            icon={
                              text === "사용" ? (
                                <CheckCircleOutlined />
                              ) : (
                                <CloseCircleOutlined />
                              )
                            }
                            color={text === "사용" ? "green" : ""}
                          >
                            {text}
                          </Tag>
                        );
                      },
                    },
                    {
                      title: "만료일",
                      dataIndex: "expiration",
                      key: "expiration",
                    },
                  ]}
                  dataSource={[
                    {
                      index: 1,
                      name: "KLA",
                      status: "사용",
                      expiration: "2022-12-31",
                    },
                    {
                      index: 2,
                      name: "말 언어 초기 문해 선별 체크리스트",
                      status: "미사용",
                      expiration: "2022-12-31",
                    },
                  ]}
                />,
                { colSpanDesktop: 24 }
              )}
            </Row>
          </Form>
        </InputContainer>
      )}
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

const InputContainer = styled.div`
  padding: ${({ isDesktop }) => (isDesktop ? "64px 72px" : "32px 24px")};
`;

export default MyPage;
