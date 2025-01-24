import { Divider, Image } from "antd";
import React from "react";
import { ChatIcon } from "../assets/icons";
import styled from "styled-components";
import { H3 } from "./Typography";

function Card(props) {
  return <div></div>;
}

export function VisionCard(props) {
  const { icon, title } = props;
  return (
    <CardContainer>
      <div style={{ width: "64px", height: "64px" }}>
        <Image preview={false} src={icon} />
      </div>
      <CardHeader>{title}</CardHeader>
      <Divider style={{ margin: "0" }} />
      <CardBody>{props.children}</CardBody>
    </CardContainer>
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
  height: 100%;
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
