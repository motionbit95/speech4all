import React from "react";
import styled from "styled-components";
import { B3, H3, H4 } from "../../../component/Typography";
import { Alert, Col, Row } from "antd";
import { BiInfoCircle } from "react-icons/bi";
import { BallImage, SwingImage } from "../../../assets/images";
import { ServiceCard, VisionCard } from "../../../component/Card";

export const Spontaneous = () => {
  const textSecondary = { color: "var(--text-secondary)" };

  const questions = [
    {
      category: "일상생활",
      examples: [
        "왜 그거 사?",
        "어떻게 만들 거야?",
        "왜 그거 먹고 싶어?",
        "어! ** 없다, 어떡하지?",
        "햄버거 어떻게 만들지?",
        "예전에 마트 가서 그거 왜 산 거야?",
      ],
    },
    {
      category: "동물",
      examples: [
        "우리 *강아지 데리고 공원가자, 어떻게 가지?",
        "넌 왜 그 *강아지 골랐어?",
        "왜 *강아지가 울지?",
        "넌 왜 *강아지가 좋아?",
        "너 동물원 어떻게 갔어?",
      ],
    },
    {
      category: "탈 것",
      examples: [
        "넌 왜 그거(자동차) 골랐어?",
        "(중장비를 가리키며) 이건 무얼 하는 거지?",
        "왜 포크레인이 필요할까?",
      ],
    },
    {
      category: "블록",
      examples: [
        "어떻게 만들지?",
        "그게 왜 필요해?",
        "나 전에 레고로 ** 만들었는데 우와 넌 어떻게 만들었어?",
      ],
    },
  ];

  const selectionCriteria = [
    "자료를 3번 반복해서 들어도 전사가 불가능한 발화는 전사하지 않는다.",
    "모방과 자발화를 구분하지 않고 모두 전사한다.",
    "일부 이해 가능하지 않은 부분이 있는 경우 목표 발화에서 제외한다. (예: 엄마 **으로 불 켜?)",
    "감탄사나 간투사는 분석하지 않는다. (예: 아 (우와) 멋지다, 아 (음) 이따가 보여줄게요.)",
    "음절성발성이나 자곤처럼 의미가 분명하지 않은 발화는 분석에서 제외한다. (예: 아 (으따))",
  ];

  return (
    <ContentContainer>
      <ContentWrapper>
        <H3>1) 자발화 개수</H3>
        <B3 style={textSecondary}>
          본 발화분석 준거의 발화 개수 기준은 "완전 이해 가능한 발화,
          50발화"이다. 따라서 연령대별 측정치 준거를 비교하기 위해서는 연속된
          50발화를 수집해야 한다.
        </B3>
      </ContentWrapper>

      <ContentWrapper>
        <H3>2) 자발화 주제</H3>
        <B3 style={textSecondary}>
          {`본 준거에 포함된 아동의 자발화는 놀이상황 20분, 책 상호작용 5분을 통해 수집하였다. 놀이상황은 4개 주제로 일상생활(소꿉놀이), 동물(동물원, 반려동물), 탈 것(공사장, 다양한 자동차), 블록을 포함하였다. 아동이 흥미를 가지는 장난감을 사용하여 상호작용을 시작하며 만일 발화수가 한정적인 경우 검사자가 다른 놀잇감을 제안할 수 있다.

놀이상황 이외에도 책을 활용하여 5분 정도 발화를 수집할 수 있다. 준거에 포함된 책 상호작용 자발화는 "누가 내 머리에 똥 쌌어?(베르너 홀츠바르트, 사계절)", "아빠와 피자놀이(윌리엄 스타이그, 비룡소)"와 같은 도서를 활용하였다. 아동의 연령이 어리거나 언어 수준이 높지 않다고 판단되는 경우 "누가 내 머리에 똥 쌌어?"를 활용하였으며 아동의 연령이 높고 구어 상호작용이 원활한 경우 "아빠와 피자놀이" 책을 사용하였다. 책은 글자가 써진 부분을 가리고 그림만을 제공하였다. 아동이 스스로 책을 묘사하거나 이야기를 만들도록 두었으며 검사자는 책 끝까지 아동이 볼 수 있도록 독려하였다. 만일 검사 시 동일한 도서가 없는 경우 유사한 수준의 도서를 선정하여 실시할 수 있다.`}
        </B3>
      </ContentWrapper>

      <ContentWrapper>
        <H3>3) 자발화 수집 시 주의사항 및 예시</H3>
        <B3 style={textSecondary}>
          아동에게 특정 발화를 유도하기보다는 아동의 놀이와 발화를 따라가는 것이
          중요하다. 특히 의문사를 활용한 개방형 질문을 하도록 해야 한다. 놀이와
          더불어 과거 경험 말하기를 유도하는 것도 바람직하다. 아동이 좋아하는
          관심사(유튜브, 만화영화, 캐릭터)에 대한 질문을 넣어 아동 스스로 길게
          설명하거나 묘사할 기회를 제공해야 한다.
        </B3>
        <AlertContainer
          message={
            <AlertTitleWrapper>
              <BiInfoCircle size={20} style={{ color: "var(--fg-primary)" }} />{" "}
              질문 예시
            </AlertTitleWrapper>
          }
          description={<QuestionList questions={questions} />}
          type="info"
        />
      </ContentWrapper>

      <ContentWrapper>
        <H3>4) 자발화 선정 기준</H3>
        <B3 style={textSecondary}>
          다음 자발화 선정 기준은 정경희, 배소영, 김기숙 (2006)을 일부 수정 및
          보완하였다.
        </B3>
        <AlertSection criteria={selectionCriteria} />
      </ContentWrapper>
    </ContentContainer>
  );
};

