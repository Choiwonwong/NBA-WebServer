import React, { useState } from "react";
import Hero from "../components/Hero";
import RequestCheck from "../components/RequestCheck";
import RequestConfirm from "../components/RequestConfirm";
import Divider from "../components/Divider";

const introDesc = `Quest.yaml 파일을 아래의 입력 창에 입력해주세요.
해당 파일이 올바르게 작성되었는지, AWS Credential의 권한은 충분한지를 검사할거에요
문제가 없다면, 요청하신 사항을 확인하신 후 서비스를 사용하실 수 있어요.`;

const confirmDesc = `요청하신 사항이 맞는지 확인해보세요.
Quest 서비스를 요청하시려면 가장 아래의 요청 버튼을 눌러주세요.`;

function RequestPage() {
  const [requestProgress, setRequestProgress] = useState(0);
  const [questYaml, setQuestYaml] = useState(null);
  const [processedQuest, setProcessedQuest] = useState("");

  const handleQuestYamlChange = (questYamlData) => {
    setQuestYaml({ ...questYamlData });
  };

  return (
    <>
      <Hero currentPage="RequestPage" />
      <RequestCheck
        title={"첫번째 단계 - Quest.yaml 입력"}
        description={introDesc}
        useButton={false}
        changeProgress={setRequestProgress}
        getQuestYaml={handleQuestYamlChange}
        getProcessedQuest={setProcessedQuest}
      />
      {requestProgress === 1 && questYaml && (
        <>
          <Divider />
          <RequestConfirm
            title={"두번째 단계 - 확인 및 요청"}
            description={confirmDesc}
            questYaml={questYaml}
            processedQuestYaml={processedQuest}
          />
        </>
      )}
    </>
  );
}

export default RequestPage;
