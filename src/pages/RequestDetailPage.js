import axios from "axios";
import { Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import RequestDetail from "../components/RequestDetail";
import ServiceLog from "../components/ServiceLog";
import ApiUrl from "../components/ApiUrl";
import "./NotFound.css"; // You can create a CSS file for styling
import Hero from "../components/Hero";

function RequestDetailPage() {
  const { id } = useParams();

  const [requestsMetaInfo, setRequestsMetaInfo] = useState(null);
  const [requestsDetailInfo, setRequestsDetailInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false); // 데이터를 이미 불러왔는지 확인하는 상태

  const fetchRequestMetaInfo = useCallback(async () => {
    try {
      const response = await axios.get(
        `${ApiUrl.apiUrl}:${ApiUrl.apiPort}/api/requests/${id}`
      );
      const reveredData = response.data;
      setRequestsMetaInfo(reveredData);
      setIsDataFetched(true); // 데이터를 불러왔음을 표시
    } catch (e) {
      console.error(e);
      setError("서버 응답이 없습니다. 나중에 다시 시도하세요.");
    }
  }, [id]);

  const fetchRequestDetailInfo = useCallback(async () => {
    try {
      const response = await axios.get(
        `${ApiUrl.apiUrl}:${ApiUrl.apiPort}/api/requests/${id}/details/`
      );
      const reveredData = response.data;
      setRequestsDetailInfo(reveredData);
      setIsDataFetched(true); // 데이터를 불러왔음을 표시
    } catch (e) {
      console.error(e);
      console.error("Error fetching request detail:", e);
      setError("서버 응답이 없습니다. 나중에 다시 시도하세요.");
    }
  }, [id]);
  useEffect(() => {
    // 데이터를 이미 불러왔다면 다시 불러오지 않음
    if (!isDataFetched) {
      fetchRequestMetaInfo();
      fetchRequestDetailInfo();
    }
  }, [fetchRequestDetailInfo, fetchRequestMetaInfo, isDataFetched]);

  return (
    <>
      <Hero currentPage="MainPage" />
      <div className="px-4 my-2 text-center" style={{ paddingBottom: "5rem" }}>
        <h1 className="display-5 fw-bold lh-1 mb-4">Quest Detail</h1>
        <hr style={{ width: "50%", margin: "auto" }} />
        {error ? (
          <>
            <h1 className={`rainbow-text-not-data `}>
              <Badge bg="danger">Failed</Badge>
              해당 데이터는 존재하지 않습니다.
            </h1>
          </>
        ) : // 데이터가 로드될 때만 데이터를 표시
        requestsMetaInfo !== null && requestsDetailInfo !== null ? (
          <>
            <p
              className="fw-bold lh-1"
              style={{ fontSize: 30, margin: "1.5rem" }}
            >
              #{id} {requestsMetaInfo.requestTitle}
            </p>
            <RequestDetail
              id={id}
              MetaInfo={requestsMetaInfo}
              DetailInfo={requestsDetailInfo}
            />
            <ServiceLog id={id} progress={requestsMetaInfo.progress} />
          </>
        ) : (
          <p className="display-5 fw-bold lh-1" style={{ padding: "3rem" }}>
            Loading...
          </p>
        )}
      </div>
    </>
  );
}

export default RequestDetailPage;
