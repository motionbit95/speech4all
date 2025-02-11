import { Divider, Image } from "antd";
import React from "react";
import styled from "styled-components";
import { B3, H1, H4 } from "./Typography";
import { useMediaQuery } from "react-responsive";

function Card(props) {
  return <div></div>;
}

export function VisionCard(props) {
  const { iconType, icon, title } = props;
  return (
    <CardContainer>
      <div
        style={{
          display: icon ? "block" : "none",
          width: "64px",
          height: "64px",
        }}
      >
        {iconType === "emoji" ? (
          <H1 style={{ fontSize: "48px" }}>{icon}</H1>
        ) : (
          <Image preview={false} src={icon} />
        )}
      </div>
      <CardHeader>
        <H4>{title}</H4>
      </CardHeader>
      <Divider
        style={{
          margin: "0",
          borderStyle: "dashed",
          borderWidth: "1px",
          borderColor: "#D9D9D9",
        }}
      />
      <CardBody>
        <B3>{props.children}</B3>
      </CardBody>
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
      <CardHeader>
        <H4>{title}</H4>
      </CardHeader>
      <Divider
        style={{
          margin: "0",
          borderStyle: "dashed",
          borderWidth: "1px",
          borderColor: "#D9D9D9",
        }}
      />
      <CardBody>
        <B3>{props.children}</B3>
      </CardBody>
    </ServiceCardContainer>
  );
}

export function DescriptionCard(props) {
  const { title } = props;
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <ServiceCardContainer isDesktop={isDesktop}>
      <CardHeader style={{ alignItems: "flex-start", width: "100%" }}>
        <H4>📌 {title}</H4>
      </CardHeader>
      <CardBody>
        <B3>{props.children}</B3>
      </CardBody>
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
  font-family: "Pretendard", sans-serif;
  color: var(--text-primary);
  font-weight: 600;
`;

const CardBody = styled.div`
  font-family: "Pretendard", sans-serif;
  color: var(--text-secondary);
  line-height: 1.6;
`;

export default Card;
