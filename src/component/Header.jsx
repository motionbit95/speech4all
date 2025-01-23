import React, { useEffect } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { Layout, Menu, Space } from "antd";
import { BiChevronDown, BiEdit, BiFile, BiHome } from "react-icons/bi";
import { H3, H4 } from "./Typography";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./Button";

const { Header } = Layout;

function TopHeader(props) {
  const { user, onLogout } = props;

  useEffect(() => {
    console.log(user);
  }, [user]);
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: (
        <MenuItem>
          <H4>KLA</H4>{" "}
          <BiChevronDown size="24px" style={{ marginLeft: "4px" }} />
        </MenuItem>
      ),
      children: [
        {
          key: "1-1",
          label: "소개 및 분석방법",
          icon: <BiHome />,
        },
        {
          key: "1-2",
          label: "신규 발화 분석",
          icon: <BiEdit />,
        },
        {
          key: "1-3",
          label: "분석 기록",
          icon: <BiFile />,
        },
      ],
    },
    {
      key: "2",
      label: (
        <MenuItem>
          <H4>언어평가 체크리스트</H4>
        </MenuItem>
      ),
    },
  ];

  return (
    <HeaderContainer>
      <Logo
        size="24px"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Speech4All
      </Logo>
      <MenuContainer
        mode="horizontal"
        theme="light"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
          border: "none",
        }}
      />
      {user ? (
        <Space size={16}>
          <H4
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              color: "var(--text-secondary)",
            }}
          >
            {user.email}
          </H4>
          <SecondaryButton onClick={onLogout} size="large">
            로그아웃
          </SecondaryButton>
        </Space>
      ) : (
        <PrimaryButton onClick={() => navigate("/login")} size="large">
          로그인
        </PrimaryButton>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled(Header)`
  background-color: var(--bg-body);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  gap: 64px;
`;

const MenuContainer = styled(Menu)`
  flex: 1;
  min-width: 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  font-size: 16px;
`;

export default TopHeader;
