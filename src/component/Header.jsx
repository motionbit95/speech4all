import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { Space } from "antd";
import { BiChevronDown, BiEdit, BiFile, BiHome } from "react-icons/bi";
import { H4 } from "./Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./Button";

function TopHeader(props) {
  const { user, onLogout } = props;
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setOpenSubmenu(null); // 경로 변경 시 서브메뉴 닫기
  }, [location.pathname]); // pathname이 변경될 때마다 실행

  const toggleSubmenu = (key) => {
    setOpenSubmenu((prev) => (prev === key ? null : key));
  };

  const submenuItems = {
    kla: [
      { key: "kla/intro", label: "소개 및 분석방법", icon: <BiHome /> },
      { key: "1-2", label: "신규 발화 분석", icon: <BiEdit /> },
      { key: "1-3", label: "분석 기록", icon: <BiFile /> },
    ],
  };

  return (
    <HeaderContainer>
      <Logo
        size="24px"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Speech4All
      </Logo>
      <MenuWrapper>
        <MenuItem onClick={() => toggleSubmenu("kla")}>
          <H4>KLA</H4>
          <BiChevronDown size="24px" style={{ marginLeft: "4px" }} />
          <Submenu isOpen={openSubmenu === "kla"}>
            {submenuItems.kla.map((item) => (
              <SubmenuItem
                key={item.key}
                onClick={() => {
                  navigate(`/${item.key}`);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </SubmenuItem>
            ))}
          </Submenu>
        </MenuItem>

        <MenuItem onClick={() => navigate("/checklist")}>
          <H4>언어평가 체크리스트</H4>
        </MenuItem>
      </MenuWrapper>
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

const HeaderContainer = styled.header`
  background-color: var(--bg-body);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  gap: 64px;
`;

const MenuWrapper = styled.nav`
  display: flex;
  flex: 1;
  gap: 32px;
  justify-content: flex-start;
`;

const Submenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  margin-top: 8px;
  background: white;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
  padding: 16px 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;

  // 기본적으로 안 보이게 설정
  opacity: 0;
  transform: translateY(-10px);
  visibility: hidden;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out, visibility 0.3s;

  // isOpen이 true일 때 활성화
  ${({ isOpen }) =>
    isOpen &&
    `
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  `}
`;

const MenuItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  gap: 10px;
`;

const SubmenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 10px;

  &:hover {
    background: var(--bg-primary);
    color: var(--fg-primary);
  }

  span {
    margin-left: 8px;
  }
`;

export default TopHeader;
