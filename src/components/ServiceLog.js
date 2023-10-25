import React, { useState, useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
import { CodeBlock } from "react-code-blocks";
import ApiUrl from "./ApiUrl";
import "./ServiceLog.css";
function ServiceLog(props) {
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logError, setLogError] = useState(false);

  useEffect(() => {
    if (showLogs) {
      const eventSource = new EventSource(
        `${ApiUrl.apiUrl}/requests/${props.id}/logs`
      );

      eventSource.onopen = () => {
        setLogError(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      };

      eventSource.onmessage = (event) => {
        console.log(event.data);
        setLogs((prevLogs) => [...prevLogs, event.data]);
      };

      // eventSource.onerror = (e) => {
      //   // 종료 또는 에러 발생 시 할 일
      //   eventSource.close();
      //   // setIsLoading(false);
      //   // setShowLogs(false);
      //   setTimeout(() => {
      //     setLogs([]);
      //     setIsLoading(false);
      //     setShowLogs(false);
      //     setLogError(true);
      //   }, 2500);
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
        disabled={
          props.progress === "처리" ||
          isLoading ||
          (props.progress === "배포" && props.progress === "배포")
            ? true
            : false
        }
        onClick={handleLogButtonClick}
      >
        {isLoading
          ? "Loading..."
          : showLogs
          ? "로그 닫기"
          : props.progress + " 단계 로그 확인"}
      </Button>

      {logError ? (
        <h5 style={{ margin: "1.5rem" }}>
          <Badge bg="danger" style={{ marginRight: "0.5rem" }}>
            Failed
          </Badge>
          로그 수집에 문제가 발생했습니다. 조금 후에 다시 시도해주세요
        </h5>
      ) : null}

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
