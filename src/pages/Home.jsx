import { Col, Divider, Image, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { B3, H1, H2 } from "../component/Typography";
import { DarkButton } from "../component/Button";
import { BsArrowRight } from "react-icons/bs";
import { HeroImage } from "../assets/images";
import { VisionCard } from "../component/Card";
import {
  ChatIcon,
  ConnectIcon,
  RecognizeIcon,
  SupportIcon,
} from "../assets/icons";
import { useMediaQuery } from "react-responsive";

function Home(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
  return (
    <div>
      <HeroContainer isMobile={isMobile}>
        <HeroWrapper>
          <H1>모두의 말소리, Speech4All</H1>
          <SubText>
            Speech4All은 AI 음성인식 기술을 기반으로하는 말소리와 발화 분석 전문
            회사입니다.
          </SubText>
          <DarkButton
            type="primary"
            size="large"
            iconPosition="end"
            icon={
              <BsArrowRight
                size="24px"
                style={{ marginLeft: "4px", color: "white" }}
              />
            }
          >
            서비스 시작하기
          </DarkButton>
        </HeroWrapper>
        <Image
          preview={false}
          src={HeroImage}
          style={{
            width: "100vw",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </HeroContainer>
      <VisionContainer isMobile={isMobile}>
        <H2>추구하는 가치와 방향</H2>
        <SubText>
          {`Speech4All의 핵심가치\n경청하다, 인식하다, 지원하다, 연결하다`}
        </SubText>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} xl={6}>
            <VisionCard icon={ChatIcon} title="Listen">
              <li>
                사용자의 의사소통 경험을 깊이 이해하고, 경청하여, 각 개인의
                요구에 맞는 지원을 제공합니다.
              </li>
              <li>이는 효과적인 의사소통 기술의 기반을 마련합니다.</li>
            </VisionCard>
          </Col>
          <Col xs={24} md={12} xl={6}>
            <VisionCard icon={RecognizeIcon} title="Recognize">
              <li>
                다양한 음성과 발화 패턴을 정밀하게 인식하여, 발화의 특징을
                감지하고, 의사소통 경험을 개선할 수 있는 통찰과 도구를
                제공합니다.
              </li>
            </VisionCard>
          </Col>
          <Col xs={24} md={12} xl={6}>
            <VisionCard icon={SupportIcon} title="Support">
              <li>
                기술적 자원을 활용하여 사용자가 자신의 생각을 명확하고 자신감
                있게 표현할 수 있도록 지원합니다.
              </li>
            </VisionCard>
          </Col>
          <Col xs={24} md={12} xl={6}>
            <VisionCard icon={ConnectIcon} title="Connect">
              <li>
                기술을 통해 개인들이 서로와 더 깊이 연결되고 소통할 수 있도록,
                커뮤니티 내에서 의미있는 관계를 형성하고 유지할 수 있게합니다.
              </li>
            </VisionCard>
          </Col>
        </Row>
      </VisionContainer>
    </div>
  );
}

const HeroContainer = styled.div`
  padding: ${({ isMobile }) => (isMobile ? "64px 0" : "128px 0")};
  gap: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const HeroWrapper = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  text-align: center;
`;

const VisionContainer = styled.div`
  padding: ${({ isMobile }) => (isMobile ? "64px 24px" : "128px 72px")};
  gap: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100%;

  max-width: 1280px;
  margin: 0 auto;
`;

const SubText = styled.div`
  color: var(--text-secondary);
  text-align: center;
  white-space: pre-wrap;
  font-size: 14px;
  line-height: 24px;
`;

export default Home;
