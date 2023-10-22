import React from "react";
import { Button } from "react-bootstrap";
import "./ServiceLog.css";

function ServiceLog(props) {
  return (
    <div style={{ textAlign: "center", paddingTop: "1rem" }}>
      <Button
        className="card-button"
        style={{
          marginTop: "1rem",
          marginRight: "5rem",
          fontSize: 32,
          backgroundColor: "#7b42bc",
          borderColor: "purple",
        }}
        disabled={props.progress === "처리 단계" ? true : false}
      >
        프로비저닝 로그
      </Button>
      <Button
        className="card-button"
        variant="primary"
        style={{ marginTop: "1rem", fontSize: 32 }}
        disabled={
          props.progress === "처리 단계" || props.progress === "프로비저닝 단계"
            ? true
            : false
        }
      >
        배포 로그
      </Button>
    </div>
  );
}

export default ServiceLog;
