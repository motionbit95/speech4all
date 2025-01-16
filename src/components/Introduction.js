// src/components/Introduction.js
import React, { useState, useEffect } from "react";
import "./Introduction.css";
import Footer from "./Footer"; // Footer 컴포넌트 임포트

function Introduction() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`introduction ${animate ? "animate" : ""}`}>
      <div className="introduction-content">
        <div className="introduction-text-content">
          <h1 className="introduction-text-content-title">
            모두의 말소리,{" "}
            <span className="introduction-text-content-highlight">
              Speech4All
            </span>
          </h1>
          <p className="introduction-text-content-subtitle">
            AI 음성인식 기술을 기반으로 하는 말소리와 발화 분석 전문 회사
          </p>

          <div className="introduction-text-content-values">
            <h2 className="introduction-text-content-section-title">
              추구하는 가치와 방향
            </h2>
            <ul className="introduction-text-content-value-list">
              <li>
                <strong>경청하다, Listen:</strong> 사용자의 의사소통 경험을 깊이
                이해하고, 경청하여, 각 개인의 요구에 맞는 지원을 제공합니다.
                이는 효과적인 의사소통 기술의 기반을 마련합니다.
              </li>
              <li>
                <strong>인식하다, Recognize:</strong> 다양한 음성과 발화 패턴을
                정밀하게 인식하여, 발화의 특징을 감지하고, 의사소통 경험을
                개선할 수 있는 통찰과 도구를 제공합니다.
              </li>
              <li>
                <strong>지원하다, Support:</strong> 기술적 자원을 활용하여
                사용자가 자신의 생각을 명확하고 자신감 있게 표현할 수 있도록
                지원합니다.
              </li>
              <li>
                <strong>연결하다, Connect:</strong> 기술을 통해 개인들이 서로와
                더 깊이 연결되고 소통할 수 있도록, 커뮤니티 내에서 의미 있는
                관계를 형성하고 유지할 수 있게 합니다.
              </li>
            </ul>
          </div>
        </div>
        <div className="image-container">
          <img
            src="speech4all_main.jpg"
            alt="Speech4All"
            className="main-image"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Introduction;
