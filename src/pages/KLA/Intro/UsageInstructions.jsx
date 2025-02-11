import { Divider, Popover, Space, Alert, Image } from "antd";
import React from "react";
import styled from "styled-components";
import { B3, H3, H4, H5 } from "../../../component/Typography";
import { BiInfoCircle } from "react-icons/bi";
import { ExampleImage } from "../../../assets/images";
import { useMediaQuery } from "react-responsive";

// Step Components (Move them above the main component)
const Step1 = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <StepContainer isDesktop={isDesktop}>
      <Space>
        <H3>정보 입력</H3>
      </Space>
      <StepContentWrapper>
        <H4>1. 아동 정보 입력</H4>
        <AlertContentWrapper>
          <li>
            아동에 관한 정보(이름, 생년월일, 성별, 특이사항)를 아래 샘플과 같이
            적습니다.
          </li>
        </AlertContentWrapper>
      </StepContentWrapper>
      <Divider style={{ margin: 0 }} />
      <StepContentWrapper>
        <H4>2. 평가자 정보 입력</H4>
        <AlertContentWrapper>
          <li>
            평가자에 관한 정보(이름, 평가기관, 검사날짜)를 아래 샘플과 같이
            적습니다.
          </li>
        </AlertContentWrapper>
        <Image preview={false} src={ExampleImage} />
      </StepContentWrapper>
    </StepContainer>
  );
};

const Step2 = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <StepContainer isDesktop={isDesktop}>
      <Space align="center">
        <H3>발화 전사 입력</H3>
        <Popover
          placement="topLeft"
          content={
            <PopoverContent>
              <H4 style={{ fontWeight: "bold" }}>발화 전사자료 샘플 예시</H4>
              <Divider />
              <div style={{ whiteSpace: "pre-wrap" }}>
                {`아 선생님 이 나무 끼우/는 거/ㄴ/요 [실음][실의]
아 나무 끼우* **
아 이렇게 되우는 [실형] 나무 어디 가/ㅆ/지 [실형]?
아 (우와) 난초/다아 선생님 이거 난초/(예)요?
아 화분 [실음][실의]
아 (와) 계단/이다
아 (와) 미끄럼틀/이다
아 (와) 원숭이/다
아 나 얘/가 [실형] 태워 줘/ㅆ/(어)요
아 요 원숭이.
아 네.
아 우리 아빠 (우리) 말 타/ㅆ/는데 [실화].
아 얘 누구/(예)요 선생님?
아 왜 한 짝/이 없/지 신발/이>
아 (아) 요거 똑같/은 거 있/었/는데.
아 없/었/는데 [실형].
아 우리 누나/가 다 버려/ㅆ/는데.
아 네.
아 버려/ㅆ/잖아/요 [실화].`}
              </div>
            </PopoverContent>
          }
        >
          <BiInfoCircle style={{ width: "24px", height: "24px" }} />
        </Popover>
      </Space>
      <StepContentWrapper>
        <H4>1. 발화자 적기</H4>
        <AlertContentWrapper>
          <li>모든 아동의 발화의 맨 앞에는 “아”라고 표시합니다.</li>
          <li>검사자의 경우 “검”이라고 표시합니다.</li>
          <li>엄마의 경우 “엄"이라고 표시한 후 발화를 적습니다.</li>
        </AlertContentWrapper>
      </StepContentWrapper>
      <Divider style={{ margin: 0 }} />
      <StepContentWrapper>
        <H4>2. 발화 내용 입력</H4>
        <AlertContentWrapper>
          <li>어절은 띄어쓰기로, 문법형태소는 /로 표시합니다.</li>
          <li>
            어절과 문법형태소 경계는 사용자가 판단하여 띄어쓰기 또는 /로
            코딩합니다.
          </li>
          <li>
            발화에 []를 활용하여 태그를 붙이면 분석시에 같은 태그가 붙은 발화를
            묶어서 살펴볼 수 있습니다.
          </li>
          <AlertContainer
            message={
              <AlertTitleWrapper>
                <BiInfoCircle
                  size={20}
                  style={{ color: "var(--fg-primary)" }}
                />
                이해가 불가능한 음절이 있을 때
              </AlertTitleWrapper>
            }
            description={
              <AlertContentWrapper>
                <div style={{ paddingLeft: "45px" }}>
                  해당 음절을 ***으로 표시해주세요.
                </div>
              </AlertContentWrapper>
            }
            type="info"
          />
        </AlertContentWrapper>
      </StepContentWrapper>
    </StepContainer>
  );
};

