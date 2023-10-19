import React from "react";
import Hero from "../components/Hero";
// import { useLocation } from "react-router-dom";

function RequestDetailPage() {
  // const location = useLocation();
  // const { progress } = location.state;
  return (
    <>
      <Hero currentPage="MainPage" />
      <div className="px-4 my-2 text-center">
        <h1 className="display-5 fw-bold lh-1 mb-4">Request Detail</h1>
        {/* <h2>{progress}</h2> */}
      </div>
    </>
  );
}

export default RequestDetailPage;
