import React from "react";
import { Link } from "react-router-dom";
import "./ButtonLink.css";
import Button from "react-bootstrap/Button";

function ButtonLink({ to, nextPage, currentPage, variant, text, cName }) {
  return (
    <Link to={to} currentPage={currentPage}>
      <Button
        variant={currentPage === nextPage ? variant : "secondary"}
        size="lg"
        className={cName}
      >
        {text}
      </Button>
    </Link>
  );
}

export default ButtonLink;
