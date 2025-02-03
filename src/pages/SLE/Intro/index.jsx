import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { H1, H2 } from "../../../component/Typography";
import { DarkButton } from "../../../component/Button";
import { KLAIntroImage, SLEIntroImage } from "../../../assets/images";
import { Col, Image, Row, Tabs } from "antd";
import MessageBox from "../../../component/MessageBox";
import { BiInfoCircle } from "react-icons/bi";
import {
  DescriptionCard,
  ServiceCard,
  VisionCard,
} from "../../../component/Card";
import {
  PaperCoachIcon,
  PaperConsultantIcon,
  PaperMentorIcon,
} from "../../../assets/icons";
import { Spontaneous, Story, Write } from "./CollectionMethod";
import UsageInstructions from "./UsageInstructions";

const Intro = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const [messageInfo, setMessageInfo] = React.useState({
    title: "KLA",
    content: "Korean Language Analysis",
    visible: false,
  });

  const items = [
    {
      key: "1",
      label: "자발화 자료 수집 방법",
      children: <Spontaneous />,
    },
    {
      key: "2",
      label: "이야기 자료 수집 방법",
      children: <Story isDesktop={isDesktop} />,
    },
    {
      key: "3",
      label: "쓰기 자료 수집 방법",
      children: <Write isDesktop={isDesktop} />,
    },
  ];

  return (
    <>
      <HeroSection
        isDesktop={isDesktop}
        messageInfo={messageInfo}
        setMessageInfo={setMessageInfo}
      />
      <ServiceSection isDesktop={isDesktop} />
      <GuideSection isDesktop={isDesktop} />
      <MessageBox
        width="400px"
        centered
        visible={messageInfo.visible}
        onCancel={() => setMessageInfo({ ...messageInfo, visible: false })}
        icon={<BiInfoCircle />}
        title={"사용권 구매가 필요합니다"}
        children={
          <SubText>
            프로그램 분석 사용권 구입을 희망하시는
            경우\ngpspeech4all@gmail.com로 연락주세요.
          </SubText>
        }
      />
    </>
  );
};

const HeroSection = ({ isDesktop, messageInfo, setMessageInfo }) => (
  <HeroContainer isDesktop={isDesktop}>
    <HeroWrapper isDesktop={isDesktop}>
      <H1 style={{ whiteSpace: "pre-wrap" }}>
        {
          "말 언어 문해기초 선별 체크리스트\n(Speech Language Early Literacy Screening Checklist)"
        }
      </H1>
      <SubText>
        저자 - 한림대학교 언어청각학부(배소영, 하승희, 엄지목, 유해림)
      </SubText>
      <ButtonContainer isDesktop={isDesktop}>
        <DarkButton
          onClick={() => setMessageInfo({ ...messageInfo, visible: true })}
          type="primary"
          size="large"
          iconPosition="end"
        >
          체크리스트 작성하기
        </DarkButton>
      </ButtonContainer>
    </HeroWrapper>
    <Image preview={false} src={SLEIntroImage} />
  </HeroContainer>
);

const ServiceSection = ({ isDesktop }) => (
  <ServiceContainer isDesktop={isDesktop}>
    <H2
      style={{
        fontSize: "30px",
        maxWidth: "1280px",
        margin: "0 auto",
        textAlign: "left",
        width: "100%",
      }}
    >
      언어 조기 선별의 중요성
    </H2>
    <ServiceWrapper isDesktop={isDesktop}>
      <DescriptionCard icon={PaperConsultantIcon} title={"자동화된 분석 제공"}>
        <li>
          평균 발화길이, 어휘 다양도, 어절수별 발화목록, 낱말 및 문법 형태소
          목록 등 객관적 분석치를 빠른 시간내에 제공합니다.
        </li>
      </DescriptionCard>
      <DescriptionCard
        icon={PaperMentorIcon}
        title={"연령 및 학년별 평가 기준"}
      >
        <li>
          자발화(2~6세), 이야기(4~6세), 쓰기(1학년~6학년) 자료에 대한 준거 제시
        </li>
        <li>
          의미, 문법, 구문, 담화, 쓰기와 관련된 아동의 발달 정도를 보다 빠르고
          객관적으로 평가할 수 있게 합니다
        </li>
      </DescriptionCard>
      <DescriptionCard icon={PaperCoachIcon} title={"보고서 및 데이터 관리"}>
        <li>입력한 발화자료를 기반으로 상세한 분석 결과를 보고서로 제공</li>
        <li>프로그램을 통해 분석 자료를 관리하실 수도 있습니다.</li>
      </DescriptionCard>
    </ServiceWrapper>
  </ServiceContainer>
);

const GuideSection = ({ isDesktop }) => (
  <GuideContainer isDesktop={isDesktop}>
    <TitleWrapper>
      <H2 style={{ fontSize: "30px" }}>체크리스트 개발 배경 및 활용 안내</H2>
    </TitleWrapper>
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <VisionCard
          iconType={"emoji"}
          icon={"📝"}
          title={"체크리스트 개발 목적"}
        >
          <li>
            만 5~6세 아동의 말·언어 발달과 문해 기초 능력을 조기에 선별하기 위해
            개발되었습니다.
          </li>
        </VisionCard>
      </Col>
      <Col xs={24} md={8}>
        <VisionCard iconType={"emoji"} icon={"📊"} title={"결과 보고서 제공"}>
          <li>
            체크리스트 결과를 보고서 형식으로 제공하여, 아동의 언어발달 상태를
            쉽게 확인할 수 있습니다.
          </li>
        </VisionCard>
      </Col>
      <Col xs={24} md={8}>
        <VisionCard
          iconType={"emoji"}
          icon={"🔍"}
          title={"심층 검사 및 조기 중재 지원"}
        >
          <li>
            발달 지연이 의심되는 아동을 조기에 발견하고, 심층 검사 및 예방적
            개입을 통해 적절한 지원을 제공합니다.
          </li>
        </VisionCard>
      </Col>
    </Row>
  </GuideContainer>
);

const HeroContainer = styled.div`
  padding: ${({ isDesktop }) =>
    isDesktop ? "196px 72px 128px 72px" : "64px 0"};
  gap: 32px;
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? "row" : "column")};
  align-items: flex-start;
  box-sizing: border-box;
  max-width: 1280px;
  margin: 0 auto;
`;

const HeroWrapper = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SubText = styled.div`
  color: var(--text-secondary);
  white-space: pre-wrap;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isDesktop }) => (isDesktop ? "flex-start" : "center")};
  gap: 16px;
`;

const ServiceContainer = styled.div`
  padding: ${({ isDesktop }) => (isDesktop ? "128px 72px" : "64px 24px")};
  box-sizing: border-box;

  gap: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  background-color: var(--bg-primary);
`;

const ServiceWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  gap: 32px;
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? "row" : "column")};
  align-items: stretch;
  flex-wrap: wrap;
  max-width: 1280px;
  margin: 0 auto;
`;

const GuideContainer = styled.div`
  gap: 48px;
  display: flex;
  flex-direction: column;
  padding: ${({ isDesktop }) => (isDesktop ? "128px 72px" : "64px 24px")};
  box-sizing: border-box;
  max-width: 1280px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

export default Intro;
