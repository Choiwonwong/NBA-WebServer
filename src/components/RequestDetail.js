import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RequestDetailBadge from "./RequestDetailBadge";
import "./RequestDetail.css";

function AccordianHeader(props) {
  return (
    <Accordion.Header>
      <div
        className="border-end"
        style={{ fontSize: 24, fontWeight: "bold", paddingRight: "1rem" }}
      >
        #{props.id}
      </div>
      <div style={{ fontSize: 24, fontWeight: "bold", paddingLeft: "1rem" }}>
        {props.title}
      </div>
    </Accordion.Header>
  );
}

function GridCol(props) {
  return (
    <Col className={props.IsLast ? null : "border-end"}>
      <div>
        <h5>{props.title}</h5>
        <p>{props.content}</p>
      </div>
    </Col>
  );
}

function RequestDetail(props) {
  const { MetaInfo, DetailInfo } = props;

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  }

  return (
    <Container className="detail-acordion-container">
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <AccordianHeader
            id={props.id}
            title={"요청 기본 정보"}
            IsLast={false}
          />
          <Accordion.Body
            style={{ justifyContent: "start", textAlign: "left" }}
          >
            <Container>
              <Row className="mb-2">
                <GridCol
                  title={"요청 타입"}
                  content={
                    MetaInfo.requestType === "전체"
                      ? "프로비저닝 및 배포"
                      : MetaInfo.requestType
                  }
                />
                <GridCol title={"단계"} content={MetaInfo.progress} />
                <GridCol
                  title={"요청 시간"}
                  content={formatDate(MetaInfo.createdAt)}
                />
                <GridCol
                  title={"상태 변경 시간"}
                  content={formatDate(MetaInfo.updatedAt)}
                  IsLast={true}
                />
              </Row>
              <Row className="mb-2 border-top" style={{ paddingTop: "1rem" }}>
                <GridCol
                  title={"처리 상태"}
                  content={
                    <RequestDetailBadge status={MetaInfo.processState} />
                  }
                />
                <GridCol
                  title={"프로비저닝 상태"}
                  content={
                    <RequestDetailBadge status={MetaInfo.provisionState} />
                  }
                />
                <GridCol
                  title={"배포 상태"}
                  content={<RequestDetailBadge status={MetaInfo.deployState} />}
                />
              </Row>
              <Row
                className="border-top justify-content-center"
                style={{ paddingTop: "1rem" }}
              >
                <Col sm={3} className="d-flex align-items-center border-end">
                  <div>
                    <h5>{"시도 횟수"}</h5>
                    <p>{MetaInfo.tries}</p>
                  </div>
                </Col>
                <GridCol
                  title={"에러 메시지"}
                  content={
                    MetaInfo.emessage === null
                      ? "정상적인 상태입니다."
                      : MetaInfo.emessage
                  }
                  IsLast={true}
                />
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <AccordianHeader id={props.id} title={"프로비저닝 정보"} />
          <Accordion.Body
            style={{ justifyContent: "start", textAlign: "left" }}
          ></Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <AccordianHeader id={props.id} title={"배포 정보"} />
          <Accordion.Body
            style={{ justifyContent: "start", textAlign: "left" }}
          ></Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default RequestDetail;
