import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MDCard from "../components/MDCard";

function DocumentPage() {
  const [markdownContent, setMarkdownContent] = useState(""); // 상태를 사용하여 Markdown 내용을 저장

  useEffect(() => {
    // 페이지가 마운트될 때 Markdown 파일을 가져옵니다
    fetch("questDocument.md")
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text));
  }, []);

  return (
    <>
      <Hero currentPage="DocumentPage" />
      <div className="px-4 my-2 text-center">
        <h1 className="display-5 fw-bold">Quest Documentation</h1>
      </div>
      {/* <hr /> */}
      <MDCard markdownContent={markdownContent} /> {/* Markdown 내용을 전달 */}
    </>
  );
}

export default DocumentPage;
