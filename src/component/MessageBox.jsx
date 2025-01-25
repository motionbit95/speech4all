import { Modal } from "antd";
import React from "react";
import styled from "styled-components";

function MessageBox(props) {
  return (
    <Modal
      {...props}
      title={
        <TitleWrapper>
          {props.icon}
          {props.title}
        </TitleWrapper>
      }
      footer={null}
      className="modal"
    >
      <ContentContainer>{props.children}</ContentContainer>
    </Modal>
  );
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1890ff;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  box-sizing: border-box;
`;

export default MessageBox;
