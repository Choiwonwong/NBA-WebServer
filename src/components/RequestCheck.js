import React, { useState } from "react";
import "./MainCard.css";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import yaml from "js-yaml";
import axios from "axios";
import ApiUrl from "./ApiUrl";

function RequestCheck(props) {
  const [, setSelectedFileName] = useState(""); // State to store selected file name
  const [fileError, setFileError] = useState(""); // State to store file error message
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [badgeState, setBadgeState] = useState("danger"); // State to manage badge color [success, warning, danger
  const [fileCheckResult, setFileCheckResult] = useState(""); // State to store file check result

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFileName(selectedFile.name);
    setFileError("");
    setIsLoading(false);

    if (selectedFile.name !== "Quest.yaml") {
      setFileError("'Quest.yaml'을 입력해주세요.");
      event.target.value = null;
    } else {
      setFileError("");
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(
          `${ApiUrl.apiUrl}/requests/check`,
          formData
        );

        if (response.status === 200) {
          // 1. 정상 요청일 때
          setIsLoading(false);
          setBadgeState(response.data.result);
          setFileCheckResult(response.data.message);
          props.changeProgress(1);
          props.getQuestYaml(selectedFile);
          props.getProcessedQuest(yaml.dump(response.data.userQuestYaml));
        } else {
          // 3. 서버가 400 메시지를 보낼 때
          setIsLoading(false);
          setBadgeState("danger");
          setFileCheckResult("서버에서 잘못된 요청을 받았습니다.");
        }
      } catch (error) {
        if (error.response) {
          // 3. 서버가 400 메시지를 보낼 때
          setIsLoading(false);
          setBadgeState(error.response.data.detail.result);
          setFileCheckResult(error.response.data.detail.message); // 또는 다른 오류 메시지 설정
        } else {
          // 2. 서버가 응답하지 않을 때
          setIsLoading(false);
          setBadgeState(error.response.data.detail.result);
          setFileCheckResult(
            "서버에 연결할 수 없습니다. 나중에 다시 시도해주세요."
          );
        }
      }
    }
  };

  return (
    <Container className="my-5 card-container">
      <Row className="p-4 pb-0 pe-lg-2 pt-lg-3 align-items-center rounded-5 border border-3 shadow-lg card">
        <Col lg={11} className="p-lg-2 pt-lg-4">
          <h1 className="display-5 fw-bold lh-1">{props.title}</h1>
          <p className="lead" style={{ fontSize: 20, paddingTop: "1rem" }}>
            {props.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <hr style={{ width: "100%" }} />
        </Col>
        <div className="mb-3" style={{ width: "auto" }}>
          <Form.Control
            type="file"
            size="lg"
            onChange={handleFileChange}
            disabled={fileCheckResult !== ""}
            style={{ fontSize: 20 }}
          />
        </div>
        {fileError && (
          <p
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            <Badge bg="danger" style={{ marginRight: "8px" }}>
              Failed
            </Badge>
            {fileError}
          </p>
        )}
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner
              style={{ margin: "1.5rem" }}
              animation="border"
              variant="primary"
            />
            <p style={{ fontSize: 20, fontWeight: "bold" }}>
              Quest.yaml의 내용을 검사중입니다.
            </p>
          </div>
        ) : null}
        {fileCheckResult && (
          <>
            <hr style={{ width: "90%" }} />
            <p
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: "1rem",
              }}
            >
              <Badge bg={badgeState} style={{ marginRight: "8px" }}>
                {badgeState === "success" ? "Success" : "Failed"}
              </Badge>
              {fileCheckResult}
            </p>
          </>
        )}
      </Row>
    </Container>
  );
}

export default RequestCheck;
