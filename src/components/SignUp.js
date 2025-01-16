import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Link 추가
import "./SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("패스워드가 일치하지 않습니다.");
      return;
    }

    setLoading(true); // 요청 시작 시 로딩 상태 활성화
    setErrorMessage(""); // 오류 메시지 초기화
    setSuccessMessage(""); // 성공 메시지 초기화

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/signup`, {
        email,
        password,
      });

      setSuccessMessage(
        "회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다."
      ); // 성공 메시지 설정
      setTimeout(() => {
        navigate("/login"); // 3초 후 로그인 페이지로 이동
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("이미 등록된 이메일입니다.");
      } else {
        setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setLoading(false); // 요청 종료 시 로딩 상태 해제
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>회원가입</h2>
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
              disabled={loading} // 로딩 중 비활성화
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
              disabled={loading} // 로딩 중 비활성화
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">패스워드 확인</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="패스워드를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading} // 로딩 중 비활성화
            />
          </div>
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "처리 중..." : "회원가입"}{" "}
            {/* 로딩 상태에 따라 버튼 텍스트 변경 */}
          </button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div className="login-link">
          <p>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
