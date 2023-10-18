import React from "react";
import "./MainCard.css";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function RequestCard(props) {
  return (
    <Container className="my-5">
      <Row className="p-4 pb-0 pe-lg-2 pt-lg-4 align-items-center rounded-5 border shadow-lg card">
        <Col lg={11.5} className="p-4 p-lg-3 pt-lg-4">
          <h1 className="display-4 fw-bold lh-1">{props.title}</h1>
          <p
            className="lead"
            style={{
              fontSize: 24,
              paddingTop: "1rem",
              paddingBottom: "0.5rem",
            }}
          >
            {props.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </Col>
        <hr className="my-4"></hr>
        <Form.Group
          controlId="formFileLg"
          className="mb-3"
          style={{ width: "50%" }}
        >
          <Form.Control
            type="file"
            size="lg"
            onChange={(event) => {
              const selectedFile = event.target.files[0];
              const reader = new FileReader();
              reader.onload = (e) => {
                const fileContent = e.target.result;
                console.log("File Content: ", fileContent);
              };
              // Read the file as text
              reader.readAsText(selectedFile);
            }}
          />
        </Form.Group>
      </Row>
    </Container>
  );
}

export default RequestCard;