const QuestionList = ({ questions }) => (
  <AlertContentWrapper>
    {questions.map(({ category, examples }, idx) => (
      <li key={idx} style={{ listStyleType: "none" }}>
        {idx + 1}. {category}: {examples.join(" ")}
      </li>
    ))}
  </AlertContentWrapper>
);

const AlertSection = ({ criteria }) => (
  <AlertContainer
    description={
      <AlertTitleWrapper>
        <AlertContentWrapper>
          {criteria.map((text, idx) => (
            <li key={idx}>{text}</li>
          ))}
        </AlertContentWrapper>
      </AlertTitleWrapper>
    }
    type="info"
  />
);

export const Story = ({ isDesktop }) => {
  const textSecondary = { color: "var(--text-secondary)" };

  const storyData = [
    {
      key: "swing",
      icon: SwingImage,
      title: "그네 이야기",
      names: "민이, 돌이",
    },
    { key: "ball", icon: BallImage, title: "공 이야기", names: "순이, 돌이" },
  ];

  const StorySection = ({ title, instruction, isRecall }) => (
    <Row gutter={[16, 16]}>
      {storyData.map(({ key, icon, title, names }) => (
        <Col key={key} span={isDesktop ? 12 : 24}>
          <VisionCard icon={icon} title={title}>
            <li>{instruction(names)}</li>
            <li>그림을 보고 아동이 스스로 이야기를 산출하도록 한다.</li>
            <li>
              아동이 스스로 이야기를 시작하는 것을 어려워할 경우, 도입문장을
              들려주고 아동이 이어서 이야기를 할 수 있도록 유도한다. (예: "
              {names.split(",")[0]}하고 {names.split(",")[1]}가 있었어요. 자
              이야기 해 줄래요?")
            </li>
          </VisionCard>
        </Col>
      ))}
    </Row>
  );

  return (
    <ContentContainer>
      <ContentWrapper>
        <H3>1) 자료 수집 도구</H3>
        <B3 style={textSecondary}>
          한국어 이야기 평가(KONA; 권유진, 진연선, 배소영, 2016) : 학령전기용
        </B3>
      </ContentWrapper>
      <ContentWrapper>
        <H3>2) 자료 수집 절차</H3>
        <H4>(1) 자발산출</H4>
        <StorySection
          title="자발산출"
          instruction={(names) =>
            `그네이야기 그림카드를 보여주고 등장인물(${names})의 이름을 알려준다.`
          }
        />
        <H4>(2) 회상산출</H4>
        <StorySection
          title="회상산출"
          instruction={(names) =>
            `그네이야기 그림카드를 보여주며 지시문을 들려준다. (예: "잘 듣고 기억했다가 나중에 다시 말해줘야 해요.")`
          }
          isRecall
        />
      </ContentWrapper>
      <ContentWrapper>
        <H3>3) 자료 수집 시 주의사항</H3>
        <AlertContainer
          description={
            <AlertTitleWrapper>
              <AlertContentWrapper>
                <li>
                  검사자는 아동이 이야기를 산출하는 동안 간단한 끄덕임, 중립적인
                  표현(예: "응~") 위주로만 반응한다.
                </li>
                <li>
                  아동이 이야기를 산출하다가 멈추면 "그리고?", "또?", "그
                  다음?"과 같은 간단한 촉진을 제공한다.
                </li>
                <li>
                  아동이 반응하지 않으면 "다했어요?"를 물어보고 검사를 중단한다.
                </li>
                <li>과한 촉진을 통해 아동의 이야기 산출을 유도하지 않는다.</li>
              </AlertContentWrapper>
            </AlertTitleWrapper>
          }
          type="info"
        />
      </ContentWrapper>
    </ContentContainer>
  );
};

