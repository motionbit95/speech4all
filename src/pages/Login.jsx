import React from "react";
import styled from "styled-components";
import Logo from "../component/Logo";
import { PasswordInput, TextInput } from "../component/Input";
import { PrimaryButton, SecondaryButton } from "../component/Button";
import { Form, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login_v2(props) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onLogin = (values) => {
    console.log("Received values of form: ", values);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        const user = response.data.user; // 서버에서(Returned된) user 객체
        props.onLogin(user); // 로그인 성공 시 부모 컴포넌트로 이메일 전달
        message.success(response.data.message); // 로그인 성공 메시지
        navigate("/"); // 로그인 후 홈으로 이동
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          message.error("이메일 또는 패스워드가 잘못되었습니다.");
        } else {
          message.error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      });
  };

  return (
    <LoginContainer>
      <Logo>Speech4All</Logo>
      <LoginForm form={form} name="login-form" onFinish={onLogin}>
        <LoginItem
          name={"email"}
          rules={[{ required: true, message: "이메일을 입력해주세요!" }]}
        >
          <TextInput
            placeholder="이메일을 입력해주세요."
            type="email"
            size="large"
          />
        </LoginItem>
        <LoginItem
          name={"password"}
          rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
        >
          <PasswordInput placeholder="비밀번호를 입력해주세요." size="large" />
        </LoginItem>
        <PrimaryButton htmlType="submit" type="primary" size="large">
          로그인
        </PrimaryButton>
        {/* 아직 미구현된 기능입니다. */}
        <FindPassword>아이디 / 비밀번호 찾기</FindPassword>
      </LoginForm>
      <LoginWrapper>
        <>계정이 없으신가요?</>
        <SecondaryButton size="large" onClick={() => navigate("/v2/signup")}>
          회원가입
        </SecondaryButton>
      </LoginWrapper>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-width: 300px;
  margin: 0 auto;
  gap: 40px;
`;

const LoginForm = styled(Form)`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
`;

const LoginItem = styled(Form.Item)`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  margin: 0;
`;

const LoginWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
`;

const FindPassword = styled.div`
  align-self: flex-end;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
`;

export default Login_v2;
