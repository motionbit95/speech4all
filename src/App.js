import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./assets/styles/global.css";
import Login from "./pages/Account/Login";
import Signup from "./pages/Account/Signup";
import { ConfigProvider } from "antd";
import theme from "./assets/styles/theme";
import styled from "styled-components";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import KLA from "./pages/KLA";
import SLE from "./pages/SLE";
import MyPage from "./pages/Account/MyPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/logout`);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <ConfigProvider theme={theme}>
      <Router>
        <AppContent user={user} onLogout={handleLogout} onLogin={handleLogin} />
      </Router>
    </ConfigProvider>
  );
}

function AppContent({ user, onLogout, onLogin }) {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/signup"];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <MainContainer>
      {showHeader && <Header user={user} onLogout={onLogout} />}
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kla/*" element={<KLA user={user} />} />
          <Route path="/sle/*" element={<SLE user={user} />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage user={user} />} />
        </Routes>
      </PageWrapper>
      {showHeader && <Footer />}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`;

const PageWrapper = styled.div`
  min-width: 280px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
`;

export default App;
