import React from 'react';
import './KLAAnalysis.css';
import HorizontalBarChart from './HorizontalBarChart';

function KLAAnalysis() {
  const handlePrint = () => {
    window.print(); // 페이지 인쇄
  };

  return (
    <div className="kla-analysis">
      <div className="header-section">
        <div className="kla-title">
          <h1>KLA Korean Language Analysis</h1>
          <p>검사일 | 2024년 7월 8일 &nbsp;&nbsp; 이름 | 말랑핑 &nbsp;&nbsp; 생활연령 | 4세 2개월 &nbsp;&nbsp; 학년 | 미취학</p>
        </div>
        <div className="data-type">
          <h2>자료 유형</h2>
          <label><input type="checkbox" checked /> 자발화</label>
          <label><input type="checkbox" /> 이야기 (□ 회상산출 □ 자발산출)</label>
          <label><input type="checkbox" /> 작문</label>
        </div>
        <div className="data-feature">
          <h2>자료 특성</h2>
          <p>아래 분석 결과는 놀이 및 책 상호작용 상황, 혹은 자연스러운 대화 상황에서 수집된 대상자의 완전 이해 가능한 자발화(50) 발화를 분석하여 동일(연령) 집단과 비교하여 살펴본 준거이다.</p>
        </div>
        <h2>대상자 결과 요약</h2>
      </div>

      <button className="print-button" onClick={handlePrint}>페이지 인쇄</button>

      <table className="data-table">
        <thead>
          <tr>
            <th rowSpan="2">영역</th>
            <th rowSpan="2">측정치</th>
            <th rowSpan="2">결과값</th>
            <th colSpan="9">대상 아동의 위치</th>
          </tr>
          <tr className="position-header">
            <th>-2SD</th>
            <th>-1.5SD</th>
            <th>-1SD</th>
            <th>-0.5SD</th>
            <th>평균</th>
            <th>+0.5SD</th>
            <th>+1SD</th>
            <th>+1.5SD</th>
            <th>+2SD</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="3">의미</td>
            <td>날말 유형수 (NDW)</td>
            <td>64</td>
            <td colSpan="9" className="chart-cell">
              <HorizontalBarChart position="20%" />
            </td>
          </tr>
          <tr>
            <td>날말 빈도수 (NTW)</td>
            <td>159</td>
            <td colSpan="9" className="chart-cell">
              <HorizontalBarChart position="30%" />
            </td>
          </tr>
          <tr>
            <td>어휘 다양도 (TTR)</td>
            <td>0.40</td>
            <td colSpan="9" className="chart-cell">
              <HorizontalBarChart position="25%" />
            </td>
          </tr>
          <tr>
            <td rowSpan="8">문법</td>
            <td>어절로 본 평균발화길이 (MLUe)</td>
            <td>3.18</td>
            <td colSpan="9" className="chart-cell">
              <HorizontalBarChart position="20%" />
            </td>
          </tr>
          <tr>
            <td>형태소로 본 평균발화길이 (MLUm)</td>
            <td>4.52</td>
            <td colSpan="9" className="chart-cell">
              <HorizontalBarChart position="20%" />
            </td>
          </tr>
          <tr>
            <td>문법형태소유형수</td>
            <td>32</td>
            <td colSpan="9" className="chart-cell">
              <HorizontalBarChart position="20%" />
            </td>
          </tr>
          <tr>
            <td>문법형태소빈도수</td>
            <td>67</td>
            <td colSpan="9" className="chart-cell">
              <HorizontalBarChart position="20%" />
            </td>
          </tr>
          <tr>
            <td>문법형태소빈도비율</td>
            <td>0.47</td>
            <td colSpan="9" className="chart-cell">
              <HorizontalBarChart position="20%" />
            </td>
          </tr>
          <tr>
            <td>형태소유형수</td>
            <td>96</td>
            <td colSpan="9" className="chart-cell">
              <HorizontalBarChart position="20%" />
            </td>
          </tr>
          <tr>
            <td>형태소빈도수</td>
            <td>226</td>
            <td colSpan="9" className="chart-cell">
              <HorizontalBarChart position="20%" />
            </td>
          </tr>
          <tr>
            <td>형태소빈도비율</td>
            <td>0.42</td>
            <td colSpan="9" className="chart-cell">
              <HorizontalBarChart position="20%" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default KLAAnalysis;
