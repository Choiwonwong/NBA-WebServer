import React from "react";
import "./MainCard.css";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

function MainCard({
  title,
  description,
  buttonText,
  buttonType,
  buttonLink,
  useButton,
}) {
  return (
    <Container className="my-5">
      <Row className="p-4 pb-0 pe-lg-2 pt-lg-4 align-items-center rounded-5 border shadow-lg card">
        <Col lg={11.5} className="p-4 p-lg-5 pt-lg-4">
          <h1 className="display-4 fw-bold lh-1">{title}</h1>
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
          {useButton ? ( // useButton 값이 true인 경우에만 버튼을 렌더링
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <Link to={buttonLink}>
                <Button variant={buttonType} size="lg" className="me-md-2">
                  {buttonText}
                </Button>
              </Link>
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default MainCard;
