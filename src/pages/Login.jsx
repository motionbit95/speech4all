import React from "react";
import styled from "styled-components";
import Logo from "../component/Logo";
import { PasswordInput, TextInput } from "../component/Input";
import { PrimaryButton, SecondaryButton } from "../component/Button";

function Login_v2(props) {
  return (
    <LoginContainer>
      <Logo>Speech4All</Logo>
      <LoginWrapper>
        <TextInput
          placeholder="이메일을 입력해주세요."
          type="email"
          size="large"
        />
        <PasswordInput placeholder="비밀번호를 입력해주세요." size="large" />
        <PrimaryButton type="primary" size="large">
          로그인
        </PrimaryButton>
        {/* 아직 미구현된 기능입니다. */}
        <FindPassword>아이디 / 비밀번호 찾기</FindPassword>
      </LoginWrapper>
      <LoginWrapper>
        <>계정이 없으신가요?</>
        <SecondaryButton size="large">회원가입</SecondaryButton>
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
