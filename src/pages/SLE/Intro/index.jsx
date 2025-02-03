import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { H1, H2 } from "../../../component/Typography";
import { DarkButton } from "../../../component/Button";
import { KLAIntroImage, SLEIntroImage } from "../../../assets/images";
import { Image, Tabs } from "antd";
import MessageBox from "../../../component/MessageBox";
import { BiInfoCircle } from "react-icons/bi";
import { DescriptionCard, ServiceCard } from "../../../component/Card";
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
      <CollectionMethodSection isDesktop={isDesktop} items={items} />
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
      <H2 style={{ fontSize: "30px" }}>KLA 사용방법</H2>
      <SubText>
        {`대상자 또는 상대 대화자의 발화를 전사한 후 어절과 문법형태소 경계를 나누어주면, KLA가 자동적으로 분석결과를 알려줍니다. 
낱말은 띄어쓰기 경계로, 문법형태소는 /로 표시합니다.`}
      </SubText>
    </TitleWrapper>
    <UsageInstructions />
  </GuideContainer>
);

const CollectionMethodSection = ({ isDesktop, items }) => (
  <div style={{ backgroundColor: "var(--bg-light)" }}>
    <CaseContainer isDesktop={isDesktop}>
      <TitleWrapper>
        <H2 style={{ fontSize: "30px" }}>자료수집방법</H2>
        <SubText>
          연령대별 측정치 준거를 비교하기 위한 자료 수집 방법에 대한 안내입니다.
        </SubText>
      </TitleWrapper>
      <Tabs defaultActiveKey="1" items={items} />
    </CaseContainer>
  </div>
);

const HeroContainer = styled.div`
  padding: ${({ isDesktop }) =>
    isDesktop ? "196px 72px 128px 72px" : "64px 0"};
  gap: 32px;
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? "row" : "column")};
  align-items: flex-start;
  box-sizing: border-box;
  max-width: 1200px;
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
  padding: ${({ isDesktop }) => (isDesktop ? "128px 72px" : "64px 48px")};
  gap: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  background-color: var(--bg-primary);
`;

const ServiceWrapper = styled.div`
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
`;

const CaseContainer = styled.div`
  padding: ${({ isDesktop }) => (isDesktop ? "128px 72px" : "64px 24px")};
  gap: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 1280px;
  margin: 0 auto;
`;

export default Intro;
