// src/components/KLA/KLA.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FaHome, FaPen, FaClipboardList, FaDollarSign } from "react-icons/fa";
import KLAIntro from "./KLAIntro";
import KLAInput from "./KLAInput";
import KLAResult from "./KLAResult";
import KLANotice from "./KLANotice";
import KLAHistory from "./KLAHistory";
import ProtectedRoute from "../../ProtectedRoute"; // ProtectedRoute 추가
import "./KLA.css";

function KLA({ user }) {
  return (
    <div className="kla-container">
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/kla/intro">
              <FaHome /> 소개 및 분석방법
            </Link>
          </li>
          <li>
            <Link
              to={user ? "/kla/input" : "/kla/intro"}
              onClick={() => {
                if (!user) {
                  alert("로그인이 필요합니다.");
                }
              }}
            >
              <FaPen /> 신규발화분석
            </Link>
          </li>
          <li>
            <Link
              to={user ? "/kla/history" : "/kla/intro"}
              onClick={() => {
                if (!user) {
                  alert("로그인이 필요합니다.");
                }
              }}
            >
              <FaClipboardList /> 분석 기록
            </Link>
          </li>
          {/* PDF 링크 추가 */}
          <li>
            <a
              href="/kla_pricing.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDollarSign /> KLA Pricing
            </a>
          </li>
        </ul>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<KLAIntro />} />
          <Route path="/intro" element={<KLAIntro />} />
          <Route
            path="/input"
            element={
              <ProtectedRoute user={user}>
                <KLAInput user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute user={user}>
                <KLAHistory user={user} />
              </ProtectedRoute>
            }
          />
          <Route path="/notice" element={<KLANotice />} />
          <Route
            path="/result"
            element={
              <ProtectedRoute user={user}>
                <KLAResult />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default KLA;
