// src/components/RequestList.js
import React from "react";
import { Link } from "react-router-dom";
import "./RequestList.css"; // 스타일 파일을 임포트

// 함수를 사용하여 날짜 및 시간 형식화
function formatDateTime(dateTimeString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return new Date(dateTimeString).toLocaleDateString("ko-KR", options);
}

// 가상의 요청 목록 데이터
const requestListData = [
  {
    id: 1,
    title: "test1",
    repo: "https://github.com/CHOIWONWENG/test0531.git",
    branch: "main",
    state: "프로비저닝 중",
    emessage: null,
    createdAt: "2023-09-19T10:30:00",
    updatedAt: "2023-09-19T11:45:00",
  },
  {
    id: 2,
    title: "test2",
    repo: "https://github.com/CHOIWONWENG/test0531.git",
    branch: "Master",
    state: "빌드 에러",
    emessage: "등록 권한 부족",
    createdAt: "2023-09-19T09:15:00",
    updatedAt: "2023-09-19T09:40:00",
  },
  {
    id: 3,
    title: "test3",
    repo: "https://github.com/CHOIWONWENG/test0531.git",
    branch: "blue",
    state: "정상 배포",
    emessage: null,
    createdAt: "2023-09-18T15:20:00",
    updatedAt: "2023-09-18T16:30:00",
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
            <th>Title</th>
            <th>Github Repo</th>
            <th>Progress</th>
            {/* <th>Error Message</th> */}
            <th>Created At</th>
            <th>Updated At</th>
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
                  {item.title}
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
              {/* <td>
                <Link to={`/request/${item.id}`} className="request-list-link">
                  {item.emessage}
                </Link>
              </td> */}
              <td>{formatDateTime(item.createdAt)}</td>
              <td>{formatDateTime(item.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestList;
