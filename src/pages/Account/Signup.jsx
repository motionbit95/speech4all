import { Form, Image, Row, Col } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { MainImage } from "../../assets/images";
import { PrimaryButton } from "../../component/Button";
import { PasswordInput, TextInput } from "../../component/Input";
import { H3, H4 } from "../../component/Typography";

function Signup() {
  const [form] = Form.useForm();
  const isDesktop = useMediaQuery({ query: "(min-width: 576px)" });

  return (
    <Row>
      <Col span={isDesktop ? 12 : 0}>{isDesktop && <ImageContainer />}</Col>
      <Col span={isDesktop ? 12 : 24}>
        <SignupWrapper>
          <div>이미 계정이 있으신가요?</div> <Login>로그인하기</Login>
        </SignupWrapper>
        <SignupContainer>
          <H3>회원정보를 입력해주세요.</H3>
          <SignupForm
            form={form}
            name="login-form"
            layout={isDesktop ? "vertical" : "horizontal"} // 동적으로 변경
            requiredMark={false}
            onFinish={() => {}}
          >
            <SignupItem
              name={"email"}
              rules={[{ required: true, message: "이메일을 입력해주세요!" }]}
              label={<H4>이메일</H4>}
            >
              <TextInput
                placeholder="이메일을 입력해주세요."
                type="email"
                size="large"
              />
            </SignupItem>
            <SignupItem
              name={"password"}
              rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
              label={<H4>비밀번호</H4>}
            >
              <PasswordInput
                placeholder="비밀번호를 입력해주세요."
                size="large"
              />
            </SignupItem>
            <SignupItem
              name={"name"}
              rules={[{ required: true, message: "이름을 입력해주세요!" }]}
              label={<H4>이름</H4>}
            >
              <TextInput
                placeholder="이름을 입력해주세요."
                type="text"
                size="large"
              />
            </SignupItem>
            <PrimaryButton
              htmlType="submit"
              type="primary"
              size="large"
              style={{ marginTop: "24px" }}
            >
              회원가입
            </PrimaryButton>
          </SignupForm>
        </SignupContainer>
      </Col>
    </Row>
  );
}

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  gap: 36px;
  box-sizing: border-box;
  padding: 0 24px;
`;

const SignupForm = styled(Form)`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
`;

const SignupItem = styled(Form.Item)`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  margin: 0;
`;

const SignupWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
  height: 60px;
  padding: 0 24px;
  align-items: center;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url(${MainImage});
  background-size: cover;
  background-position: center;
`;

const Login = styled.div`
  position: relative;
  color: var(--fg-primary);
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 1px;
    background-color: var(--fg-primary);
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`;

export default Signup;
