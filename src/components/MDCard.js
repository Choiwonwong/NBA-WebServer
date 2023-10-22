import Markdown from "react-markdown";
import "./MDCard.css";
import { Container } from "react-bootstrap";

function MDCard({ markdownContent }) {
  return (
    <Container className="my-5 card-container ">
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
        <Markdown>{markdownContent}</Markdown>
      </div>
    </Container>
  );
}

export default MDCard;
