// RequestPage.js

import React from "react";
import Hero from "../components/Hero";
import RequestCard from "../components/RequestCard";

const introDesc = `Quest.yaml 파일을 아래의 입력 창에 입력해주세요.
해당 파일이 올바르게 작성되었는지, AWS Credential의 권한은 충분한지를 검사할거에요
문제가 없다면, 요청하신 사항을 확인하신 후 서비스를 사용하실 수 있어요.`;

function RequestPage() {
  const [requestProgress, setRequestProgress] = React.useState(0);
  return (
    <>
      <Hero currentPage="RequestPage" />
      <RequestCard
        title={"첫번째 단계 - Quest.yaml 입력"}
        description={introDesc}
        useButton={false}
      />
    </>
  );
}

export default RequestPage;
