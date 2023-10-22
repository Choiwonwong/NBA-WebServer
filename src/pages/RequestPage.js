import React, { useState } from "react";
import Hero from "../components/Hero";
import RequestCheck from "../components/RequestCheck";
import RequestConfirm from "../components/RequestConfirm";
import Divider from "../components/Divider";
import { RequestPageDesc } from "../components/Description";

function RequestPage() {
  const [requestProgress, setRequestProgress] = useState(0);
  const [questYaml, setQuestYaml] = useState(null);
  const [processedQuest, setProcessedQuest] = useState("");

  const handleQuestYamlChange = (questYamlData) => {
    setQuestYaml({ questYamlData });
  };

  return (
    <>
      <Hero currentPage="RequestPage" />
      <RequestCheck
        title={"첫번째 단계 - Quest.yaml 입력"}
        description={RequestPageDesc.introDesc}
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
            description={RequestPageDesc.confirmDesc}
            questYaml={questYaml}
            processedQuestYaml={processedQuest}
          />
        </>
      )}
    </>
  );
}

export default RequestPage;
