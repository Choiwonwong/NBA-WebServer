// RequestListPage.js

import React from "react";
import Hero from "../components/Hero";
import MDCard from "../components/MDCard";

function DocumentPage() {
  return (
    <>
      <Hero currentPage="DocumentPage" />
      <div className="px-4 my-2 text-center">
        <h1 className="display-5 fw-bold lh-1 mb-4">Quest Documentation</h1>
      </div>
      <hr />
      <MDCard />
    </>
  );
}

export default DocumentPage;
