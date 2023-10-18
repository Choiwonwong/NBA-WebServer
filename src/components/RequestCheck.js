import React, { useState } from "react";
import "./MainCard.css";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";

function RequestCheck(props) {
  const [, setSelectedFileName] = useState(""); // State to store selected file name
  const [fileError, setFileError] = useState(""); // State to store file error message
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [fileCheckResult, setFileCheckResult] = useState(""); // State to store file check result

  const handleFileChange = (event) => {
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

      const formData = new FormData();
      formData.append("file", selectedFile);

      // Temporary section
      setTimeout(() => {
        setIsLoading(false);
        setFileCheckResult("모든 검사가 정상적입니다.");
        props.changeProgress(1);
        props.getQuestYaml(formData);
      }, 5000);

      // axios
      //   .post("http://localhost:8000/requests/check", formData)
      //   .then((response) => {
      //     // Handle the response here
      //     setIsLoading(false); // Stop loading when the response is received
      //     setFileCheckResult(response.data);
      //   })
      //   .catch((error) => {
      //     // Handle errors here
      //     setIsLoading(false); // Stop loading on error
      //     setFileCheckResult(error.message);
      //   });
    }
  };

  return (
    <Container className="my-5">
      <Row className="p-4 pb-0 pe-lg-2 pt-lg-4 align-items-center rounded-5 border shadow-lg card">
        <Col lg={11.5} className="p-4 p-lg-5 pt-lg-4">
          <h1 className="display-4 fw-bold lh-1">{props.title}</h1>
          <p className="lead" style={{ fontSize: 24, paddingTop: "1rem" }}>
            {props.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </Col>
        <hr style={{ width: "90%" }} />
        <div className="mb-3" style={{ width: "50%" }}>
          <Form.Control
            type="file"
            size="lg"
            onChange={handleFileChange}
            disabled={fileCheckResult !== ""}
          />
        </div>
        {fileError && (
          <p
            style={{
              color: "red",
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
            <Spinner style={{ margin: "1.5rem" }} animation="border" />
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
              <Badge bg="success" style={{ marginRight: "8px" }}>
                Success
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
