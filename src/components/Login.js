import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/login`,
        {
          email,
          password,
        }
      );
      const user = response.data.user; // 서버에서 반환된 user 객체
      onLogin(user); // 로그인 성공 시 부모 컴포넌트로 이메일 전달
      alert(response.data.message); // 로그인 성공 메시지
      navigate("/"); // 로그인 후 홈으로 이동
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("이메일 또는 패스워드가 잘못되었습니다.");
      } else {
        setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">패스워드</label>
            <input
              type="password"
              id="password"
              placeholder="패스워드를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="signup-link">
          <p>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
