import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Divider from "./Divider";

function Hero({ currentPage }) {
  return (
    <>
      <div className="px-4 py-3 my-4 text-center">
        <Link to="/" currentPage="MainPage" style={{ textDecoration: "none" }}>
          <h1 className="display-2 fw-bold lh-1 mb-3">Quest</h1>
        </Link>
        <div className="col-lg-12 mb-4">
          <p className="lead display-7 mb-4">
            프로비저닝 및 배포 통합 서비스
            <br />
            프로비저닝에 필요한 정보와 배포에 필요한 정보를 한 곳에 모아
            관리합니다.
            <br />한 곳에 모은 정보를 통해 EKS 클러스터를 생성하고, 작성된
            애플리케이션의 배포를 진행합니다.
          </p>
          <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
            <Link to="/request" currentPage="RequestPage">
              <Button
                variant={`${
                  currentPage === "RequestPage" ? "primary" : "secondary"
                }`}
                size="lg"
              >
                Quest Request
              </Button>
            </Link>
            <Link to="/request-list" currentPage="RequestListPage">
              <Button
                variant={`${
                  currentPage === "RequestListPage" ? "success" : "secondary"
                }`}
                size="lg"
              >
                Request List
              </Button>
            </Link>
            <Link to="/document" currentPage="DocumentPage">
              <Button
                variant={`${
                  currentPage === "DocumentPage" ? "info" : "secondary"
                }`}
                size="lg"
              >
                Quest Document
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default Hero;
