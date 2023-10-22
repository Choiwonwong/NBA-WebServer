import React from "react";
import Hero from "../components/Hero";
import RequestDetail from "../components/RequestDetail";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiUrl from "../components/ApiUrl";
import axios from "axios";

function RequestDetailPage(props) {
  const { id } = useParams();
  const [requestsMetaInfo, setRequestsMetaInfo] = useState([]);
  const [requestsDetailInfo, setRequestsDetailInfo] = useState([]);
  const [error, setError] = useState(null); // 오류 메시지 상태 변수

  const fetchRequestMetaInfo = async () => {
    try {
      const response = await axios.get(
        `${ApiUrl.apiUrl}:${ApiUrl.apiPort}/api/requests/${id}`
      );
      const reveredData = response.data;
      setRequestsMetaInfo(reveredData);
    } catch (e) {
      console.error(e);
      setError("서버 응답이 없습니다. 나중에 다시 시도하세요."); // 오류 메시지 설정
    }
  };

  const fetchRequestDetailInfo = async () => {
    try {
      const response = await axios.get(
        `${ApiUrl.apiUrl}:${ApiUrl.apiPort}/api/requests/${id}/details`
      );
      const reveredData = response.data;
      setRequestsDetailInfo(reveredData);
    } catch (e) {
      console.error(e);
      setError("서버 응답이 없습니다. 나중에 다시 시도하세요."); // 오류 메시지 설정
    }
  };

  useEffect(() => {
    fetchRequestMetaInfo();
    // fetchRequestDetailInfo();
  }, []);

  return (
    <>
      <Hero currentPage="MainPage" />
      <div className="px-4 my-2 text-center">
        <h1 className="display-5 fw-bold lh-1 mb-4">Quest Detail</h1>
        <hr style={{ width: "50%", margin: "auto" }} />
        <p className="fw-bold lh-1" style={{ fontSize: 30, margin: "1.5rem" }}>
          #{id} {requestsMetaInfo.requestTitle}
        </p>
        <RequestDetail
          id={id}
          MetaInfo={requestsMetaInfo}
          DetailInfo={requestsDetailInfo}
        />
      </div>
    </>
  );
}

export default RequestDetailPage;
