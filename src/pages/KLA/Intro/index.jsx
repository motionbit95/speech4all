import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { B2, H1, H2 } from "../../../component/Typography";
import { DarkButton } from "../../../component/Button";
import { KLAIntroImage } from "../../../assets/images";
import { Image, Tabs } from "antd";
import MessageBox from "../../../component/MessageBox";
import { BiInfoCircle } from "react-icons/bi";
import { ServiceCard } from "../../../component/Card";
import {
  PaperCoachIcon,
  PaperConsultantIcon,
  PaperMentorIcon,
} from "../../../assets/icons";
import { Spontaneous, Story, Write } from "./CollectionMethod";
import UsageInstructions, {
  MobileUsageInstructions,
} from "./UsageInstructions";
// Framer Motion import
import { motion } from "framer-motion";

/** Framer Motion Variant 설정 */
// 각 섹션이 화면에 보일 때 페이드 인 및 살짝 위로 슬라이드 되는 효과
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};

const Intro = () => {
  // 반응형 레이아웃을 위한 미디어 쿼리
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  // 메시지 박스 상태 관리
  const [messageInfo, setMessageInfo] = React.useState({
    title: "KLA",
    content: "Korean Language Analysis",
    visible: false,
  });

  // Tabs 데이터
  const tabItems = [
    { key: "1", label: "자발화 자료 수집 방법", children: <Spontaneous /> },
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
      {/* 각 섹션을 motion.div로 감싸고, 화면에 30% 이상 보일 때 애니메이션 적용 */}
      <AnimatedSection
        variants={fadeInUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <HeroSection isDesktop={isDesktop} setMessageInfo={setMessageInfo} />
      </AnimatedSection>
      <AnimatedSection
        variants={fadeInUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <ServiceSection isDesktop={isDesktop} />
      </AnimatedSection>
      <AnimatedSection
        variants={fadeInUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <GuideSection isDesktop={isDesktop} />
      </AnimatedSection>
      <AnimatedSection
        variants={fadeInUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <CollectionMethodSection items={tabItems} />
      </AnimatedSection>

      <MessageBox
        width="400px"
        centered
        visible={messageInfo.visible}
        onCancel={() => setMessageInfo({ ...messageInfo, visible: false })}
        icon={<BiInfoCircle />}
        title="사용권 구매가 필요합니다"
      >
        <SubText>
          {
            "프로그램 분석 사용권 구입을 원하시면 gpspeech4all@gmail.com로 연락주세요."
          }
        </SubText>
      </MessageBox>
    </>
  );
};

/** Hero Section */
const HeroSection = ({ isDesktop, setMessageInfo }) => (
  <HeroContainer isDesktop={isDesktop}>
    <HeroContent>
      <H1>KLA(Korean Language Analysis)</H1>
      <SubText>
        <B2>
          KLA는 한림대학교 언어병리학과와 서강대학교 컴퓨터공학과 교수진이 공동
          연구한 프로그램입니다. 사용자가 입력한 발화 자료를 통해 빠르고 정확한
          언어 분석을 제공합니다.
        </B2>
      </SubText>
      <ButtonWrapper>
        <DarkButton
          type="primary"
          size="large"
          onClick={() => setMessageInfo((prev) => ({ ...prev, visible: true }))}
        >
          발화 분석하기
        </DarkButton>
      </ButtonWrapper>
    </HeroContent>
    <Image preview={false} src={KLAIntroImage} />
  </HeroContainer>
);

/** Service Section */
const ServiceSection = ({ isDesktop }) => (
  <SectionBackground>
    <SectionContainer isDesktop={isDesktop}>
      <H2 style={{ textAlign: "center" }}>프로그램 소개</H2>
      <ServiceCardWrapper isDesktop={isDesktop}>
        <ServiceCard icon={PaperConsultantIcon} title="자동화된 분석 제공">
          <li>
            평균 발화길이, 어휘 다양도, 어절수별 발화목록, 낱말 및 문법 형태소
            목록 등 객관적 분석치를 빠른 시간내에 제공합니다.
          </li>
        </ServiceCard>
        <ServiceCard icon={PaperMentorIcon} title="연령 및 학년별 평가 기준">
          <li>
            자발화(2~6세), 이야기(4~6세), 쓰기(1학년~6학년) 자료에 대한 준거
            제시
          </li>
          <li>
            의미, 문법, 구문, 담화, 쓰기와 관련된 아동의 발달 정도를 보다 빠르고
            객관적으로 평가할 수 있게 합니다.
          </li>
        </ServiceCard>
        <ServiceCard icon={PaperCoachIcon} title="보고서 및 데이터 관리">
          <li>입력한 발화자료를 기반으로 상세한 분석 결과를 보고서로 제공</li>
          <li>프로그램을 통해 분석 자료를 관리하실 수도 있습니다.</li>
        </ServiceCard>
      </ServiceCardWrapper>
    </SectionContainer>
  </SectionBackground>
);

/** Guide Section */
const GuideSection = ({ isDesktop }) => (
  <SectionContainer>
    <H2>KLA 사용방법</H2>
    <SubText>
      <B2>
        대상자 또는 상대 대화자의 발화를 전사한 후 어절과 문법형태소 경계를
        나누면 KLA가 자동으로 분석 결과를 제공합니다.
      </B2>
    </SubText>
    {isDesktop ? <UsageInstructions /> : <MobileUsageInstructions />}
  </SectionContainer>
);

/** Collection Method Section */
const CollectionMethodSection = ({ items }) => (
  <SectionBackgroundLight>
    <SectionContainer>
      <H2>자료 수집 방법</H2>
      <SubText>
        <B2>연령대별 측정치 준거를 비교하기 위한 자료 수집 방법 안내입니다.</B2>
      </SubText>
      <Tabs defaultActiveKey="1" items={items} size="large" />
    </SectionContainer>
  </SectionBackgroundLight>
);

/** Styled Components with Framer Motion 적용 */
// 각 섹션에 공통적으로 애니메이션 적용할 때 사용할 motion.div 기반 컴포넌트
const AnimatedSection = styled(motion.div)`
  width: 100%;
`;

// Hero Section 스타일
const HeroContainer = styled.div`
  padding: ${({ isDesktop }) => (isDesktop ? "196px 72px 128px" : "64px 24px")};
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? "row" : "column")};
  align-items: center;
  gap: 32px;
  max-width: 1280px;
  margin: 0 auto;
`;

const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
`;

// 공통 섹션 컨테이너
const SectionContainer = styled.div`
  padding: ${({ isDesktop }) => (isDesktop ? "128px 72px" : "64px 24px")};
  gap: ${({ isDesktop }) => (isDesktop ? "64px" : "32px")};
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
`;

// 배경색이 적용된 섹션 (서비스, 자료수집방법 등)
const SectionBackground = styled.div`
  background-color: var(--bg-primary);
`;

const SectionBackgroundLight = styled.div`
  background-color: var(--bg-light);
`;

const ServiceCardWrapper = styled.div`
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? "row" : "column")};
  gap: 32px;
  justify-content: center;
`;

// SubText 스타일
const SubText = styled.div`
  color: var(--text-secondary);
  white-space: pre-wrap;
  line-height: 1.6;
`;

export default Intro;
