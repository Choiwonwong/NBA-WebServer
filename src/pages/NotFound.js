import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css"; // You can create a CSS file for styling
import Hero from "../components/Hero";

function NotFound() {
  const [rainbowColor, setRainbowColor] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setRainbowColor((rainbowColor + 1) % 7);
    }, 700);

    return () => clearInterval(interval);
  }, [rainbowColor]);

  const handleClick = () => {
    navigate("/");
  };
  const getRandomTranslation = () => {
    const randomX = Math.floor(Math.random() * 200 - 100); // Random value between -100 and 100
    const randomY = Math.floor(Math.random() * 200 - 100);
    return `translate(${randomX}px, ${randomY}px)`;
  };
  const style = {
    animation: `move 2s infinite`,
    transform: getRandomTranslation(),
    fontSize: 100,
  };

  return (
    <>
      <Hero currentPage={"MainPage"} />
      <div className="not-found-container">
        <h1
          className={`rainbow-text color-${rainbowColor}`}
          onClick={handleClick}
          style={style}
        >
          Not Found
        </h1>
      </div>
    </>
  );
}

export default NotFound;
