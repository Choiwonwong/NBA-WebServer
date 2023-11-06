import React from "react";
import Badge from "react-bootstrap/Badge";

function MetaInfoBadge({ status }) {
  let variant = "secondary"; // 기본값

  // 처리 상태에 따라 적절한 색상을 선택
  if (status === "start") {
    status = "시작";
    variant = "primary";
  } else if (status === "failed") {
    status = "실패";
    variant = "danger";
  } else if (status === "success") {
    status = "성공";
    variant = "success";
  } else if (status === null) {
    status = "대기";
    variant = "secondary";
  } else if (status === "skip") {
    status = "생략";
    variant = "secondary";
  } else {
    status = "오류";
    variant = "warning";
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
  } else if (status === "DELETING") {
    variant = "warning";
  } else {
    variant = "danger";
  }

  return (
    <Badge pill bg={variant} style={{ fontSize: 15, marginTop: "0.2rem" }}>
      {status}
    </Badge>
  );
}

function NDInfoBadge({ status }) {
  let variant = "secondary"; // 기본값

  // 처리 상태에 따라 적절한 색상을 선택
  if (status === "InService") {
    status = "서비스 중";
    variant = "success";
  } else if (status === "Pending") {
    variant = "danger";
  } else {
    variant = "warning";
  }

  return (
    <Badge pill bg={variant} style={{ fontSize: 15, marginTop: "0.2rem" }}>
      {status}
    </Badge>
  );
}

function PodInfoBadge({ status }) {
  let variant = "secondary"; // 기본값

  // 처리 상태에 따라 적절한 색상을 선택
  if (status === "Running" || status === "Succeeded") {
    variant = "success";
  } else if (status === "ContainerCreating") {
    variant = "primary";
  } else if (status === "Unknown") {
    variant = "warning";
  } else {
    variant = "danger";
  }

  return (
    <Badge pill bg={variant} style={{ fontSize: 15, marginTop: "0.2rem" }}>
      {status}
    </Badge>
  );
}

function DeployInfoBadge({ status }) {
  let variant = "secondary"; // 기본값

  // 처리 상태에 따라 적절한 색상을 선택
  if (
    status === "Available" ||
    status === "Progressing" ||
    status === "Present"
  ) {
    variant = "success";
  } else {
    variant = "danger";
  }

  return (
    <Badge pill bg={variant} style={{ fontSize: 15, marginTop: "0.2rem" }}>
      {status}
    </Badge>
  );
}

export {
  MetaInfoBadge,
  EKSInfoBadge,
  NDInfoBadge,
  PodInfoBadge,
  DeployInfoBadge,
};
