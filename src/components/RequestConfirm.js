import React from "react";
import "./MainCard.css";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

function RequestConfirm({ title, description, questYaml, processedQuestYaml }) {
  return (
    <Container className="my-5">
      <Row className="p-4 pb-0 pe-lg-2 pt-lg-4 align-items-center rounded-5 border shadow-lg card">
        <Col lg={11.5} className="p-4 p-lg-5 pt-lg-4">
          <h1 className="display-4 fw-bold lh-1">{title}</h1>

          {description && (
            <p
              className="lead"
              style={{
                fontSize: 24,
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

        <hr style={{ width: "90%" }} />
        <Button
          className="mb-3"
          variant="primary"
          size="lg"
          style={{ width: "20%", fontSize: 30 }}
        >
          Quest 요청
        </Button>
      </Row>
    </Container>
  );
}

export default RequestConfirm;
