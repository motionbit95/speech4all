// src/components/KLA/KLAInput.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./KLAInput.css";

function KLAInput({ user }) {
  const [formData, setFormData] = useState({
    name: "홍길동",
    gender: "남",
    examdate: "2023-07-11",
    birthday: "2017-05-17",
    examiner: "피민경",
    school: "유치원",
    grade: "미취학",
    region: "강원도",
    institution: "한림언어청각센터",
    inputText: "",
    utteranceType: "자발화",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      gender,
      examdate,
      birthday,
      examiner,
      school,
      grade,
      region,
      institution,
      inputText,
      utteranceType,
    } = formData;
    const fullInputText = `
+이름 ${name}
+성별 ${gender}
+검사일 ${examdate}
+생년월일 ${birthday}
+검사자 ${examiner}
+교육기관 ${school}
+학년 ${grade}
+평가지역 ${region}
+평가기관 ${institution}
+발화종류 ${utteranceType}
${inputText}`;
    navigate("/kla/result", { state: { inputText: fullInputText, user } });
  };

  return (
    <div>
      <div className="panel">
        <div className="panel-heading">
          <h5 className="panel-title">발화자 정보</h5>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit}>
            <table className="info-table">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name">이름</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>성별</label>
                  </td>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="남"
                        checked={formData.gender === "남"}
                        onChange={handleChange}
                      />
                      남
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="여"
                        checked={formData.gender === "여"}
                        onChange={handleChange}
                      />
                      여
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="examdate">검사일</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      id="examdate"
                      name="examdate"
                      className="form-control"
                      value={formData.examdate}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="birthday">생년월일</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      id="birthday"
                      name="birthday"
                      className="form-control"
                      value={formData.birthday}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="examiner">검사자</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="examiner"
                      name="examiner"
                      className="form-control"
                      value={formData.examiner}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>교육기관</label>
                  </td>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name="school"
                        value="어린이집"
                        checked={formData.school === "어린이집"}
                        onChange={handleChange}
                      />
                      어린이집
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="school"
                        value="유치원"
                        checked={formData.school === "유치원"}
                        onChange={handleChange}
                      />
                      유치원
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="school"
                        value="초등학교"
                        checked={formData.school === "초등학교"}
                        onChange={handleChange}
                      />
                      초등학교
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="school"
                        value="해당없음"
                        checked={formData.school === "해당없음"}
                        onChange={handleChange}
                      />
                      해당없음
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>학년</label>
                  </td>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name="grade"
                        value="미취학"
                        checked={formData.grade === "미취학"}
                        onChange={handleChange}
                      />
                      미취학
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="grade"
                        value="1학년"
                        checked={formData.grade === "1학년"}
                        onChange={handleChange}
                      />
                      1학년
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="grade"
                        value="2학년"
                        checked={formData.grade === "2학년"}
                        onChange={handleChange}
                      />
                      2학년
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="grade"
                        value="3학년"
                        checked={formData.grade === "3학년"}
                        onChange={handleChange}
                      />
                      3학년
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="grade"
                        value="4학년"
                        checked={formData.grade === "4학년"}
                        onChange={handleChange}
                      />
                      4학년
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="grade"
                        value="5학년"
                        checked={formData.grade === "5학년"}
                        onChange={handleChange}
                      />
                      5학년
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="grade"
                        value="6학년"
                        checked={formData.grade === "6학년"}
                        onChange={handleChange}
                      />
                      6학년
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="region">평가지역</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="region"
                      name="region"
                      className="form-control"
                      value={formData.region}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="institution">평가기관</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      className="form-control"
                      value={formData.institution}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 발화 종류 선택 라디오 버튼 추가 */}
            <div className="panel-heading pt-40">
              <h5 className="panel-title">발화 종류</h5>
            </div>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="utteranceType"
                  value="자발화"
                  checked={formData.utteranceType === "자발화"}
                  onChange={handleChange}
                />
                자발화
              </label>
              <label>
                <input
                  type="radio"
                  name="utteranceType"
                  value="이야기(회상산출)"
                  checked={formData.utteranceType === "이야기(회상산출)"}
                  onChange={handleChange}
                />
                이야기(회상산출)
              </label>
              <label>
                <input
                  type="radio"
                  name="utteranceType"
                  value="이야기(자발산출)"
                  checked={formData.utteranceType === "이야기(자발산출)"}
                  onChange={handleChange}
                />
                이야기(자발산출)
              </label>
              <label>
                <input
                  type="radio"
                  name="utteranceType"
                  value="작문"
                  checked={formData.utteranceType === "작문"}
                  onChange={handleChange}
                />
                작문
              </label>
            </div>

            <div className="panel-heading pt-40">
              <h5 className="panel-title">전사 데이터</h5>
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                id="transcriptionData"
                name="inputText"
                rows="20"
                value={formData.inputText}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              분석합니다 <span className="fa fa-arrow-right"></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default KLAInput;
