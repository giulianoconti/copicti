import React, { useEffect, useState } from "react";
import { BoxPicturesContainer } from "../../components/boxPicturesContainer/BoxPicturesContainer";
import copictiPolyptychL from "../../pictures/copictiPolyptychL.webp";
import copictiPolyptychM from "../../pictures/copictiPolyptychM.webp";
import copictiPolyptychS from "../../pictures/copictiPolyptychS.webp";
import copictiPolyptychSameHeightL from "../../pictures/copictiPolyptychSameHeightL.webp";
import copictiPolyptychSameHeightM from "../../pictures/copictiPolyptychSameHeightM.webp";
import copictiPolyptychSameHeightS from "../../pictures/copictiPolyptychSameHeightS.webp";
import copictiTriptychL from "../../pictures/copictiTriptychL.webp";
import copictiTriptychM from "../../pictures/copictiTriptychM.webp";
import copictiTriptychS from "../../pictures/copictiTriptychS.webp";
import copictiTriptychLSquare from "../../pictures/copictiTriptychLSquare.webp";
import copictiTriptychMSquare from "../../pictures/copictiTriptychMSquare.webp";
import copictiTriptychSSquare from "../../pictures/copictiTriptychSSquare.webp";
import copictiTriptychLCircular from "../../pictures/copictiTriptychLCircular.webp";
import copictiTriptychMCircular from "../../pictures/copictiTriptychMCircular.webp";
import copictiTriptychSCircular from "../../pictures/copictiTriptychSCircular.webp";
import arrowLeft from "../../pictures/arrow-left.svg";
import copictiEmpty from "../../pictures/copictiEmpty.webp";
import copictiEmptyPlant from "../../pictures/copictiEmptyPlant.webp";
import { IsLoading } from "../../components/isLoading/IsLoading";
import "./CreatePictureView.css";
import "../../stylesGlobal.css";

const allCopictiImages = {
  polyptychL: copictiPolyptychL,
  polyptychM: copictiPolyptychM,
  polyptychS: copictiPolyptychS,
  polyptychSameHeightL: copictiPolyptychSameHeightL,
  polyptychSameHeightM: copictiPolyptychSameHeightM,
  polyptychSameHeightS: copictiPolyptychSameHeightS,
  triptychL: copictiTriptychL,
  triptychM: copictiTriptychM,
  triptychS: copictiTriptychS,
  triptychSquareL: copictiTriptychLSquare,
  triptychSquareM: copictiTriptychMSquare,
  triptychSquareS: copictiTriptychSSquare,
  triptychCircularL: copictiTriptychLCircular,
  triptychCircularM: copictiTriptychMCircular,
  triptychCircularS: copictiTriptychSCircular,
};