export const Write = ({ isDesktop }) => {
  const writingTasks = [
    { title: "공통 연습문항", content: "버스타기" },
    { title: "1~2학년 본문항", content: "현장학습 / 가방싸기" },
    { title: "3~4학년 본문항", content: "개학날 / 아침조회" },
    { title: "5~6학년 본문항", content: "여름방학 / 예주의 숙제" },
  ];

  const procedures = [
    {
      title: "연습문항",
      steps: [
        "검사지를 제시하고 지시문을 들려준다.",
        "아동이 작성을 완료한 후에 미완성 문장을 완성하고 한 문장을 추가로 작성했는지 확인하여 이해를 돕는다.",
      ],
    },
    {
      title: "본문항",
      steps: [
        "본문항은 20분 동안 실시한다.",
        "학년에 맞게 검사지를 제시하고 지시문을 들려준다. 학년별로 요구되는 문장 수를 맞춰 작성하도록 한다.",
        "첫 번째 본문항을 끝낸 후 두 번째 본문항도 동일하게 실시한다.",
      ],
    },
  ];

  const precautions = [
    "본문항에서 아동이 요구된 문장 수를 다 작성하지 않더라도 추가적인 문장 쓰기를 요구하지 않는다.",
    "제한시간 20분을 초과할 경우, 작성한 부분까지만 분석한다.",
    "분석할 때는 연습문항을 제외한 본문항 두 개를 통합하여 분석한다.",
    `분석할 때 검사지의 미완성 문장부터 아동이 작성한 문장을 분석한다.
현장학습 : 왜냐하면 ~~
가방싸기 : 태희/는 가방/에 간식/을 넣/을 수 없/어서 ~~
개학날 : 보라/는 오늘 처음 이 학교/에 와/ㅆ/고, ~~
아침조회 : 교장 선생님/께서/는 ~~
여름방학 : 학교/가 싫/었/다는 뜻/은 아니/고, ~~
예주의 숙제 : 이제 2 주일 후/면 숙제/를 제출/을 해/야 하/는데, ~~`,
    "쓰기 과제 두 개를 모두 완성한 경우만 결과 비교가 가능하다.",
  ];

  return (
    <ContentContainer>
      <ContentWrapper>
        <H3>1) 자료 수집 도구</H3>
        <B3 style={{ color: "var(--text-secondary)" }}>
          한국판 핵심언어 임상평가(K-CELF-5; 배소영 외, 2023) : 문장 쓰기
        </B3>
        <Row gutter={[16, 16]}>
          {writingTasks.map(({ title, content }) => (
            <Col key={title} xs={24} md={12} xl={6}>
              <ServiceCard title={title}>
                <H4>{content}</H4>
              </ServiceCard>
            </Col>
          ))}
        </Row>
      </ContentWrapper>

      <ContentWrapper>
        <H3>2) 자료 수집 절차</H3>
        <Row gutter={[16, 16]}>
          {procedures.map(({ title, steps }) => (
            <Col key={title} span={isDesktop ? 12 : 24}>
              <VisionCard title={title}>
                {steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </VisionCard>
            </Col>
          ))}
        </Row>
      </ContentWrapper>

      <ContentWrapper>
        <H3>3) 자료 수집 시 주의사항</H3>
        <AlertContainer
          description={
            <AlertTitleWrapper>
              <AlertContentWrapper>
                {precautions.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </AlertContentWrapper>
            </AlertTitleWrapper>
          }
          type="info"
        />
      </ContentWrapper>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  paddding: 10px;
  box-sizing: border-box;
  width: 100%;
`;

const AlertContainer = styled(Alert)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  border: none;
`;

const AlertTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  font-weight: bold;
`;

const AlertContentWrapper = styled.div`
  padding-left: 20px;
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: normal;
`;
