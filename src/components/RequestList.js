// src/components/RequestList.js
import React from "react";
import { Link } from "react-router-dom";
import "./RequestList.css"; // 스타일 파일을 임포트

// 가상의 요청 목록 데이터
const requestListData = [
  {
    id: 1,
    repo: "https://github.com/CHOIWONWENG/test0531.git",
    branch: "main",
    state: "프로비저닝 중",
    emessage: null,
  },
  {
    id: 2,
    repo: "https://github.com/CHOIWONWENG/test0531.git",
    branch: "Master",
    state: "빌드 에러",
    emessage: "등록 권한 부족",
  },
  {
    id: 3,
    repo: "https://github.com/CHOIWONWENG/test0531.git",
    branch: "blue",
    state: "정상 배포",
    emessage: null,
  },
  // 추가 요청 데이터
];

function RequestList() {
  return (
    <div className="container">
      <Link to="/" className="quest-title">
        Quest
      </Link>
      <p className="quest-noti">
        <span className="highlight">Q</span>uick{" "}
        <span className="highlight">U</span>nified{" "}
        <span className="highlight">E</span>asy{" "}
        <span className="highlight">S</span>imple{" "}
        <span className="highlight">T</span>ool
      </p>
      <div className="divider"></div>
      <p className="quest-text">Request List</p>

      <table className="request-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Github Repo</th>
            <th>Progress</th>
            <th>Error Message</th>
          </tr>
        </thead>
        <tbody>
          {requestListData.map((item) => (
            <tr key={item.id} className="request-table-row">
              <td>
                {/* 요청 목록 항목을 클릭하면 해당 요청 상세 페이지로 이동 */}
                <Link to={`/request/${item.id}`} className="request-list-link">
                  {item.id}
                </Link>
              </td>
              <td>
                <Link to={`/request/${item.id}`} className="request-list-link">
                  {item.repo}
                </Link>
              </td>
              <td>
                <Link to={`/request/${item.id}`} className="request-list-link">
                  {item.state}
                </Link>
              </td>
              <td>
                {" "}
                <Link to={`/request/${item.id}`} className="request-list-link">
                  {item.emessage}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestList;
