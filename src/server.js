const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // bcryptjs로 변경
require("dotenv").config();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const { templeteHTML } = require("./templete");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname); // Unique file name
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000", // 클라이언트 도메인
  credentials: true, // 자격 증명 허용
};

app.use(cors(corsOptions));

// DELETE 요청을 포함한 모든 Preflight 요청 처리
app.options("*", cors(corsOptions));

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("요청 본문:", req.body);
  }
  next();
});

// MySQL 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST, // MySQL 서버 이름
  user: process.env.DB_USER, // MySQL 사용자명
  password: process.env.DB_PASSWORD, // MySQL 비밀번호
  database: process.env.DB_NAME, // 데이터베이스 이름
});

db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
  } else {
    console.log("MySQL 연결 성공");
  }
});

// 로그인 API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      res.status(500).json({ message: "서버 오류" });
    } else if (results.length > 0) {
      const user = results[0];
      //console.log(user);
      const isMatch = await bcrypt.compare(password, user.password); // 비밀번호 비교
      if (isMatch) {
        res.status(200).json({ message: "로그인 성공", user });
      } else {
        res
          .status(401)
          .json({ message: "이메일 또는 패스워드가 잘못되었습니다." });
      }
    } else {
      res
        .status(401)
        .json({ message: "이메일 또는 패스워드가 잘못되었습니다." });
    }
  });
});

// 회원가입 API
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 이메일 중복 확인
    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(409).json({ message: "이미 등록된 이메일입니다." });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 추가
    await db
      .promise()
      .query("INSERT INTO users (email, password) VALUES (?, ?)", [
        email,
        hashedPassword,
      ]);

    res.status(201).json({ message: "회원가입 성공!" });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

app.post("/api/logout", (req, res) => {
  // 세션을 제거하거나 토큰을 무효화
  // 예: 세션이 있다면 req.session.destroy();
  res.status(200).json({ message: "로그아웃 성공" });
});

// 분석 결과 저장 API
app.post("/api/saveAnalysis", upload.single("pdf_path"), async (req, res) => {
  const {
    user_id,
    client_name,
    client_birthday,
    client_gender,
    analysis_date,
    input_text,
    analysis_result,
  } = req.body;

  try {
    const query = `
      INSERT INTO data 
      (user_id, client_name, client_birthday, client_gender, analysis_date, input_text, analysis_result, pdf_path) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    console.log(
      user_id,
      client_name,
      client_birthday,
      client_gender,
      analysis_date,
      input_text,
      JSON.stringify(analysis_result),
      req.file.filename
    );

    const [result] = await db
      .promise()
      .query(query, [
        user_id,
        client_name,
        client_birthday,
        client_gender,
        analysis_date,
        input_text,
        JSON.stringify(analysis_result),
        req.file.filename,
      ]);

    res.status(201).json({
      message: "데이터 저장 성공",
      dataId: result.insertId,
    });
  } catch (error) {
    console.error("데이터 저장 실패:", error);
    res.status(500).json({ message: "서버 오류: 데이터 저장 실패" });
  }
});

app.get("/api/history", async (req, res) => {
  const userId = req.query.user_id; // 사용자 ID를 쿼리로 전달받음
  console.log("userId:", userId);

  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM data WHERE user_id = ?", [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("분석 기록 불러오기 오류:", error);
    res.status(500).json({ message: "서버 오류: 기록을 불러올 수 없습니다." });
  }
});

// 분석 기록 삭제 API
app.delete("/api/history/:id", async (req, res) => {
  const recordId = req.params.id; // URL에서 기록 ID 가져오기
  console.log(`Deleting record with ID: ${recordId}`); // 삭제 요청 로깅
  try {
    const query = "DELETE FROM data WHERE id = ?";
    const [result] = await db.promise().query(query, [recordId]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "삭제할 데이터를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "데이터가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("삭제 실패:", error);
    res.status(500).json({ message: "서버 오류: 삭제 실패" });
  }
});

app.get("/api/downloadPDF/:dataId", async (req, res) => {
  const { dataId } = req.params;
  const query = "SELECT pdf_path FROM data WHERE id = ?";
  const [result] = await db.promise().query(query, [dataId]);
  const pdfFileName = result[0].pdf_path;

  if (!pdfFileName) {
    return res.status(404).json({ message: "PDF 파일이 존재하지 않습니다." });
  }

  // Construct the full path to the PDF file in the 'uploads' directory
  const pdfFilePath = path.join(__dirname, "uploads", pdfFileName);

  // Check if the file exists
  if (fs.existsSync(pdfFilePath)) {
    // Send the file to the client
    res.download(pdfFilePath, pdfFileName, (err) => {
      if (err) {
        console.error("파일 다운로드 중 오류 발생:", err);
        res
          .status(500)
          .json({ message: "파일 다운로드 중 오류가 발생했습니다." });
      }
    });
  } else {
    res.status(404).json({ message: "PDF 파일을 찾을 수 없습니다." });
  }
});

// POST 요청으로 RTF 텍스트를 받아서 HTML로 변환
app.post("/api/convert-rtf", (req, res) => {
  const { data } = req.body; // 요청 본문에서 RTF 텍스트를 받음

  if (!data) {
    return res.status(400).send("RTF content is required");
  }

  try {
    let updatedContent = templeteHTML;

    updatedContent = updatedContent.replace("{LOCATION}", data.info.region);
    updatedContent = updatedContent.replace(
      "{ORGANIZE}",
      data.info.institution
    );
    updatedContent = updatedContent.replace(
      "{TEACHERNAME}",
      data.info.examiner
    );
    updatedContent = updatedContent.replace("{DATE}", data.examdate);
    updatedContent = updatedContent.replace("{GENDER}", data.info.gender);
    updatedContent = updatedContent.replace("{CHILDENNAME}", data.info.name);
    updatedContent = updatedContent.replace(
      "{TOTALSCORE}",
      data.categoryAScore + data.categoryBScore
    );
    updatedContent = updatedContent.replace("{SCOREA}", data.categoryAScore);
    updatedContent = updatedContent.replace("{SCOREB}", data.categoryBScore);

    res.send(updatedContent);
  } catch (error) {
    console.error("Error converting RTF:", error);
    res.status(500).send("Error converting RTF text to HTML");
  }
});

// 서버 시작
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
