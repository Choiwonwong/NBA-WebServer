// src/components/RequestDetail.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import "./RequestDetail.css"; // 스타일 파일을 임포트

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

// 임시로 하드코딩된 상세 페이지 데이터
const requestDetailData = {
  id: 1,
  title: "test1",
  repo: "https://github.com/CHOIWONWENG/test0531.git",
  branch: "main",
  state: "프로비저닝 중",
  emessage: null,
  createdAt: "2023-09-19T10:30:00",
  updatedAt: "2023-09-19T11:45:00",
};

function RequestDetail() {
  const { id } = useParams(); // URL에서 요청 ID를 가져옵니다.

  // 임시 데이터에서 해당 ID에 해당하는 요청을 찾습니다.
  const request = requestDetailData;

  if (!request) {
    // 요청이 없을 경우 에러 처리를 할 수 있습니다.
    return <div>요청을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container">
      <Link to="/request" className="quest-title">
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
      <h2 className="quest-noti">Request Detail</h2>

      <div className="table-title">Request Info</div>
      <table className="detail-table metadata-table">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{request.id}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{request.title}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{formatDateTime(request.createdAt)}</td>
          </tr>
          <tr>
            <th>Updated At</th>
            <td>{formatDateTime(request.updatedAt)}</td>
          </tr>
        </tbody>
      </table>

      {/* Results Table */}
      <div className="table-title">Results</div>
      <table className="detail-table results-table">
        <tbody>
          <tr>
            <th>Progress</th>
            <td>{request.state}</td>
          </tr>
          <tr>
            <th>Error Message</th>
            <td>{request.emessage || "N/A"}</td>
          </tr>
          <tr>
            <th>Branch</th>
            <td>{request.branch}</td>
          </tr>
          <tr>
            <th>Github Repo</th>
            <td>{request.repo}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RequestDetail;
