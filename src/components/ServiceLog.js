import React, { useState, useEffect, useRef } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import { CodeBlock } from "react-code-blocks";
import ApiUrl from "./ApiUrl";
import "./ServiceLog.css";
function ServiceLog(props) {
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logError, setLogError] = useState(false);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (showLogs) {
      eventSourceRef.current = new EventSource(
        `${ApiUrl.apiUrl}/requests/${props.id}/logs`
      );

      eventSourceRef.current.onopen = () => {
        setLogError(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      };
      // 새로운 로그 메시지가 도착할 때마다 logs 배열에 추가
      eventSourceRef.current.onmessage = (event) => {
        const newLog = event.data;
        setLogs((prevLogs) => [...prevLogs, newLog]);
      };
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      setLogs([]); // 컴포넌트 언마운트 시 로그 초기화
      setIsLoading(false);
    };
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
          (props.progress === "배포" && props.deployState !== "start")
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
        <Container className="log-container">
          <CodeBlock
            text={logs.join("\n")} // 배열을 개행문자로 연결하여 문자열로 변환
            language="shell"
            customStyle={{
              textAlign: "left",
              backgroundColor: "#f4f4f4",
            }}
            codeContainerStyle={{
              color: "#2a2934",
            }}
          />
        </Container>
      )}
    </div>
  );
}

export default ServiceLog;
