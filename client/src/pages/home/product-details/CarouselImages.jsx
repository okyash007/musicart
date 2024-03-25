import React from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "./productDetails.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselImages = ({ images }) => {
  const renderCustomPrevButton = (clickHandler, hasPrev, label) => (
    <button onClick={clickHandler} disabled={!hasPrev}>
      Previous
    </button>
  );

  const renderCustomNextButton = (clickHandler, hasNext, label) => (
    <button onClick={clickHandler} disabled={!hasNext}>
      Next
    </button>
  );

  const renderCustomIndicator = (onClickHandler, isSelected, index, label) => {
    const defaultStyle = {
      backgroundColor: "#0000004a",
      cursor: "pointer",
    };

    const style = isSelected
      ? { ...defaultStyle, backgroundColor: "#000000" }
      : { ...defaultStyle };

    return (
      <span
        style={style}
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        value={index}
        key={index}
        role="button"
        tabIndex={0}
        aria-label={`${label} ${index + 1}`}
        className={styles.dot}
      ></span>
    );
  };

  return (
    <Carousel
      infiniteLoop
      showArrows={false}
      showThumbs={false}
      renderIndicator={renderCustomIndicator}
    >
      {images.map((m) => (
        <div key={m}>
          <img src={m} alt="" />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselImages;
