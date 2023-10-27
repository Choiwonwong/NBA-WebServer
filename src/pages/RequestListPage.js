import React, { useState, useEffect } from "react";
import { Badge, Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import RequestsList from "../components/RequestsList";
import ApiUrl from "../components/ApiUrl";
import Hero from "../components/Hero";
import "../components/RequestsList.css";
import axios from "axios";

function RequestListPage() {
  const [requests, setRequests] = useState([]); // 요청 데이터를 담을 상태 변수
  const [error, setError] = useState(null); // 오류 메시지 상태 변수

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${ApiUrl.apiUrl}/requests/`);
      const reveredData = response.data.reverse();
      if (reveredData.length === 0) {
        setError("아직 요청이 하나도 없습니다.");
      }
      setRequests(reveredData);
    } catch (e) {
      console.error(e);
      setError("서버 응답이 없습니다. 나중에 다시 시도하세요."); // 오류 메시지 설정
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <Hero currentPage="RequestListPage" />
      <div className="px-4 my-2 text-center">
        <h1 className="display-5 fw-bold lh-1 mb-4">Quest List</h1>
      </div>
      {/* <hr style={{ width: "50%", margin: "auto" }} /> */}
      {error ? (
        <>
          <p className=" px-4 my-2 text-center mb-4 " style={{ fontSize: 30 }}>
            <Badge bg="danger" style={{ marginRight: "1rem" }}>
              Failed
            </Badge>
            {error}
          </p>
        </>
      ) : (
        <Container className="acordion-container">
          <Accordion>
            {requests.map((request) => (
              <RequestsList key={request.id} {...request} />
            ))}
          </Accordion>
        </Container>
      )}
    </>
  );
}

export default RequestListPage;
