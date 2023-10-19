import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import StackedProgressBar from "./StackedProgressBar";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RequestsList(props) {
  const [badgeState, setBadgeState] = useState(["primary", "진행"]);
  let navigate = useNavigate();

  function chooseBadgeBG() {
    if (props.deployState === "success") {
      setBadgeState(["success", "성공"]);
    }
    if (props.deployState === "failed" && props.tries === 5) {
      setBadgeState(["danger", "실패"]);
    }
    if (props.provisionState === "failed" && props.tries === 5) {
      setBadgeState(["danger", "실패"]);
    }
    if (props.processState === "failed" && props.tries === 5) {
      setBadgeState(["danger", "실패"]);
    }
    return badgeState;
  }

  useEffect(() => {
    chooseBadgeBG();
  });

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
    <Accordion.Item eventKey={props.id}>
      <Accordion.Header>
        <div
          className="border-end"
          style={{ fontSize: 24, fontWeight: "bold", paddingRight: "1rem" }}
        >
          #{props.id}
        </div>
        <Badge
          bg={badgeState[0]}
          style={{ marginLeft: "0.7rem", marginRight: "0.7rem", fontSize: 18 }}
        >
          {badgeState[1]}
        </Badge>
        <div style={{ fontSize: 20 }}>{props.requestTitle}</div>
      </Accordion.Header>
      <Accordion.Body>
        <StackedProgressBar />
        <hr />
        <Container>
          <Row className="mb-2">
            <Col className="border-end">
              <div>
                <h5>단계</h5>
                <p>{props.progress}</p>
              </div>
            </Col>
            <Col className="border-end">
              <div>
                <h5>요청 시간</h5>
                <p>{formatDate(props.createdAt)}</p>
              </div>
            </Col>
            <Col>
              <div>
                <h5>상태 변경 시간</h5>
                <p>{formatDate(props.updatedAt)}</p>
              </div>
            </Col>
          </Row>
          <Row className="mb-2 border-top" style={{ paddingTop: "1rem" }}>
            <Col className="border-end">
              <div>
                <h5>처리 상태</h5>
                <p>{props.processState || "대기"}</p>
              </div>
            </Col>
            <Col className="border-end">
              <div>
                <h5>프로비저닝 상태</h5>
                <p>{props.provisionState || "대기"}</p>
              </div>
            </Col>
            <Col>
              <div>
                <h5>배포 상태</h5>
                <p>{props.deployState || "대기"}</p>
              </div>
            </Col>
          </Row>
          <Row
            className="border-top justify-content-center"
            style={{ paddingTop: "1rem" }}
          >
            <Col className="border-end" style={{ marginLeft: "1rem" }}>
              <div>
                <h5>에러 메시지</h5>
                <p>{props.emessage || "없음"}</p>
              </div>
            </Col>
            <Col sm={3} className="d-flex align-items-center ">
              <Button
                variant="info"
                className="mx-auto card-button"
                style={{ fontSize: 28 }}
                onClick={() => {
                  navigate(`/request-detail/${props.id}/`, {});
                }}
              >
                상세 정보
              </Button>
            </Col>
          </Row>
        </Container>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default RequestsList;