const Step3 = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <StepContainer isDesktop={isDesktop}>
      <Space>
        <H3>분석 결과 확인</H3>
      </Space>
      <StepContentWrapper>
        <H4>1. 발화의 종류를 나누어 보여줍니다.</H4>
        <AlertContentWrapper>
          <li>{"평서(.), 의문(?), 감탄(!) > (겹침), ^(끊어짐)"}</li>
        </AlertContentWrapper>
      </StepContentWrapper>
      <Divider style={{ margin: 0 }} />
      <StepContentWrapper>
        <H4>2. 사용 빈도를 알려줍니다.</H4>
        <AlertContentWrapper>
          <li>
            낱말(명사, 동사, 형용사, 부사, 의존명사)과 문법형태소(조사와 어미)가
            사용된 빈도를 알려줍니다.
          </li>
          <li>
            낱말, 문법형태소, 형태소(낱말+문법형태소)의 빈도를 알려줍니다.
          </li>
          <li>서로 다른 유형수와 총 사용빈도수로 비율도 알려줍니다.</li>
        </AlertContentWrapper>
      </StepContentWrapper>
      <Divider style={{ margin: 0 }} />
      <StepContentWrapper>
        <H4>3. 낱말 리스트</H4>
        <AlertContentWrapper>
          <li>
            각 낱말이 어떻게 문법형태소들과 결합되는 지 빈도와 함께 가나다
            순으로 알려줍니다.
          </li>
        </AlertContentWrapper>
      </StepContentWrapper>
      <Divider style={{ margin: 0 }} />
      <StepContentWrapper>
        <H4>4. 문법형태소 리스트</H4>
        <AlertContentWrapper>
          <li>
            문법형태소가 어절과 결합하여 나타난 위치 수에 따라 리스트들을
            보여줍니다.
          </li>
        </AlertContentWrapper>
      </StepContentWrapper>
    </StepContainer>
  );
};

// Main Component
function UsageInstructions(props) {
  const [step, setStep] = React.useState(1);

  return (
    <UsageInstructionsContainer>
      <NavigationContainer>
        {["정보 입력", "발화 전사 입력", "분석 결과 확인"].map(
          (label, index) => (
            <NavigationButton
              key={index}
              active={step === index + 1}
              onClick={() => setStep(index + 1)}
            >
              <H5>{`${index + 1}단계`}</H5>
              <H4>{label}</H4>
            </NavigationButton>
          )
        )}
      </NavigationContainer>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </UsageInstructionsContainer>
  );
}

export function MobileUsageInstructions(props) {
  const [step, setStep] = React.useState(1);

  return (
    <MobileUsageInstructionsContainer>
      <NavigationContainer style={{ padding: "0px", width: "100%" }}>
        {[<Step1 />, <Step2 />, <Step3 />].map((Component, index) => (
          <React.Fragment key={index}>
            <NavigationButton
              active={step === index + 1}
              onClick={() => setStep(index + 1)}
            >
              <H5>{`${index + 1}단계`}</H5>
              <H4>
                {["정보 입력", "발화 전사 입력", "분석 결과 확인"][index]}
              </H4>
            </NavigationButton>
            {step === index + 1 && Component}
          </React.Fragment>
        ))}
      </NavigationContainer>
    </MobileUsageInstructionsContainer>
  );
}

export default UsageInstructions;

// Styled Components
const UsageInstructionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  background-color: var(--bg-disable);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  height: 100%;
  flex: 1;
`;

const MobileUsageInstructionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  width: 250px;
  height: 100%;
`;

const NavigationButton = styled.div`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.active ? "var(--bg-primary)" : "var(--bg-disable)"};
  color: ${(props) =>
    props.active ? "var(--fg-primary)" : "var(--text-secondary)"};
  cursor: pointer;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: var(--bg-primary);
    color: var(--fg-primary);
  }
`;

const StepContainer = styled.div`
  padding: ${({ isDesktop }) => (isDesktop ? "32px" : "16px")};
  flex: 1;

  background-color: var(--bg-body);
`;

const StepContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px 0;
  box-sizing: border-box;
`;

const AlertContentWrapper = styled(B3)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--text-secondary);
`;

const AlertContainer = styled(Alert)`
  width: 100%;
  margin-top: 16px;
  border: none;
  padding: 10px;
  box-sizing: border-box;
`;

const AlertTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  font-weight: bold;
  padding: 0 10px;
`;

const PopoverContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
`;
