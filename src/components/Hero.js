import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Hero({ currentPage }) {
  return (
    <div className="px-4 py-3 my-4 text-center">
      <Link to="/" currentPage="MainPage" style={{ textDecoration: "none" }}>
        <h1 className="display-5 fw-bold">Quest</h1>
      </Link>
      <div className="col-lg-12 mx-auto">
        <p className="lead mb-3">
          프로비저닝 및 배포 통합 서비스
          <br />
          프로비저닝에 필요한 정보와 배포에 필요한 정보를 한 곳에 모아
          관리합니다.
          <br />한 곳에 모은 정보를 통해 EKS 클러스터를 생성하고, 작성된
          애플리케이션의 배포를 진행합니다.
        </p>
        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
          <Link to="/request">
            {currentPage === "RequestPage" ? (
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Quest Request
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4 gap-3"
              >
                Quest Request
              </button>
            )}
          </Link>
          <Link to="/request-list" currentPage="RequestListPage">
            {currentPage === "RequestListPage" ? (
              <button type="button" className="btn btn-primary btn-lg px-4">
                Request List
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Request List
              </button>
            )}
          </Link>
          <Link to="/document" currentPage="DocumentPage">
            {currentPage === "DocumentPage" ? (
              <button type="button" className="btn btn-primary btn-lg px-4">
                Quest Document
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Quest Document
              </button>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
