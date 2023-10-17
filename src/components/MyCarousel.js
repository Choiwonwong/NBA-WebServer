import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const cw2Caption = "팀장 및 Front & Back-end 개발 담당";

function MyCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      className="mb-4"
    >
      <Carousel.Item>
        <div style={{ textAlign: "center" }}>
          <img
            src="https://tistory2.daumcdn.net/tistory/6288365/skinSetting/e980ea6daf0a4737b19d20a2650faf55"
            alt="100%"
            style={{ filter: "brightness(80%)" }} // 밝기 조절
          />
        </div>
        <Carousel.Caption
          style={{ background: "rgba(0, 0, 0, 0.6)", padding: "20px" }}
        >
          <h3 className="display-5 fw-bold" style={{ color: "white" }}>
            최원웅
          </h3>
          <p style={{ color: "white", fontSize: 22 }}>{cw2Caption}</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <div style={{ textAlign: "center" }}>
          <img
            src="https://tistory2.daumcdn.net/tistory/6288365/skinSetting/e980ea6daf0a4737b19d20a2650faf55"
            alt="100%"
            style={{ filter: "brightness(80%)" }} // 밝기 조절
          />
        </div>
        <Carousel.Caption
          style={{ background: "rgba(0, 0, 0, 0.6)", padding: "10px" }}
        >
          <h3 style={{ color: "white" }}>Second slide label</h3>
          <p style={{ color: "white" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
