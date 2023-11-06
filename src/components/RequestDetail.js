import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Badge } from "react-bootstrap";
import {
  MetaInfoBadge,
  EKSInfoBadge,
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
        {props.content === "Not Found" ? (
          <Badge pill bg={"danger"}>
            {props.content}
          </Badge>
        ) : (
          <p>{props.content}</p>
        )}
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

function InfoHeader({ title, isFirst }) {
  return (
    <Row
      className={isFirst === true ? "mb-2" : "mb-2 border-top"}
      style={isFirst === true ? {} : { paddingTop: "0.5rem" }}
    >
      <Col
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
          paddingRight: "1rem",
        }}
      >
        {title}
      </Col>
    </Row>
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
                  IsLast={true}
                  content={<MetaInfoBadge status={MetaInfo.deployState} />}
                />
              </Row>
              <Row
                className="border-top justify-content-center"
                style={{ paddingTop: "1rem" }}
              >
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
        {DetailInfo.eks_present === true ? (
          <Accordion.Item eventKey="1">
            <AccordianHeader id={props.id} title={"프로비저닝 정보"} />
            <Accordion.Body
              style={{ justifyContent: "start", textAlign: "left" }}
            >
              <InfoHeader title={"VPC 정보"} isFirst={true} />
              <Row className="mb-2 border-top" style={{ paddingTop: "0.5rem" }}>
                <GridCol
                  title={"VPC 이름"}
                  content={
                    DetailInfo.provision.vpc_name === null
                      ? "찾지 못함"
                      : DetailInfo.provision.vpc_name
                  }
                />
                <GridCol
                  title={"Public 서브넷 개수"}
                  content={DetailInfo.provision.public_subnet_count}
                />
                <GridCol
                  title={"Private 서브넷 개수"}
                  content={DetailInfo.provision.private_subnet_count}
                  IsLast={true}
                />
              </Row>
              <InfoHeader title={"EKS 정보"} isFirst={false} />
              <Row className="mb-2 border-top" style={{ paddingTop: "1rem" }}>
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
                  content={DetailInfo.provision.dataplane_type + " 기반"}
                />
                <GridCol
                  title={"가상머신 개수"}
                  content={DetailInfo.provision.ng_current_count}
                  IsLast={true}
                />
              </Row>
              {DetailInfo.ng_present === true ? (
                <div>
                  <InfoHeader title={"가상머신 정보"} isFirst={false} />
                  {DetailInfo.provision.ng_status === "Not Found" ||
                  DetailInfo.provision.ng_status === null ? (
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        paddingTop: "1rem",
                      }}
                    >
                      현재 가상머신 정보를 불러올 수 없습니다.
                    </p>
                  ) : Array.isArray(DetailInfo.provision.ng_status) ? (
                    DetailInfo.provision.ng_status.map((node, index) => (
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
                    ))
                  ) : null}
                </div>
              ) : null}
            </Accordion.Body>
          </Accordion.Item>
        ) : null}
        {DetailInfo.eks_active === true ? (
          <Accordion.Item eventKey="2">
            <AccordianHeader id={props.id} title={"배포 정보"} />
            <Accordion.Body
              style={{ justifyContent: "start", textAlign: "left" }}
            >
              <InfoHeader title={"배포 기본 정보"} isFirst={true} />
              <Row className="mb-2 border-top" style={{ paddingTop: "1rem" }}>
                <GridCol
                  title={"네임 스페이스 이름"}
                  content={DetailInfo.deploy.namespace_name}
                />
                <GridCol
                  title={"네임 스페이스 상태"}
                  content={
                    <DeployInfoBadge
                      status={
                        DetailInfo.deploy.namespace_status === "Found"
                          ? "Present"
                          : "Not Present"
                      }
                    />
                  }
                />
                <GridCol
                  title={"서비스 이름"}
                  content={DetailInfo.deploy.service_name}
                  IsLast={true}
                />
              </Row>
              <Row className="mb-2 border-top" style={{ paddingTop: "1rem" }}>
                <GridCol
                  title={"서비스 타입"}
                  content={DetailInfo.deploy.service_type}
                />
                <GridCol
                  title={"서비스 포트"}
                  content={DetailInfo.deploy.deployment_port}
                />
                <GridCol
                  title={"서비스 엔드포인트"}
                  content={DetailInfo.deploy.service_external_ip}
                  IsLast={true}
                />
              </Row>
              <InfoHeader title={"앱 정보"} isFirst={false} />
              <Row className="mb-2 border-top" style={{ paddingTop: "1rem" }}>
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
                />
                <GridCol
                  title={"복제본 개수"}
                  content={DetailInfo.deploy.replicas}
                  IsLast={true}
                />
              </Row>
              <Row className="mb-2 border-top" style={{ paddingTop: "0.5rem" }}>
                <GridCol
                  title={"이미지 명"}
                  content={DetailInfo.deploy.image_name}
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

              {DetailInfo.deploy.pod_status === "Not Found" ||
              DetailInfo.deploy.pod_status === null ? (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    paddingTop: "1rem",
                  }}
                >
                  현재 컨테이너 정보를 불러올 수 없습니다.
                </p>
              ) : Array.isArray(DetailInfo.deploy.pod_status) ? (
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
              ) : null}
            </Accordion.Body>
          </Accordion.Item>
        ) : null}
      </Accordion>
    </Container>
  );
}

export default RequestDetail;
