import React, { useState } from "react";
import { CodeBlock, googlecode } from "react-code-blocks";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "./MainCard.css";

// import axios from "axios"; // Import Axios or your preferred HTTP client

function RequestConfirm({ title, description, questYaml, processedQuestYaml }) {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function createRequest() {
    try {
      setIsLoading(true);

      // Make a POST request to the API
      // const response = await axios.post("http://localhost:8000/api/requests", {
      //   questYaml: questYaml,
      // });

      setTimeout(() => {
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
          theme={googlecode}
          customStyle={{
            fontSize: 20,
            fontWeight: "bold",
            width: "90%",
          }}
        />
        <hr style={{ width: "90%" }} />
        {isLoading ? (
          <Button
            variant="primary"
            className="mb-3"
            style={{ width: "auto", fontSize: 30 }}
            disabled
          >
            <Spinner
              animation="border"
              aria-hidden="true"
              status="request"
              style={{ marginRight: 10 }}
            />
            Loading...
          </Button>
        ) : (
          <Button
            className="mb-3"
            variant="primary"
            size="lg"
            style={{ width: "auto", fontSize: 30 }}
            onClick={() => createRequest()}
          >
            Quest 요청
          </Button>
        )}
      </Row>
    </Container>
  );
}

export default RequestConfirm;