export const CreatePictureView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [optionSelected, setOptionSelected] = useState({
    background: copictiPolyptychL,
    distribution: "",
    images: [],
    oneOrMultipleImages: "",
    size: "",
  });

  /*   min-left: 3.1% | min-top: 2.67% |          10cm === 4.65% width === 6.35% height   */
  const [picturesPlaced, setPicturesPlaced] = useState([]);

  useEffect(() => {
    /* when changing the background, the loading screen starts until it finishes loading */
    if (optionSelected.size !== "") {
      setIsLoading(true);
      handleOptionSelected(
        "background",
        allCopictiImages[optionSelected.distribution + optionSelected.size[0].toUpperCase()]
      );
      const loadCopictiImage = new Image();
      loadCopictiImage.src = allCopictiImages[optionSelected.distribution + optionSelected.size[0].toUpperCase()];
      loadCopictiImage.onload = () => {
        setIsLoading(false);
      };
    } else {
      setIsLoading(false);
    }
  }, [optionSelected.size]);

  const handleAddPicture = () => {
    /* the first picture added is placed in the middle */
    if (picturesPlaced.length === 0) {
      setPicturesPlaced([
        ...picturesPlaced,
        {
          height: 74,
          id: "picturesPlaced " + picturesPlaced.length,
          left: 39.5,
          top: 15,
          width: 21,
          borderRadius: 0,
        },
      ]);
      /* the others pictures are added on one side so that they are visible in most cases */
    } else {
      setPicturesPlaced([
        ...picturesPlaced,
        {
          height: 15,
          id: "picturesPlaced " + picturesPlaced.length,
          left: 91.5,
          top: 85,
          width: 8.5,
          borderRadius: 0,
        },
      ]);
    }
  };

  const handleRemovePicture = () => {
    setPicturesPlaced(picturesPlaced.slice(0, -1));
  };

  const handleChangeOptionsPicture = ({ target: { name, value, type } }) => {
    /* change cm to % */
    let typeNumberValid = false;
    if (type === "number") {
      if (value <= (100 - picturesPlaced[picturesPlaced.length - 1]?.left) * 2.4 && name === "width") {
        value = value * 0.41666666666;
        typeNumberValid = true;
      } else if (value <= (100 - picturesPlaced[picturesPlaced.length - 1]?.top) * 1.35 && name === "height") {
        value = value * 0.74074074074;
        typeNumberValid = true;
      } else if (value <= (100 - picturesPlaced[picturesPlaced.length - 1]?.width) * 2.4 && name === "left") {
        value = value * 0.41666666666;
        typeNumberValid = true;
      } else if (value <= (100 - picturesPlaced[picturesPlaced.length - 1]?.height) * 1.35 && name === "top") {
        value = value * 0.74074074074;
        typeNumberValid = true;
      }
    }

    if (type !== "number" || name === "borderRadius" || typeNumberValid) {
      if (name === "width" || name === "left") {
        /* modify last item */
        if (!isNaN(value) && value >= 0 && value <= 100) {
          setPicturesPlaced([
            ...picturesPlaced.slice(0, -1),
            {
              ...picturesPlaced[picturesPlaced.length - 1],
              [name]: value,
            },
          ]);
        }
      } else if (name === "height" || name === "top") {
        /* modify last item */
        if (!isNaN(value) && value >= 0 && value <= 100) {
          setPicturesPlaced([
            ...picturesPlaced.slice(0, -1),
            {
              ...picturesPlaced[picturesPlaced.length - 1],
              [name]: value,
            },
          ]);
        }
      } else if (name === "borderRadius") {
        /* modify last item */
        if (!isNaN(value) && value >= 0 && value <= 50) {
          setPicturesPlaced([
            ...picturesPlaced.slice(0, -1),
            {
              ...picturesPlaced[picturesPlaced.length - 1],
              [name]: value,
            },
          ]);
        }
      }
    }
  };

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
      }
    }
  };

  if (isLoading)
    return (
      <div className="createPicture-screen">
        <div className="createPicture-container">
          <IsLoading />
        </div>
      </div>
    );

  return (
    <div className="createPicture-screen">
      <div className="createPicture-container">
        {optionSelected.distribution === "" && (
          <>
            <h1 className="createPicture-title">Choose the distribution of images you want</h1>
            <BoxPicturesContainer
              boxes={[
                {
                  title: "Polyptych",
                  pictures: {
                    texts: [[""], ["1:2"], ["1:2"], ["1:2"], [""]],
                    sizes: ["s", "m", "l", "m", "s"],
                  },
                  optionSelected: ["distribution", "polyptych"],
                },
                {
                  title: "Polyptych with the same height",
                  pictures: {
                    texts: [["3:8"], ["1:2"], ["3:8"], ["1:2"]],
                    sizes: ["ml", "l", "ml", "l"],
                  },
                  optionSelected: ["distribution", "polyptychSameHeight"],
                },
                {
                  title: "Triptych",
                  pictures: {
                    texts: [["1:2"], ["1:2"], ["1:2"]],
                    sizes: ["l", "l", "l"],
                  },
                  optionSelected: ["distribution", "triptych"],
                },
                {
                  title: "Triptych with the same height and width",
                  pictures: {
                    texts: [["1:1"], ["1:1"], ["1:1"]],
                    sizes: ["l-sq", "l-sq", "l-sq"],
                  },
                  optionSelected: ["distribution", "triptychSquare"],
                },
                {
                  title: "Triptych with the same circular height and width",
                  pictures: {
                    texts: [["1:1"], ["1:1"], ["1:1"]],
                    sizes: ["l-cl", "l-cl", "l-cl"],
                  },
                  optionSelected: ["distribution", "triptychCircular"],
                },
                {
                  title: "CUSTOM",
                  pictures: {
                    texts: [["1:2"], ["1:1"], ["1:1"], ["3:8"]],
                    sizes: ["l", "l-cl", "l-sq", "ml"],
                  },
                  optionSelected: ["distribution", "custom"],
                },
              ]}
              handleOptionSelected={handleOptionSelected}
            />
          </>
        )}
        {optionSelected.distribution === "polyptych" && (
          <>
            <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("distribution", "")}>
              <img className="createPicture-svg" src={arrowLeft} alt="previous" />
            </button>
            {optionSelected.oneOrMultipleImages === "" && (
              <>
                <BoxPicturesContainer
                  boxes={[
                    {
                      title: "One Image",
                      pictures: {
                        texts: [[], [], [], [], []],
                        sizes: ["s", "m", "l", "m", "s"],
                      },
                      optionSelected: ["oneOrMultipleImages", "one"],
                    },
                    {
                      title: "Multiple Image",
                      pictures: {
                        texts: [[], [], [], [], []],
                        bg: ["bg-1", "bg-2", "bg-3", "bg-4", "bg-5"],
                        sizes: ["s", "m", "l", "m", "s"],
                      },
                      optionSelected: ["oneOrMultipleImages", "multiple"],
                    },
                  ]}
                  handleOptionSelected={handleOptionSelected}
                />
              </>
            )}
            {optionSelected.oneOrMultipleImages !== "" && optionSelected.size === "" && (
              <>
                <button
                  className="createPicture-btn-previus"
                  onClick={() => handleOptionSelected("oneOrMultipleImages", "")}
                >
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <BoxPicturesContainer
                  boxes={[
                    {
                      title: "Polyptych Large",
                      pictures: {
                        texts: [
                          ["30", "x", "60"],
                          ["40", "x", "80"],
                          ["50", "x", "100"],
                          ["40", "x", "80"],
                          ["30", "x", "60"],
                        ],
                        sizes: ["s", "m", "l", "m", "s"],
                      },
                      optionSelected: ["size", "large"],
                    },
                    {
                      title: "Polyptych Medium",
                      pictures: {
                        texts: [
                          ["20", "x", "40"],
                          ["30", "x", "60"],
                          ["40", "x", "80"],
                          ["30", "x", "60"],
                          ["20", "x", "40"],
                        ],
                        sizes: ["s", "m", "l", "m", "s"],
                      },
                      optionSelected: ["size", "medium"],
                    },
                    {
                      title: "Polyptych Small",
                      pictures: {
                        texts: [
                          ["10", "x", "20"],
                          ["20", "x", "40"],
                          ["30", "x", "60"],
                          ["20", "x", "40"],
                          ["10", "x", "20"],
                        ],
                        sizes: ["s", "m", "l", "m", "s"],
                      },
                      optionSelected: ["size", "small"],
                    },
                  ]}
                  handleOptionSelected={handleOptionSelected}
                />
              </>
            )}
            {optionSelected.size !== "" && optionSelected.oneOrMultipleImages === "one" && (
              <div className="createPicture-box-show-img">
                <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("size", "")}>
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <div className="createPicture-span-btn-file">
                  <span className="createPicture-span">Recommended Aspect Ratio 16/9</span>
                  <label className="w-20">
                    <input className="d-none" type="file" onChange={handleFileUpload} />
                    <span
                      className={
                        optionSelected.images.length ? "createPicture-btn-file" : "createPicture-btn-file-center"
                      }
                    >
                      Browse Image
                    </span>
                  </label>
                </div>
                <div className="createPicture-image-final">
                  {optionSelected.images[0] && (
                    <img
                      className={`createPicture-image-uploaded 
                        ${optionSelected.size === "large" ? "wh-81" : ""} 
                        ${optionSelected.size === "medium" ? "wh-71" : ""} 
                        ${optionSelected.size === "small" ? "wh-61" : ""}`}
                      alt="select image"
                      id="canvas"
                      src={optionSelected.images[0]}
                    />
                  )}
                  <img className="createPicture-image-frame" alt="frame" src={optionSelected.background} />
                </div>
              </div>
            )}
          </>
        )}
        {optionSelected.distribution === "polyptychSameHeight" && (
          <>
            {optionSelected.oneOrMultipleImages === "" && (
              <>
                <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("distribution", "")}>
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <BoxPicturesContainer
                  boxes={[
                    {
                      title: "One Image",
                      pictures: {
                        texts: [[], [], [], []],
                        sizes: ["ml", "l", "ml", "l"],
                      },
                      optionSelected: ["oneOrMultipleImages", "one"],
                    },
                    {
                      title: "Multiple Image",
                      pictures: {
                        texts: [[], [], [], []],
                        bg: ["bg-2", "bg-3", "bg-4", "bg-5"],
                        sizes: ["ml", "l", "ml", "l"],
                      },
                      optionSelected: ["oneOrMultipleImages", "multiple"],
                    },
                  ]}
                  handleOptionSelected={handleOptionSelected}
                />
              </>
            )}
            {optionSelected.oneOrMultipleImages !== "" && optionSelected.size === "" && (
              <>
                <button
                  className="createPicture-btn-previus"
                  onClick={() => handleOptionSelected("oneOrMultipleImages", "")}
                >
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <BoxPicturesContainer
                  boxes={[
                    {
                      title: "Polyptych Large",
                      pictures: {
                        texts: [
                          ["37.5", "x", "100"],
                          ["50", "x", "100"],
                          ["37.5", "x", "100"],
                          ["50", "x", "100"],
                        ],
                        sizes: ["ml", "l", "ml", "l"],
                      },
                      optionSelected: ["size", "large"],
                    },
                    {
                      title: "Polyptych Medium",
                      pictures: {
                        texts: [
                          ["30", "x", "80"],
                          ["40", "x", "80"],
                          ["30", "x", "80"],
                          ["40", "x", "80"],
                        ],
                        sizes: ["ml", "l", "ml", "l"],
                      },
                      optionSelected: ["size", "medium"],
                    },
                    {
                      title: "Polyptych Small",
                      pictures: {
                        texts: [
                          ["22.5", "x", "60"],
                          ["30", "x", "60"],
                          ["22.5", "x", "60"],
                          ["30", "x", "60"],
                        ],
                        sizes: ["ml", "l", "ml", "l"],
                      },
                      optionSelected: ["size", "small"],
                    },
                  ]}
                  handleOptionSelected={handleOptionSelected}
                />
              </>
            )}
            {optionSelected.size !== "" && optionSelected.oneOrMultipleImages === "one" && (
              <div className="createPicture-box-show-img">
                <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("size", "")}>
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <div className="createPicture-span-btn-file">
                  <span className="createPicture-span">Recommended Aspect Ratio 16/9</span>
                  <label className="w-20">
                    <input className="d-none" type="file" onChange={handleFileUpload} />
                    <span
                      className={
                        optionSelected.images.length ? "createPicture-btn-file" : "createPicture-btn-file-center"
                      }
                    >
                      Browse Image
                    </span>
                  </label>
                </div>
                <div className="createPicture-image-final">
                  {optionSelected.images[0] && (
                    <img
                      className={`createPicture-image-uploaded 
                    ${optionSelected.size === "large" ? "wh-81" : ""} 
                    ${optionSelected.size === "medium" ? "wh-71" : ""} 
                    ${optionSelected.size === "small" ? "wh-61" : ""}`}
                      alt="select image"
                      id="canvas"
                      src={optionSelected.images[0]}
                    />
                  )}
                  <img className="createPicture-image-frame" alt="frame" src={optionSelected.background} />
                </div>
              </div>
            )}
          </>
        )}
        {optionSelected.distribution === "triptych" && (
          <>
            {optionSelected.oneOrMultipleImages === "" && (
              <>
                <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("distribution", "")}>
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <BoxPicturesContainer
                  boxes={[
                    {
                      title: "One Image",
                      pictures: {
                        texts: [[], [], []],
                        sizes: ["l", "l", "l"],
                      },
                      optionSelected: ["oneOrMultipleImages", "one"],
                    },
                    {
                      title: "Multiple Image",
                      pictures: {
                        texts: [[], [], []],
                        bg: ["bg-2", "bg-3", "bg-4"],
                        sizes: ["l", "l", "l"],
                      },
                      optionSelected: ["oneOrMultipleImages", "multiple"],
                    },
                  ]}
                  handleOptionSelected={handleOptionSelected}
                />
              </>
            )}
            {optionSelected.oneOrMultipleImages !== "" && optionSelected.size === "" && (
              <>
                <button
                  className="createPicture-btn-previus"
                  onClick={() => handleOptionSelected("oneOrMultipleImages", "")}
                >
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <BoxPicturesContainer
                  boxes={[
                    {
                      title: "Triptych Large",
                      pictures: {
                        texts: [
                          ["50", "x", "100"],
                          ["50", "x", "100"],
                          ["50", "x", "100"],
                        ],
                        sizes: ["l", "l", "l"],
                      },
                      optionSelected: ["size", "large"],
                    },
                    {
                      title: "Triptych Medium",
                      pictures: {
                        texts: [
                          ["40", "x", "80"],
                          ["40", "x", "80"],
                          ["40", "x", "80"],
                        ],
                        sizes: ["m", "m", "m"],
                      },
                      optionSelected: ["size", "medium"],
                    },
                    {
                      title: "Triptych Small",
                      pictures: {
                        texts: [
                          ["30", "x", "60"],
                          ["30", "x", "60"],
                          ["30", "x", "60"],
                        ],
                        sizes: ["s", "s", "s"],
                      },
                      optionSelected: ["size", "small"],
                    },
                  ]}
                  handleOptionSelected={handleOptionSelected}
                />
              </>
            )}
            {optionSelected.size !== "" && optionSelected.oneOrMultipleImages === "one" && (
              <div className="createPicture-box-show-img">
                <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("size", "")}>
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <div className="createPicture-span-btn-file">
                  <span className="createPicture-span">Recommended Aspect Ratio 16/9</span>
                  <label className="w-20">
                    <input className="d-none" type="file" onChange={handleFileUpload} />
                    <span
                      className={
                        optionSelected.images.length ? "createPicture-btn-file" : "createPicture-btn-file-center"
                      }
                    >
                      Browse Image
                    </span>
                  </label>
                </div>
                <div className="createPicture-image-final">
                  {optionSelected.images[0] && (
                    <img
                      className={`createPicture-image-uploaded 
                    ${optionSelected.size === "large" ? "wh-81" : ""} 
                    ${optionSelected.size === "medium" ? "wh-71" : ""} 
                    ${optionSelected.size === "small" ? "wh-61" : ""}`}
                      alt="select image"
                      id="canvas"
                      src={optionSelected.images[0]}
                    />
                  )}
                  <img className="createPicture-image-frame" alt="frame" src={optionSelected.background} />
                </div>
              </div>
            )}
          </>
        )}
        {optionSelected.distribution === "triptychSquare" && (
          <>
            {optionSelected.oneOrMultipleImages === "" && (
              <>
                <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("distribution", "")}>
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <BoxPicturesContainer
                  boxes={[
                    {
                      title: "One Image",
                      pictures: {
                        texts: [[], [], []],
                        sizes: ["l-sq", "l-sq", "l-sq"],
                      },
                      optionSelected: ["oneOrMultipleImages", "one"],
                    },
                    {
                      title: "Multiple Image",
                      pictures: {
                        texts: [[], [], []],
                        bg: ["bg-2", "bg-3", "bg-4"],
                        sizes: ["l-sq", "l-sq", "l-sq"],
                      },
                      optionSelected: ["oneOrMultipleImages", "multiple"],
                    },
                  ]}
                  handleOptionSelected={handleOptionSelected}
                />
              </>
            )}
            {optionSelected.oneOrMultipleImages !== "" && optionSelected.size === "" && (
              <>
                <button
                  className="createPicture-btn-previus"
                  onClick={() => handleOptionSelected("oneOrMultipleImages", "")}
                >
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <BoxPicturesContainer
                  boxes={[
                    {
                      title: "Triptych Square Large",
                      pictures: {
                        texts: [
                          ["50", "x", "50"],
                          ["50", "x", "50"],
                          ["50", "x", "50"],
                        ],
                        sizes: ["l-sq", "l-sq", "l-sq"],
                      },
                      optionSelected: ["size", "large"],
                    },
                    {
                      title: "Triptych Square Medium",
                      pictures: {
                        texts: [
                          ["40", "x", "40"],
                          ["40", "x", "40"],
                          ["40", "x", "40"],
                        ],
                        sizes: ["m-sq", "m-sq", "m-sq"],
                      },
                      optionSelected: ["size", "medium"],
                    },
                    {
                      title: "Triptych Square Small",
                      pictures: {
                        texts: [
                          ["30", "x", "30"],
                          ["30", "x", "30"],
                          ["30", "x", "30"],
                        ],
                        sizes: ["s-sq", "s-sq", "s-sq"],
                      },
                      optionSelected: ["size", "small"],
                    },
                  ]}
                  handleOptionSelected={handleOptionSelected}
                />
              </>
            )}
            {optionSelected.size !== "" && optionSelected.oneOrMultipleImages === "one" && (
              <div className="createPicture-box-show-img">
                <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("size", "")}>
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <div className="createPicture-span-btn-file">
                  <span className="createPicture-span">Recommended Aspect Ratio 16/9</span>
                  <label className="w-20">
                    <input className="d-none" type="file" onChange={handleFileUpload} />
                    <span
                      className={
                        optionSelected.images.length ? "createPicture-btn-file" : "createPicture-btn-file-center"
                      }
                    >
                      Browse Image
                    </span>
                  </label>
                </div>
                <div className="createPicture-image-final">
                  {optionSelected.images[0] && (
                    <img
                      className={`createPicture-image-uploaded 
                    ${optionSelected.size === "large" ? "wh-81" : ""} 
                    ${optionSelected.size === "medium" ? "wh-71" : ""} 
                    ${optionSelected.size === "small" ? "wh-61" : ""}`}
                      alt="select image"
                      id="canvas"
                      src={optionSelected.images[0]}
                    />
                  )}
                  <img className="createPicture-image-frame" alt="frame" src={optionSelected.background} />
                </div>
              </div>
            )}
          </>
        )}
        {optionSelected.distribution === "triptychCircular" && (
          <>
            {optionSelected.oneOrMultipleImages === "" && (
              <>
                <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("distribution", "")}>
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <BoxPicturesContainer
                  boxes={[
                    {
                      title: "One Image",
                      pictures: {
                        texts: [[], [], []],
                        sizes: ["l-cl", "l-cl", "l-cl"],
                      },
                      optionSelected: ["oneOrMultipleImages", "one"],
                    },
                    {
                      title: "Multiple Image",
                      pictures: {
                        texts: [[], [], []],
                        bg: ["bg-2", "bg-3", "bg-4"],
                        sizes: ["l-cl", "l-cl", "l-cl"],
                      },
                      optionSelected: ["oneOrMultipleImages", "multiple"],
                    },
                  ]}
                  handleOptionSelected={handleOptionSelected}
                />
              </>
            )}
            {optionSelected.oneOrMultipleImages !== "" && optionSelected.size === "" && (
              <>
                <button
                  className="createPicture-btn-previus"
                  onClick={() => handleOptionSelected("oneOrMultipleImages", "")}
                >
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <BoxPicturesContainer
                  boxes={[
                    {
                      title: "Triptych Circular Large",
                      pictures: {
                        texts: [["50Ø"], ["50Ø"], ["50Ø"]],
                        sizes: ["l-cl", "l-cl", "l-cl"],
                      },
                      optionSelected: ["size", "large"],
                    },
                    {
                      title: "Triptych Circular Medium",
                      pictures: {
                        texts: [["40Ø"], ["40Ø"], ["40Ø"]],
                        sizes: ["m-cl", "m-cl", "m-cl"],
                      },
                      optionSelected: ["size", "medium"],
                    },
                    {
                      title: "Triptych Circular Small",
                      pictures: {
                        texts: [["30Ø"], ["30Ø"], ["30Ø"]],
                        sizes: ["s-cl", "s-cl", "s-cl"],
                      },
                      optionSelected: ["size", "small"],
                    },
                  ]}
                  handleOptionSelected={handleOptionSelected}
                />
              </>
            )}
            {optionSelected.size !== "" && optionSelected.oneOrMultipleImages === "one" && (
              <div className="createPicture-box-show-img">
                <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("size", "")}>
                  <img className="createPicture-svg" src={arrowLeft} alt="previous" />
                </button>
                <div className="createPicture-span-btn-file">
                  <span className="createPicture-span">Recommended Aspect Ratio 16/9</span>
                  <label className="w-20">
                    <input className="d-none" type="file" onChange={handleFileUpload} />
                    <span
                      className={
                        optionSelected.images.length ? "createPicture-btn-file" : "createPicture-btn-file-center"
                      }
                    >
                      Browse Image
                    </span>
                  </label>
                </div>
                <div className="createPicture-image-final">
                  {optionSelected.images[0] && (
                    <img
                      className={`createPicture-image-uploaded 
                    ${optionSelected.size === "large" ? "wh-81" : ""} 
                    ${optionSelected.size === "medium" ? "wh-71" : ""} 
                    ${optionSelected.size === "small" ? "wh-61" : ""}`}
                      alt="select image"
                      id="canvas"
                      src={optionSelected.images[0]}
                    />
                  )}
                  <img className="createPicture-image-frame" alt="frame" src={optionSelected.background} />
                </div>
              </div>
            )}
          </>
        )}
        {optionSelected.distribution === "custom" && (
          <div className="createPicture-box-show-img">
            <button className="createPicture-btn-previus" onClick={() => handleOptionSelected("distribution", "")}>
              <img className="createPicture-svg" src={arrowLeft} alt="previous" />
            </button>
            <div className="createPicture-span-btn-file">
              <span className="createPicture-span">Recommended Aspect Ratio 16/9</span>
              <label className="w-20">
                <input className="d-none" type="file" onChange={handleFileUpload} />
                <span
                  className={optionSelected.images.length ? "createPicture-btn-file" : "createPicture-btn-file-center"}
                >
                  Browse Image
                </span>
              </label>
            </div>
            <div className="createPicture-image-final">
              <div className="createPicture-container-frames">
                {picturesPlaced.length > 0 &&
                  picturesPlaced?.map((picture) => (
                    <div
                      className="image-cropped"
                      style={{
                        height: picture.height + "%",
                        left: picture.left + "%",
                        top: picture.top + "%",
                        width: picture.width + "%",
                        borderRadius: picture.borderRadius + "%",
                      }}
                      key={picture.id}
                    >
                      <img
                        className="image-cropped-calc"
                        style={{
                          height: (100 / picture.height) * 100 + "%",
                          left: (100 / picture.width) * picture.left * -1 + "%",
                          top: (100 / picture.height) * picture.top * -1 + "%",
                          width: (100 / picture.width) * 100 + "%",
                        }}
                        src={optionSelected.images[0]}
                      />
                    </div>
                  ))}
              </div>
              <div className="createPicture-container-frames z-index-20 overflow-visible">
                {picturesPlaced.length &&
                  picturesPlaced?.map(({ width, height, left, top }) => (
                    <>
                      <p
                        className="image-cropped-width"
                        style={{
                          left: parseInt(left) + parseInt(width) / 2.5 + "%",
                          top: parseInt(top) + parseInt(height) - 4 + "%",
                        }}
                      >
                        {Math.round(width * 2.4)}cm
                      </p>
                      <p
                        className="image-cropped-height"
                        style={{
                          left: parseInt(left) + parseInt(width) - 3.5 + "%",
                          top: parseInt(top) + parseInt(height) / 2.5 + "%",
                        }}
                      >
                        {Math.round(height * 1.35)}cm
                      </p>
                      <p
                        className="image-cropped-left"
                        style={{ left: parseInt(left) + 0.5 + "%", top: parseInt(top) + 1 + "%" }}
                      >
                        {Math.round(left * 2.4)}cm
                      </p>
                      <p
                        className="image-cropped-top"
                        style={{ left: parseInt(left) + 0.5 + "%", top: parseInt(top) + 6 + "%" }}
                      >
                        {Math.round(top * 1.35)}cm
                      </p>
                    </>
                  ))}
              </div>
              <img className="createPicture-image-frame-plant" alt="frame" src={copictiEmptyPlant} />
              <img className="createPicture-image-frame" alt="frame" src={copictiEmpty} />
            </div>
            {optionSelected.images.length > 0 && (
              <div className="createPicture-custom-container">
                <div className="createPicture-custom-buttons">
                  <button className="createPicture-btn-file bg-red color-black" onClick={handleRemovePicture}>
                    Remove Last Picture
                  </button>
                  <button className="createPicture-btn-file bg-green color-black" onClick={handleAddPicture}>
                    Add New Picture
                  </button>
                </div>
                <div className="createPicture-custom-box-container">
                  <div className="createPicture-custom-box">
                    <h5 className="createPicture-custom-title color-light-blue">Width</h5>
                    <input
                      className="createPicture-input-range"
                      type="range"
                      min="0"
                      max={100 - picturesPlaced[picturesPlaced.length - 1]?.left || ""}
                      name="width"
                      value={picturesPlaced[picturesPlaced.length - 1]?.width || ""}
                      onChange={handleChangeOptionsPicture}
                    />
                    <input
                      className="createPicture-input-number color-light-blue"
                      type="number"
                      name="width"
                      min="0"
                      max={100 - picturesPlaced[picturesPlaced.length - 1]?.left || ""}
                      value={Math.round(picturesPlaced[picturesPlaced.length - 1]?.width * 2.4) || ""}
                      onChange={handleChangeOptionsPicture}
                    />
                    <p className="createPicture-custom-text color-light-blue">cm</p>
                  </div>
                  <div className="createPicture-custom-box">
                    <h5 className="createPicture-custom-title color-light-yellow">Height</h5>
                    <input
                      className="createPicture-input-range"
                      type="range"
                      min="0"
                      max={100 - picturesPlaced[picturesPlaced.length - 1]?.top || ""}
                      name="height"
                      value={picturesPlaced[picturesPlaced.length - 1]?.height || ""}
                      onChange={handleChangeOptionsPicture}
                    />
                    <input
                      className="createPicture-input-number color-light-yellow"
                      type="number"
                      name="height"
                      min="0"
                      max={100 - picturesPlaced[picturesPlaced.length - 1]?.top || ""}
                      value={Math.round(picturesPlaced[picturesPlaced.length - 1]?.height * 1.35) || ""}
                      onChange={handleChangeOptionsPicture}
                    />
                    <p className="createPicture-custom-text color-light-yellow">cm</p>
                  </div>
                  <div className="createPicture-custom-box">
                    <h5 className="createPicture-custom-title color-light-pink">Left</h5>
                    <input
                      className="createPicture-input-range"
                      type="range"
                      min="0"
                      max={100 - picturesPlaced[picturesPlaced.length - 1]?.width || ""}
                      name="left"
                      value={picturesPlaced[picturesPlaced.length - 1]?.left || ""}
                      onChange={handleChangeOptionsPicture}
                    />
                    <input
                      className="createPicture-input-number color-light-pink"
                      type="number"
                      name="left"
                      min="0"
                      max={100 - picturesPlaced[picturesPlaced.length - 1]?.width || ""}
                      value={Math.round(picturesPlaced[picturesPlaced.length - 1]?.left * 2.4) || ""}
                      onChange={handleChangeOptionsPicture}
                    />
                    <p className="createPicture-custom-text color-light-pink">cm</p>
                  </div>
                  <div className="createPicture-custom-box">
                    <h5 className="createPicture-custom-title color-light-cyan">Top</h5>
                    <input
                      className="createPicture-input-range"
                      type="range"
                      min="0"
                      max={100 - picturesPlaced[picturesPlaced.length - 1]?.height || ""}
                      name="top"
                      value={picturesPlaced[picturesPlaced.length - 1]?.top || ""}
                      onChange={handleChangeOptionsPicture}
                    />
                    <input
                      className="createPicture-input-number color-light-cyan"
                      type="number"
                      name="top"
                      min="0"
                      max={100 - picturesPlaced[picturesPlaced.length - 1]?.height || ""}
                      value={Math.round(picturesPlaced[picturesPlaced.length - 1]?.top * 1.35) || ""}
                      onChange={handleChangeOptionsPicture}
                    />
                    <p className="createPicture-custom-text color-light-cyan">cm</p>
                  </div>
                  <div className="createPicture-custom-box">
                    <h5 className="createPicture-custom-title">Radius</h5>
                    <input
                      className="createPicture-input-range"
                      type="range"
                      min="0"
                      max="50"
                      name="borderRadius"
                      value={picturesPlaced[picturesPlaced.length - 1]?.borderRadius || ""}
                      onChange={handleChangeOptionsPicture}
                    />
                    <input
                      className="createPicture-input-number"
                      type="number"
                      name="borderRadius"
                      min="0"
                      max="50"
                      value={picturesPlaced[picturesPlaced.length - 1]?.borderRadius || ""}
                      onChange={handleChangeOptionsPicture}
                    />
                    <p className="createPicture-custom-text">%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
