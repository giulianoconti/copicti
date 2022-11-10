import React from "react";
import { useParams } from "react-router-dom";
import arrowLeft from "../../assets/arrow-left.svg";
import PropTypes from "prop-types";

export const BoxPicturesContainer = ({ boxes = [], handleOptionSelected }) => {
  const { distributionId } = useParams();
  return (
    <>
      {distributionId && (
        <div className="w-90">
          <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("distribution", "")}>
            <img className="createPicture-svg" src={arrowLeft} alt="previous" />
          </button>
        </div>
      )}
      {boxes.map((box) => (
        <button
          className="createPicture-box"
          onClick={() => handleOptionSelected(box?.optionSelected[0], box?.optionSelected[1])}
          key={box.title}
        >
          <div className="createPicture-image">
            {box?.pictures?.texts?.map((text, i) => (
              <div
                className={`createPicture-picture createPicture-${box?.pictures?.sizes[i]} scale-${
                  box?.optionSelected[1]
                } ${box?.pictures?.bg ? box?.pictures?.bg[i] : ""}`}
                key={i}
              >
                {text?.map((t, i) => (
                  <h5 className="createPicture-text" key={i}>
                    {t}
                  </h5>
                ))}
              </div>
            ))}
          </div>

          <h3 className="createPicture-pic-title">{box.title}</h3>
        </button>
      ))}
    </>
  );
};

BoxPicturesContainer.propTypes = {
  boxes: PropTypes.array.isRequired,
  handleOptionSelected: PropTypes.func.isRequired,
};
