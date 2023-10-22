import React from "react";
import Badge from "react-bootstrap/Badge";

function MetaInfoBadge({ status }) {
  let variant = "secondary"; // 기본값

  // 처리 상태에 따라 적절한 색상을 선택
  if (status === "시작") {
    variant = "primary";
  } else if (status === "실패") {
    variant = "danger";
  } else if (status === "성공") {
    variant = "success";
  } else if (status === null) {
    status = "대기";
    variant = "secondary";
  } else {
    status = "오류";
    variant = "waring";
  }

  return (
    <Badge pill bg={variant} style={{ fontSize: 15 }}>
      {status}
    </Badge>
  );
}

function EKSInfoBadge({ status }) {
  let variant = "secondary"; // 기본값

  // 처리 상태에 따라 적절한 색상을 선택
  if (status === "ACTIVE") {
    variant = "success";
  } else if (status === "CREATING") {
    variant = "primary";
  } else {
    variant = "danger";
  }

  return (
    <Badge pill bg={variant} style={{ fontSize: 15, marginTop: "0.2rem" }}>
      {status}
    </Badge>
  );
}

function DPInfoBadge({ status }) {
  let variant = "secondary"; // 기본값

  // 처리 상태에 따라 적절한 색상을 선택
  if (status === "ACTIVE") {
    variant = "success";
  } else if (status === "CREATING") {
    variant = "primary";
  } else if (status === "CREATE_FAILED") {
    variant = "danger";
  } else {
    status = "오류";
    variant = "danger";
  }

  return (
    <Badge pill bg={variant} style={{ fontSize: 15, marginTop: "0.2rem" }}>
      {status}
    </Badge>
  );
}

export { MetaInfoBadge, EKSInfoBadge, DPInfoBadge };
