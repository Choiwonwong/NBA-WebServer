import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  MetaInfoBadge,
  EKSInfoBadge,
  DPInfoBadge,
  NDInfoBadge,
  PodInfoBadge,
  DeployInfoBadge,
} from "./RequestDetailBadge";
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

function GridArray(props) {
  return (
    <Col className={props.IsLast ? null : "border-end"}>
      <span
        style={{ fontWeight: "normal", fontSize: 20, paddingRight: "0.5rem" }}
      >
        {props.title}
      </span>
      <span>{props.content}</span>
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
                <GridCol title={"단계"} content={MetaInfo.progress + " 단계"} />
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
                  content={<MetaInfoBadge status={MetaInfo.processState} />}
                />
                <GridCol
                  title={"프로비저닝 상태"}
                  content={<MetaInfoBadge status={MetaInfo.provisionState} />}
                />
                <GridCol
                  title={"배포 상태"}
                  content={<MetaInfoBadge status={MetaInfo.deployState} />}
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
          >
            <Row className="mb-2">
              <GridCol
                title={"클러스터 이름"}
                content={DetailInfo.provision.eks_name}
              />
              <GridCol
                title={"클러스터 버전"}
                content={DetailInfo.provision.eks_version}
              />
              <GridCol
                title={"클러스터 상태"}
                content={
                  <EKSInfoBadge status={DetailInfo.provision.eks_status} />
                }
                IsLast={true}
              />
            </Row>
            <Row className="mb-2 border-top" style={{ paddingTop: "1rem" }}>
              <GridCol
                title={"클러스터 엔드포인트"}
                content={DetailInfo.provision.eks_endpoint}
                IsLast={true}
              />
            </Row>
            <Row className="mb-2 border-top" style={{ paddingTop: "1rem" }}>
              <GridCol
                title={"데이터플레인 이름"}
                content={DetailInfo.provision.dataplane_name}
              />
              <GridCol
                title={"데이터플레인 타입"}
                content={
                  DetailInfo.provision.dataplane_type === "nodegroup"
                    ? "가상머신 기반"
                    : "컨테이너 기반"
                }
              />
              <GridCol
                title={"데이터플레인 상태"}
                content={
                  <DPInfoBadge status={DetailInfo.provision.dp_status} />
                }
                IsLast={
                  DetailInfo.provision.dataplane_type === "nodegroup"
                    ? false
                    : true
                }
              />
              {DetailInfo.provision.dataplane_type === "nodegroup" ? (
                <GridCol
                  title={"가상머신 개수"}
                  content={DetailInfo.provision.ng_current_count}
                  IsLast={true}
                />
              ) : null}
            </Row>
            {DetailInfo.provision.dataplane_type === "nodegroup" ? (
              <div>
                <Row
                  className="mb-2 border-top"
                  style={{ paddingTop: "0.5rem" }}
                >
                  <Col
                    style={{
                      textAlign: "center",
                      fontSize: 24,
                      fontWeight: "bold",
                      paddingRight: "1rem",
                    }}
                  >
                    워커 노드 정보
                  </Col>
                </Row>
                {DetailInfo.provision.ng_status.map((node, index) => (
                  <Row
                    key={index}
                    className="border-top"
                    style={{
                      padding: "1rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <GridArray title={"이름"} content={node.node_name} />
                    <GridArray
                      title={"상태"}
                      content={<NDInfoBadge status={node.node_status} />}
                      IsLast={true}
                    />
                  </Row>
                ))}
              </div>
            ) : null}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <AccordianHeader id={props.id} title={"배포 정보"} />
          <Accordion.Body
            style={{ justifyContent: "start", textAlign: "left" }}
          >
            <Row className="mb-2">
              <GridCol
                title={"네임 스페이스 이름"}
                content={DetailInfo.deploy.namespace_name}
              />
              <GridCol
                title={"네임 스페이스 상태"}
                content={
                  DetailInfo.deploy.namespace_status === "Found"
                    ? "활성화"
                    : "비활성화"
                }
              />
              <GridCol
                title={"앱 이름"}
                content={DetailInfo.deploy.deployment_name}
              />
              <GridCol
                title={"앱 상태"}
                content={
                  <DeployInfoBadge
                    status={DetailInfo.deploy.deployment_status}
                  />
                }
                IsLast={true}
              />
            </Row>
            <Row className="mb-2 border-top" style={{ paddingTop: "1rem" }}>
              <GridCol
                title={"서비스 이름"}
                content={DetailInfo.deploy.service_name}
              />
              <GridCol
                title={"서비스 타입"}
                content={DetailInfo.deploy.service_type}
              />
              <GridCol
                title={"서비스 포트"}
                content={DetailInfo.deploy.deployment_port}
                IsLast={true}
              />
            </Row>
            <Row className="mb-2 border-top" style={{ paddingTop: "1rem" }}>
              <GridCol
                title={"서비스 엔드포인트"}
                content={DetailInfo.deploy.service_external_ip}
                IsLast={true}
              />
            </Row>
            <Row className="mb-2 border-top" style={{ paddingTop: "0.5rem" }}>
              <Col
                style={{
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: "bold",
                  paddingRight: "1rem",
                }}
              >
                컨테이너(Pod) 정보
              </Col>
            </Row>

            {DetailInfo.deploy.pod_status == "Not Found" ? (
              <p
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  paddingTop: "1rem",
                }}
              >
                현재 배포된 컨테이너가 없습니다.
              </p>
            ) : (
              DetailInfo.deploy.pod_status.map((pod, index) => (
                <Row
                  key={index}
                  className="border-top"
                  style={{
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <GridArray title={"이름"} content={pod.pod_name} />
                  <GridArray
                    title={"상태"}
                    content={<PodInfoBadge status={pod.pod_status} />}
                    IsLast={true}
                  />
                </Row>
              ))
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default RequestDetail;
