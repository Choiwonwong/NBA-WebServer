import React from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { coyWithoutShadows } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { Container } from "react-bootstrap";
import "./MDCard.css";

function MDCard({ markdownContent }) {
  return (
    <Container className="docu-container">
      <div
        className="mx-auto border rounded-3 shadow-lg "
        style={{
          width: "auto",
          margin: "2rem",
          paddingTop: "2rem",
          paddingLeft: "3rem",
          paddingRight: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <ReactMarkdown
          children={markdownContent}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = "yaml";
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  children={String(children).replace(/\n$/, "")}
                  style={coyWithoutShadows}
                  language={match}
                  PreTag="div"
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </Container>
  );
}

export default MDCard;
