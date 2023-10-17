import React from "react";

function Caption({ name, imageUrl, description }) {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={imageUrl} alt="100%" style={{ filter: "brightness(95%)" }} />
      <div style={{ background: "rgba(0, 0, 0, 0.6)", padding: "20px" }}>
        <h3 className="display-5 fw-bold" style={{ color: "white" }}>
          {name}
        </h3>
        <p style={{ color: "white", fontSize: 22 }}>{description}</p>
      </div>
    </div>
  );
}

export default Caption;
