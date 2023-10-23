import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { CodeBlock } from "react-code-blocks";
import ApiUrl from "./ApiUrl";
import "./ServiceLog.css";
function ServiceLog(props) {
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showLogs) {
      const eventSource = new EventSource(
        `${ApiUrl.apiUrl}:${ApiUrl.apiPort}/api/requests/${props.id}/logs`
      );

      eventSource.onopen = () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      };

      eventSource.onmessage = (event) => {
        // 이벤트 데이터 처리
        setLogs((prevLogs) => [...prevLogs, event.data]);
      };

      // eventSource.onend = () => {
      // eventSource.close();
      // setLogs([]);
      // };

      // 컴포넌트 언마운트 시 EventSource 닫기 + connection Close
      return () => {
        eventSource.close();
        setLogs([]);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      };
    }
  }, [showLogs, props.id]);

  const handleLogButtonClick = () => {
    setShowLogs(!showLogs); // 버튼 클릭 시 showLogs 값을 토글합니다.
    setIsLoading(true);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "1rem" }}>
      <Button
        className="card-button"
        style={{
          marginTop: "1rem",
          fontSize: 32,
        }}
        disabled={props.progress === "처리" || isLoading ? true : false}
        onClick={handleLogButtonClick}
      >
        {isLoading
          ? "Loading..."
          : showLogs
          ? "로그 닫기"
          : "현재 단계 로그 확인"}
      </Button>

      {showLogs && !isLoading && (
        <div className="log-container">
          <CodeBlock
            text={logs.join("\n")} // 배열을 개행문자로 연결하여 문자열로 변환
            language="shell"
            showLineNumbers={false}
            customStyle={{
              backgroundColor: "#f4f4f4",
            }}
            codeContainerStyle={{
              color: "#2a2934",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ServiceLog;
