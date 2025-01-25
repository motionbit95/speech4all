import { Divider, Image } from "antd";
import React from "react";
import { ChatIcon } from "../assets/icons";
import styled from "styled-components";
import { H3 } from "./Typography";
import { useMediaQuery } from "react-responsive";

function Card(props) {
  return <div></div>;
}

export function VisionCard(props) {
  const { icon, title } = props;
  return (
    <CardContainer>
      <div
        style={{
          display: icon ? "block" : "none",
          width: "64px",
          height: "64px",
        }}
      >
        <Image preview={false} src={icon} />
      </div>
      <CardHeader>{title}</CardHeader>
      <Divider
        style={{
          margin: "0",
          borderStyle: "dashed",
          borderWidth: "1px",
          borderColor: "#D9D9D9",
        }}
      />
      <CardBody>{props.children}</CardBody>
    </CardContainer>
  );
}

export function ServiceCard(props) {
  const { icon, title } = props;
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <ServiceCardContainer isDesktop={isDesktop}>
      <div
        style={{
          display: icon ? "block" : "none",
          width: "64px",
          height: "64px",
        }}
      >
        <Image preview={false} src={icon} />
      </div>
      <CardHeader>{title}</CardHeader>
      <Divider
        style={{
          margin: "0",
          borderStyle: "dashed",
          borderWidth: "1px",
          borderColor: "#D9D9D9",
        }}
      />
      <CardBody>{props.children}</CardBody>
    </ServiceCardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  box-sizing: border-box;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  width: 100%;

  flex: 1;
  height: 100%;
`;

const ServiceCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  box-sizing: border-box;
  background-color: var(--bg-body);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: ${({ isDesktop }) => (isDesktop ? "254px" : "100%")};

  width: 100%;
  flex: 1;
`;

const CardHeader = styled.div`
  font-size: 18px;
  font-family: "Pretendard", sans-serif;
  color: var(--text-primary);
  font-weight: 600;
`;

const CardBody = styled.div`
  font-size: 14px;
  font-family: "Pretendard", sans-serif;
  color: var(--text-secondary);
  line-height: 24px;
`;

export default Card;
