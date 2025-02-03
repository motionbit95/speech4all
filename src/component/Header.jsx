import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { Space, Drawer } from "antd";
import {
  BiArrowBack,
  BiChevronDown,
  BiEdit,
  BiFile,
  BiHome,
  BiMenu,
} from "react-icons/bi";
import { H3, H4 } from "./Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./Button";
import { useMediaQuery } from "react-responsive";
import { FaHamburger } from "react-icons/fa";

function TopHeader(props) {
  const { user, onLogout } = props;
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  useEffect(() => {
    setOpenSubmenu(null); // Close submenu when the path changes
  }, [location.pathname]);

  const toggleSubmenu = (key) => {
    setOpenSubmenu((prev) => (prev === key ? null : key));
  };

  const submenuItems = {
    kla: [
      { key: "kla/intro", label: "소개 및 분석방법", icon: <BiHome /> },
      { key: "kla/input", label: "신규 발화 분석", icon: <BiEdit /> },
      { key: "kla/history", label: "분석 기록", icon: <BiFile /> },
    ],
    sle: [
      { key: "sle/intro", label: "체크리스트 소개", icon: <BiHome /> },
      { key: "sle/input", label: "분석하기", icon: <BiEdit /> },
    ],
  };

  const handleDrawerToggle = () => {
    setDrawerVisible(!drawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const menuContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-between",
        height: "100%",
      }}
    >
      <MenuWrapper isDesktop={isDesktop}>
        <MenuItem onClick={() => toggleSubmenu("kla")}>
          <H4>KLA</H4>
          <BiChevronDown size="24px" style={{ marginLeft: "4px" }} />
        </MenuItem>
        <div style={{ display: openSubmenu === "kla" ? "block" : "none" }}>
          {submenuItems.kla.map((item) => (
            <SubmenuItem
              key={item.key}
              onClick={() => {
                navigate(`/${item.key}`);
                closeDrawer();
              }}
              isDesktop={isDesktop}
            >
              {item.icon}
              <span>{item.label}</span>
            </SubmenuItem>
          ))}
        </div>

        <MenuItem onClick={() => toggleSubmenu("sle")}>
          <H4>말 언어 문해기초 선별 체크리스트</H4>
          <BiChevronDown size="24px" style={{ marginLeft: "4px" }} />
        </MenuItem>
        <div style={{ display: openSubmenu === "sle" ? "block" : "none" }}>
          {submenuItems.sle.map((item) => (
            <SubmenuItem
              key={item.key}
              onClick={() => {
                navigate(`/${item.key}`);
                closeDrawer();
              }}
              isDesktop={isDesktop}
            >
              {item.icon}
              <span>{item.label}</span>
            </SubmenuItem>
          ))}
        </div>
      </MenuWrapper>
      {user ? (
        <Space size={16} style={{ display: "flex", flexDirection: "column" }}>
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
    </div>
  );

  return (
    <HeaderContainer>
      <Logo
        size="24px"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Speech4All
      </Logo>
      {!isDesktop ? (
        <>
          <HamburgerMenu />
          <BiMenu onClick={handleDrawerToggle} size="24px" />
          <Drawer
            title="메뉴"
            placement="right"
            onClose={closeDrawer}
            visible={drawerVisible}
            width={300}
          >
            {menuContent}
          </Drawer>
        </>
      ) : (
        <>
          <MenuWrapper isDesktop={isDesktop}>
            <MenuItem onClick={() => toggleSubmenu("kla")}>
              <H4>KLA</H4>
              <BiChevronDown size="24px" style={{ marginLeft: "4px" }} />
              <Submenu isOpen={openSubmenu === "kla"}>
                {submenuItems.kla.map((item) => (
                  <SubmenuItem
                    isDesktop={isDesktop}
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

            <MenuItem onClick={() => toggleSubmenu("sle")}>
              <H4>말 언어 문해기초 선별 체크리스트</H4>
              <BiChevronDown size="24px" style={{ marginLeft: "4px" }} />
              <Submenu isOpen={openSubmenu === "sle"}>
                {submenuItems.sle.map((item) => (
                  <SubmenuItem
                    isDesktop={isDesktop}
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
        </>
      )}
    </HeaderContainer>
  );
}

export function PageHeader(props) {
  const { title, onSubmit, buttonText } = props;
  const navigate = useNavigate();
  return (
    <PageHeaderContainer>
      <Space size={16}>
        <BiArrowBack size="24px" onClick={() => navigate(-1)} />
        <H3>{title}</H3>
      </Space>
      {buttonText && (
        <PrimaryButton size="large" onClick={onSubmit}>
          {buttonText}
        </PrimaryButton>
      )}
      {props.children}
    </PageHeaderContainer>
  );
}

const PageHeaderContainer = styled.header`
  background-color: var(--bg-body);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 36px;
  box-sizing: border-box;

  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  border-bottom: 1px solid var(--border-component);
`;

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
  // gap: 64px;
`;

const MenuWrapper = styled.nav`
  display: flex;
  flex: 1;
  gap: ${({ isDesktop }) => (isDesktop ? "32px" : "16px")};
  flex-direction: ${({ isDesktop }) => (isDesktop ? "row" : "column")};
  justify-content: flex-start;
  padding-left: ${({ isDesktop }) => (isDesktop ? "64px" : "0")};
`;

const HamburgerMenu = styled.div`
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  background-color: red;
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
  opacity: 0;
  transform: translateY(-10px);
  visibility: hidden;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out, visibility 0.3s;

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
  font-size: 15px;

  &:hover {
    background: var(--bg-primary);
    color: var(--fg-primary);
  }

  span {
    margin-left: 8px;
  }
`;

export default TopHeader;
