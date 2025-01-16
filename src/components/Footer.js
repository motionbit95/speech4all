// src/components/Footer.js
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-info">
        <p>
          (합) Speech4All 대표: 하승희 <br />
          사업자등록번호: 812-87-03395
        </p>
        <p>
          주소: 강원특별자치도 춘천시 한림대학길 1, 6층 8606호(옥천동,
          생명과학관)
          <br />
          개선 및 문의사항: gpspeech4all@gmail.com
        </p>
        <p>
          Copyright © 2024 Speech4All. All Rights Reserved. <br />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
