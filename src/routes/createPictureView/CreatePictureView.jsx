import React, { useState } from "react";
import copictiPolyptychM from "../../pictures/copictiPolyptychM.png";
import "./CreatePictureView.css";
import "../../stylesGlobal.css";

export const CreatePictureView = () => {
  const [optionSelected, setOptionSelected] = useState({
    distribution: "",
    size: "",
    oneOrMultipleImages: "",
    images: [],
  });

  const handleOptionSelected = (key, value) => {
    setOptionSelected({
      ...optionSelected,
      [key]: value,
    });
  };

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      if (e.target.files[0].type.includes("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          handleOptionSelected("images", [reader.result]);
        };
      } else {
        alert("Please upload an image file");
        console.log("optuas");
      }
    }
  };

  return (
    <div className="createPicture-screen">
      <div className="createPicture-container">
        {optionSelected.distribution === "" && (
          <>
            <h1 className="createPicture-title">Choose the distribution of images you want</h1>
            <button className="createPicture-box" onClick={() => handleOptionSelected("distribution", "polyptych")}>
              <div className="createPicture-image">
                <div className="createPicture-picture createPicture-s"></div>
                <div className="createPicture-picture createPicture-m">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
                <div className="createPicture-picture createPicture-l">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
                <div className="createPicture-picture createPicture-m">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
                <div className="createPicture-picture createPicture-s"></div>
              </div>
              <h3 className="createPicture-pic-title">Polyptych</h3>
            </button>
            <button className="createPicture-box">
              <div className="createPicture-image" onClick={() => handleOptionSelected("distribution", "polyptych2")}>
                <div className="createPicture-picture createPicture-ml">
                  <h5 className="createPicture-text">3:8</h5>
                </div>
                <div className="createPicture-picture createPicture-l">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
                <div className="createPicture-picture createPicture-ml">
                  <h5 className="createPicture-text">3:8</h5>
                </div>
                <div className="createPicture-picture createPicture-l">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
              </div>
              <h3 className="createPicture-pic-title">Polyptych with the same height</h3>
            </button>
            <button className="createPicture-box" onClick={() => handleOptionSelected("distribution", "triptych")}>
              <div className="createPicture-image">
                <div className="createPicture-picture createPicture-l">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
                <div className="createPicture-picture createPicture-l">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
                <div className="createPicture-picture createPicture-l">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
              </div>
              <h3 className="createPicture-pic-title">Triptych</h3>
            </button>
            <button className="createPicture-box" onClick={() => handleOptionSelected("distribution", "triptych2")}>
              <div className="createPicture-image">
                <div className="createPicture-picture createPicture-l-sq">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
                <div className="createPicture-picture createPicture-l-sq">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
                <div className="createPicture-picture createPicture-l-sq">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
              </div>
              <h3 className="createPicture-pic-title">Triptych with the same height and width</h3>
            </button>
            <button className="createPicture-box" onClick={() => handleOptionSelected("distribution", "triptych3")}>
              <div className="createPicture-image">
                <div className="createPicture-picture createPicture-l-cl">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
                <div className="createPicture-picture createPicture-l-cl">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
                <div className="createPicture-picture createPicture-l-cl">
                  <h5 className="createPicture-text">1:2</h5>
                </div>
              </div>
              <h3 className="createPicture-pic-title">Triptych with the same circular height and width</h3>
            </button>
          </>
        )}
        {optionSelected.distribution === "polyptych" && optionSelected.size === "" && (
          <>
            <button className="createPicture-box" onClick={() => handleOptionSelected("size", "large")}>
              <div className="createPicture-image">
                <div className="createPicture-picture createPicture-s scale-1_25 mx-6">
                  <h5 className="createPicture-text">30</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">60</h5>
                </div>
                <div className="createPicture-picture createPicture-m scale-1_25 mx-6">
                  <h5 className="createPicture-text">40</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">80</h5>
                </div>
                <div className="createPicture-picture createPicture-l scale-1_25 mx-6">
                  <h5 className="createPicture-text">50</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">100</h5>
                </div>
                <div className="createPicture-picture createPicture-m scale-1_25 mx-6">
                  <h5 className="createPicture-text">40</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">80</h5>
                </div>
                <div className="createPicture-picture createPicture-s scale-1_25 mx-6">
                  <h5 className="createPicture-text">30</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">60</h5>
                </div>
              </div>
              <h3 className="createPicture-pic-title">Polyptych Large</h3>
            </button>
            <button className="createPicture-box" onClick={() => handleOptionSelected("size", "medium")}>
              <div className="createPicture-image">
                <div className="createPicture-picture createPicture-s">
                  <h5 className="createPicture-text">20</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">40</h5>
                </div>
                <div className="createPicture-picture createPicture-m">
                  <h5 className="createPicture-text">30</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">60</h5>
                </div>
                <div className="createPicture-picture createPicture-l">
                  <h5 className="createPicture-text">40</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">80</h5>
                </div>
                <div className="createPicture-picture createPicture-m">
                  <h5 className="createPicture-text">30</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">60</h5>
                </div>
                <div className="createPicture-picture createPicture-s">
                  <h5 className="createPicture-text">20</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">40</h5>
                </div>
              </div>
              <h3 className="createPicture-pic-title">Polyptych Medium</h3>
            </button>
            <button className="createPicture-box" onClick={() => handleOptionSelected("size", "small")}>
              <div className="createPicture-image">
                <div className="createPicture-picture createPicture-s scale-0_75 m-0">
                  <h5 className="createPicture-text">10</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">20</h5>
                </div>
                <div className="createPicture-picture createPicture-m scale-0_75 m-0">
                  <h5 className="createPicture-text">20</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">40</h5>
                </div>
                <div className="createPicture-picture createPicture-l scale-0_75 m-0">
                  <h5 className="createPicture-text">30</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">60</h5>
                </div>
                <div className="createPicture-picture createPicture-m scale-0_75 m-0">
                  <h5 className="createPicture-text">20</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">40</h5>
                </div>
                <div className="createPicture-picture createPicture-s scale-0_75 m-0">
                  <h5 className="createPicture-text">10</h5>
                  <h5 className="createPicture-text">x</h5>
                  <h5 className="createPicture-text">20</h5>
                </div>
              </div>
              <h3 className="createPicture-pic-title">Polyptych Small</h3>
            </button>
            <div className="w-100">
              <button className="createPicture-btn" onClick={() => handleOptionSelected("distribution", "")}>
                back
              </button>
            </div>
          </>
        )}
        {optionSelected.size !== "" && optionSelected.oneOrMultipleImages === "" && (
          <>
            <button className="createPicture-box" onClick={() => handleOptionSelected("oneOrMultipleImages", "one")}>
              <div className="createPicture-image">
                <div className="createPicture-picture createPicture-s" />
                <div className="createPicture-picture createPicture-m" />
                <div className="createPicture-picture createPicture-l" />
                <div className="createPicture-picture createPicture-m" />
                <div className="createPicture-picture createPicture-s" />
              </div>
              <h3 className="createPicture-pic-title">One Image</h3>
            </button>
            <button
              className="createPicture-box"
              onClick={() => handleOptionSelected("oneOrMultipleImages", "multiple")}
            >
              <div className="createPicture-image">
                <div className="createPicture-picture createPicture-s bg-2" />
                <div className="createPicture-picture createPicture-m bg-3" />
                <div className="createPicture-picture createPicture-l bg-4" />
                <div className="createPicture-picture createPicture-m bg-5" />
                <div className="createPicture-picture createPicture-s bg-6" />
              </div>
              <h3 className="createPicture-pic-title">Multiple Images</h3>
            </button>
            <div className="w-100">
              <button className="createPicture-btn" onClick={() => handleOptionSelected("size", "")}>
                back
              </button>
            </div>
          </>
        )}
        {optionSelected.oneOrMultipleImages === "one" && (
          <div className="createPicture-box-show-img">
            <div className="createPicture-span-btn-file">
              <span className="createPicture-span">Recommended Aspect Ratio 16/9</span>
              <label className="w-50">
                <input className="d-none" type="file" onChange={handleFileUpload} />
                <span
                  className={optionSelected.images.length ? "createPicture-btn-file" : "createPicture-btn-file-center"}
                >
                  Browse Image
                </span>
              </label>
            </div>
            <div className="createPicture-image-final">
              <img
                className="createPicture-image-uploaded"
                alt="sel image"
                id="canvas"
                src={optionSelected.images[0]}
              />
              <img className="createPicture-image-frame" alt="frame" src={copictiPolyptychM} />
            </div>
            <div className="w-100">
              <button className="createPicture-btn" onClick={() => handleOptionSelected("oneOrMultipleImages", "")}>
                back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
