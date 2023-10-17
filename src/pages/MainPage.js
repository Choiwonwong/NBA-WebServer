// MainPage.js

import React from "react";
import Hero from "../components/Hero";
import Divider from "../components/Divider";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const QuestRequestDesc = `EKS 및 AWS Load Balancer Controller 등을 새로 또는 기존 환경에 빠르고 쉽게 배포해보세요.
Quest는 프로비저닝 및 배포에 필요한 정보를 한 곳에 모아 관리할 수 있습니다.
프로비저닝된 또는 기존에 존재하는 EKS 환경에 개발한 애플리케이션을 배포할 수 있습니다.
아래의 버튼을 눌러 Quest 서비스를 사용해보세요.
`;

const QuestDocuDesc = `Quest 서비스를 위해선 Quest.yaml 파일이 필요합니다.
최대한 간단하게 작성할 수 있도록 설계되었습니다.
Quest.yaml 파일을 작성하는 방법은 아래의 버튼을 눌러 문서를 참고하세요.
`;

const QuestListDesc = `기존에 Quest 서비스를 사용해보신적이 있으신가요?
아래의 버튼을 눌러 지금까지 서비스 진행 상황을 확인해보세요.
`;

function MainPage() {
  return (
    <>
      <Hero currentPage="MainPage" />
      <div class="container col-xxl-8 px-4 py-2">
        <div class="row align-items-center g-5 py-5 mb-3">
          <InfoCard
            title="쉽고 통합된 프로비저닝 및 배포 서비스"
            description={QuestRequestDesc}
            buttonLink={"/request"}
            buttonType={"primary"}
            buttonText={"Quest Request"}
          />
          <hr class="my-4"></hr>
          <InfoCard
            title="Quest.yaml 메뉴얼"
            description={QuestDocuDesc}
            buttonType={"info"}
            buttonText={"Documentation"}
            buttonLink={"/document"}
          />
          <hr class="my-4"></hr>
          <InfoCard
            title="Quest 목록"
            description={QuestListDesc}
            buttonType={"success"}
            buttonText={"Quest List"}
            buttonLink={"/request-list"}
          />
        </div>
      </div>
      <Divider />
    </>
  );
}

function InfoCard({ title, description, buttonText, buttonType, buttonLink }) {
  return (
    <div class="card" className="col-lg-9">
      <h1 className="display-5 fw-bold l-h1 mb-4">{title}</h1>
      <p className="lead">
        {description.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <div className="d-grid gap-2 d-md-flex justify-content-md-start">
        <Link to={buttonLink}>
          <Button variant={buttonType} size="lg">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
