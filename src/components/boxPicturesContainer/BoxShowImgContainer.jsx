import React from "react";
import arrowLeft from "../../assets/arrow-left.svg";
import homeFrameFull from "../../assets/homeFrameFull.webp";
import PropTypes from "prop-types";

export const BoxShowImgContainer = ({ handleOptionSelected, handleFileUpload, containerImgsRef, images }) => {
  return (
    <div className="createPicture-box-show-img">
      <div className="w-90">
        <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("size", "")}>
          <img className="createPicture-svg" src={arrowLeft} alt="previous" />
        </button>
      </div>
      <div className="createPicture-btn-file-uploaded">
        <label
          className={
            images?.imageUploaded !== homeFrameFull
              ? "createPicture-btn-file max-w-156"
              : "createPicture-btn-file-center"
          }
        >
          <input className="d-none" type="file" onChange={handleFileUpload} />
          <span>Browse Image</span>
        </label>
      </div>
      <div className="createPicture-image-final" ref={containerImgsRef}>
        {images?.imageDistribution && (
          <img
            className="createPicture-image-uploaded"
            alt="select image"
            src={images?.imageUploaded}
            style={{ height: `${images?.height}%`, width: `${images?.width}%`, top: `${images?.top}%` }}
          />
        )}
        <img className="createPicture-image-frame" alt="frame" src={images?.imageDistribution} />
      </div>
    </div>
  );
};

BoxShowImgContainer.propTypes = {
  handleOptionSelected: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  containerImgsRef: PropTypes.object.isRequired,
  images: PropTypes.object.isRequired,
};
