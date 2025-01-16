// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Introduction from "./components/Introduction";
import KLA from "./components/KLA/KLA";
// import KLAWorkshop from "./components/KLAWorkshop/KLA";
import Login from "./components/Login";
import SignUp from "./components/SignUp"; // 회원가입 컴포넌트 추가

function App() {
  const [user, setUser] = useState(null); // 로그인 상태 관리

  // 로그인 상태 복원
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // 저장된 사용자 정보를 상태로 복원
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user); // 상태 업데이트
    localStorage.setItem("user", JSON.stringify(user)); // localStorage에 사용자 정보 저장
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/logout`); // 서버로 로그아웃 요청
      setUser(null); // 상태 초기화
      localStorage.removeItem("user"); // localStorage에서 사용자 정보 삭제
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <nav>
            <div className="left-menu">
              <h2>
                <Link to="/">Speech4All</Link>
              </h2>
              <h2>
                <Link to="/kla">KLA</Link>
              </h2>
            </div>
            <div className="right-menu">
              {user ? ( // 로그인 상태에 따라 동적으로 메뉴 변경
                <h2>
                  <span>{user.email}</span>
                  {"  "}
                  <span
                    onClick={handleLogout}
                    style={{ cursor: "pointer", color: "white" }}
                  >
                    로그아웃
                  </span>
                </h2>
              ) : (
                <h2>
                  <Link to="/login">로그인</Link>
                </h2>
              )}
            </div>
          </nav>
        </header>
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/kla/*" element={<KLA user={user} />} />
            {/* <Route path="/kla-workshop/*" element={<KLAWorkshop />} /> */}
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />} // Login 컴포넌트에 로그인 핸들러 전달
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
