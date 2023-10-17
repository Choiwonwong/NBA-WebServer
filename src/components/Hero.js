import React from "react";
import { Link } from "react-router-dom";
import ButtonLink from "./ButtonLink"; // Import the new ButtonLink component
import Divider from "./Divider";
import "../components/ButtonLink.css";

function Hero({ currentPage }) {
  return (
    <>
      <div className="px-4 py-3 my-4 text-center">
        <Link to="/" currentPage="MainPage" style={{ textDecoration: "none" }}>
          <h1 className="display-1 fw-bold lh-1 mb-3">Quest</h1>
        </Link>
        <div className="col-lg-12 mb-4">
          <p className="lead display-7 mb-4" style={{ fontSize: 24 }}>
            <strong className="display-6 fw-bold">
              프로비저닝 및 배포 통합 서비스
            </strong>
            <br />
            <br />
            프로비저닝에 필요한 정보와 배포에 필요한 정보를 한 곳에 모아
            관리합니다.
            <br />한 곳에 모은 정보를 통해 EKS 클러스터를 생성하고, 작성된
            애플리케이션의 배포를 진행합니다.
          </p>
          <hr className="my-4"></hr>
          <div
            className="d-grid gap-4 d-sm-flex justify-content-sm-center"
            style={{ paddingTop: "1rem" }}
          >
            <ButtonLink
              to="/request"
              nextPage="RequestPage"
              currentPage={currentPage}
              variant="primary"
              text="Quest Request"
              cName="hover-questRequest"
            />
            <ButtonLink
              to="/request-list"
              nextPage="RequestListPage"
              currentPage={currentPage}
              variant="success"
              text="Request List"
              cName="hover-requestList"
            />
            <ButtonLink
              to="/document"
              nextPage="DocumentPage"
              currentPage={currentPage}
              variant="info"
              text="Quest Document"
              cName="hover-questDocu"
            />
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default Hero;
