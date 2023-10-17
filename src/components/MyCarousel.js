import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Caption from "./Caption"; // Import the Caption component

const cw2Caption = {
  name: "최원웅",
  imageUrl:
    "https://tistory2.daumcdn.net/tistory/6288365/skinSetting/e980ea6daf0a4737b19d20a2650faf55",
  description: "팀장 및 Front & Back-end 개발 담당",
};

const benCaption = {
  name: "진수철",
  imageUrl:
    "https://tistory2.daumcdn.net/tistory/6288365/skinSetting/e980ea6daf0a4737b19d20a2650faf55",
  description: "팀장 및 Front & Back-end 개발 담당",
};

const minjaCaption = {
  name: "서민재",
  imageUrl:
    "https://tistory2.daumcdn.net/tistory/6288365/skinSetting/e980ea6daf0a4737b19d20a2650faf55",
  description: "팀장 및 Front & Back-end 개발 담당",
};

const doranCaption = {
  name: "김도현",
  imageUrl:
    "https://tistory2.daumcdn.net/tistory/6288365/skinSetting/e980ea6daf0a4737b19d20a2650faf55",
  description: "팀장 및 Front & Back-end 개발 담당",
};

const cDragonCaption = {
  name: "김성용",
  imageUrl:
    "https://tistory2.daumcdn.net/tistory/6288365/skinSetting/e980ea6daf0a4737b19d20a2650faf55",
  description: "팀장 및 Front & Back-end 개발 담당",
};

function MyCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      className="mb-4"
      variant="dark"
    >
      <Carousel.Item>
        <Caption
          name={cw2Caption.name}
          imageUrl={cw2Caption.imageUrl}
          description={cw2Caption.description}
        />
      </Carousel.Item>

      <Carousel.Item>
        <Caption
          name={benCaption.name}
          imageUrl={benCaption.imageUrl}
          description={benCaption.description}
        />
      </Carousel.Item>

      <Carousel.Item>
        <Caption
          name={minjaCaption.name}
          imageUrl={minjaCaption.imageUrl}
          description={minjaCaption.description}
        />
      </Carousel.Item>

      <Carousel.Item>
        <Caption
          name={doranCaption.name}
          imageUrl={doranCaption.imageUrl}
          description={doranCaption.description}
        />
      </Carousel.Item>

      <Carousel.Item>
        <Caption
          name={cDragonCaption.name}
          imageUrl={cDragonCaption.imageUrl}
          description={cDragonCaption.description}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
