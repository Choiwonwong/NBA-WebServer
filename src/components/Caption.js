import React from "react";

function Caption({ name, imageUrl, description }) {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={imageUrl}
        alt="auto"
        style={{ filter: "brightness(95%)", width: "50%", height: "auto" }}
      />
      <div style={{ background: "rgba(0, 0, 0, 0.6)", padding: "20px" }}>
        <h3
          className="display-6 fw-bold"
          style={{ color: "white", fontSize: "auto" }}
        >
          {name}
        </h3>
        <p style={{ color: "white", fontSize: 20 }}>{description}</p>
      </div>
    </div>
  );
}

export default Caption;
