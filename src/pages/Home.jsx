import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Image } from "antd";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import styled from "styled-components";
import { BsArrowRight } from "react-icons/bs";

import { HeroImage } from "../assets/images";
import { VisionCard } from "../component/Card";
import { B3, H1, H2 } from "../component/Typography";
import { DarkButton } from "../component/Button";
import { visionItems } from "../data/visionData";
import { useAnimatedInView } from "../hooks/useAnimatedInView";

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
  const [ref, controls] = useAnimatedInView(0.1);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        isMobile={isMobile}
        fadeIn={fadeIn}
        fadeInUp={fadeInUp}
        navigate={navigate}
      />

      {/* Vision Section */}
      <VisionSection ref={ref} isMobile={isMobile} visionItems={visionItems} />
    </div>
  );
};

// Hero Section as a separate component for better reusability and readability
const HeroSection = ({ isMobile, fadeIn, fadeInUp, navigate }) => (
  <HeroContainer
    as={motion.div}
    initial="hidden"
    animate="visible"
    isMobile={isMobile}
    variants={fadeIn}
  >
    <HeroWrapper as={motion.div} variants={fadeInUp}>
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
        onClick={() => navigate("/kla/intro")}
      >
        서비스 시작하기
      </DarkButton>
    </HeroWrapper>
    <Image
      preview={false}
      src={HeroImage}
      style={{ width: "100vw", height: "auto", objectFit: "cover" }}
    />
  </HeroContainer>
);

// Vision Section as a separate component
const VisionSection = React.forwardRef(({ isMobile, visionItems }, ref) => (
  <VisionContainer ref={ref} isMobile={isMobile}>
    <H2>추구하는 가치와 방향</H2>
    <SubText>{`Speech4All의 핵심가치\n경청하다, 인식하다, 지원하다, 연결하다`}</SubText>
    <Row gutter={[16, 16]}>
      {visionItems.map((item, index) => (
        <VisionCardItem key={index} {...item} delay={index * 0.2} />
      ))}
    </Row>
  </VisionContainer>
));

// VisionCardItem component for individual vision cards
const VisionCardItem = ({ icon, title, description, delay }) => {
  const [ref, controls] = useAnimatedInView(0.2);

  const cardAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  };

  return (
    <Col xs={24} md={12} xl={6}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={cardAnimation}
        style={{ height: "100%" }}
      >
        <VisionCard icon={icon} title={title}>
          {description.map((text, idx) => (
            <li key={idx}>{text}</li>
          ))}
        </VisionCard>
      </motion.div>
    </Col>
  );
};

// Styled Components for layout and styling
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
