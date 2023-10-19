import React from "react";
import "./MainCard.css";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import MyCarousel from "../components/MyCarousel";

function MainCard({
  title,
  description,
  buttonText,
  buttonType,
  buttonLink,
  useButton,
}) {
  return (
    <Container className="my-5 card-container">
      <Row className="p-4 pb-0 pe-lg-2 pt-lg-3 align-items-center rounded-5 border shadow-lg border-3 card">
        <Col lg={11} className="p-lg-2 pt-lg-4">
          <h1 className="display-5 fw-bold lh-1">{title}</h1>
          <p
            className="lead"
            style={{
              fontSize: 20,
              paddingTop: "1rem",
            }}
          >
            {description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <hr style={{ width: "100%" }} />
          {useButton ? (
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-3">
              <Link to={buttonLink}>
                <Button variant={buttonType} size="lg" className="me-md-2">
                  {buttonText}
                </Button>
              </Link>
            </div>
          ) : null}
          {useButton ? null : <MyCarousel />}
        </Col>
      </Row>
    </Container>
  );
}

export default MainCard;
