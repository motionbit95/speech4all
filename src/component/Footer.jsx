import React from "react";
import styled from "styled-components";
import { H5 } from "./Typography";
import { useMediaQuery } from "react-responsive";

const info = {
  name: "(합) Speech4All",
  representative: "하승희",
  address: "강원특별자치도 춘천시 한림대학길 1, 6층 8606호(옥천동, 생명과학관)",
  email: "gpspeech4all@gmail.com",
  registrationNumber: "812-87-03395",
  copyright: "Copyright © 2024 Speech4All. All Rights Reserved.",
};

function Footer(props) {
  const isDesktop = useMediaQuery({ query: "(min-width: 576px)" });

  return (
    <FooterContainer>
      <InfoWrapper>
        <InfoText isDesktop={isDesktop}>
          {`${info.name} | 대표 : ${info.representative}
개선 및 문의사항 : ${info.email}
사업자등록번호 : ${info.registrationNumber}
주소 : ${info.address}`}
        </InfoText>
      </InfoWrapper>
      <Copyright>
        <H5>{info.copyright}</H5>
      </Copyright>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 64px 72px;
  white-space: pre-wrap;
  background-color: var(--bg-light);
  border-top: 1px solid var(--border-component);
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const InfoWrapper = styled.div`
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Copyright = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InfoText = styled.div`
  font-size: ${({ isDesktop }) => (isDesktop ? "14px" : "12px")};
  font-family: "Pretendard", sans-serif;
  line-height: 24px;
  color: var(--text-primary);
`;

export default Footer;
