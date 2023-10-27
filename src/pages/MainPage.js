// MainPage.js

import React from "react";
import Hero from "../components/Hero";
import Divider from "../components/Divider";
import MainCard from "../components/MainCard";
import { MainPageDesc } from "../components/Description";
import "bootstrap/dist/css/bootstrap.min.css";

function MainPage() {
  return (
    <>
      <Hero currentpage="MainPage" />
      <MainCard
        title="쉽고 통합된 프로비저닝 및 배포 서비스"
        description={MainPageDesc.QuestRequestDesc}
        buttonLink={"/request"}
        buttonType={"primary"}
        buttonText={"Quest Request"}
        useButton={true}
      />
      <hr className="my-4"></hr>
      <MainCard
        title="Quest.yaml 메뉴얼"
        description={MainPageDesc.QuestDocuDesc}
        buttonType={"info"}
        buttonText={"Documentation"}
        buttonLink={"/document"}
        useButton={true}
      />
      <hr className="my-4"></hr>
      <MainCard
        title="Quest 목록"
        description={MainPageDesc.QuestListDesc}
        buttonType={"success"}
        buttonText={"Quest List"}
        buttonLink={"/requests"}
        useButton={true}
      />
      <Divider />
      <MainCard title="NBA Team 소개" description={MainPageDesc.TeamDesc} />
    </>
  );
}

export default MainPage;
