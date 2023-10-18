import React, { useState } from "react";
import { CodeBlock, github } from "react-code-blocks";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ConfirmModal from "./ConfirmModal";
import Button from "react-bootstrap/Button";
import "./MainCard.css";

// import axios from "axios"; // Import Axios or your preferred HTTP client

function RequestConfirm({ title, description, questYaml, processedQuestYaml }) {
  let navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function createRequest() {
    try {
      setIsLoading(true);

      // Make a POST request to the API
      // const response = await axios.post("http://localhost:8000/api/requests", {
      //   questYaml: questYaml,
      // });

      // history.push("/request-list");
      setTimeout(() => {
        setModalShow(false);
        setIsLoading(false);
        navigate("/request-list");
      }, 3000);
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false);
    }
  }
  return (
    <Container className="my-5">
      <Row className="p-4 pb-0 pe-lg-2 pt-lg-3 align-items-center rounded-5 border shadow-lg card">
        <Col lg={11} className="p-lg-2 pt-lg-4">
          <h1 className="display-5 fw-bold lh-1">{title}</h1>

          {description && (
            <p
              className="lead"
              style={{
                fontSize: 20,
                paddingTop: "1rem",
                paddingBottom: "0.5rem",
              }}
            >
              {description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          )}
        </Col>

        <hr style={{ width: "90%" }} />
        <CodeBlock
          text={processedQuestYaml.trim()}
          language="yaml"
          showLineNumbers={true}
          startingLineNumber={1}
          theme={github}
          customStyle={{
            fontSize: 20,
            fontWeight: "bold",
            width: "90%",
          }}
        />
        <hr style={{ width: "90%" }} />
        <Button
          className="mb-3"
          variant="primary"
          size="lg"
          style={{ width: "20%", fontSize: 30 }}
          onClick={() => setModalShow(true)}
        >
          Quest 요청
        </Button>
        <ConfirmModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          onClick={createRequest}
          title={"Quest 요청 확인"}
          body={"요청이 시작되면 되돌릴 수 없습니다. 계속하시겠습니까?"}
          isLoading={isLoading}
          changeLoading={setIsLoading}
        />
      </Row>
    </Container>
  );
}

export default RequestConfirm;
