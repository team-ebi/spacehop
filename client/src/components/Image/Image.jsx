import React, { useState, useEffect } from "react";
import { getSingleObject } from "../../utils/index";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../List/List.css";

export default function Image({ photos, bizId, arrows }) {
  const [images, setImages] = useState([]); // state should just be data, don't put jsx

  // get 64bit data from each string element (key) in allPhotos array
  useEffect(() => {
    async function addImages(photoArray) {
      for (const key of photoArray) {
        const bits = await getSingleObject(bizId, key);
        setImages((state) => [...state, { bits, key }]);
      }
    }
    addImages(photos);
  }, [photos]);

  return (
    <Slider dots={true} className="list" slidesToShow={1} swipe={true} arrows={arrows}>
      {images.map((image) => (
          <div className="list-img-container" >
              <img
                src={"data:image/png;base64, " + image.bits}
                className="list-image"
                alt={image.key}
                key={image.key}
              />
          </div>
      ))}
    </Slider>
  );
}
