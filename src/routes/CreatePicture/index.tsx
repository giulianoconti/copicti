import { useEffect, useRef, useState } from "react";
import { BoxPicturesContainer, BoxShowImgContainer } from "src/components";
import { IsLoading } from "src/components";
import polyptychL from "src/assets/copictiPolyptychL.webp";
import polyptychM from "src/assets/copictiPolyptychM.webp";
import polyptychS from "src/assets/copictiPolyptychS.webp";
import polyptychSameHeightL from "src/assets/copictiPolyptychSameHeightL.webp";
import polyptychSameHeightM from "src/assets/copictiPolyptychSameHeightM.webp";
import polyptychSameHeightS from "src/assets/copictiPolyptychSameHeightS.webp";
import triptychL from "src/assets/copictiTriptychL.webp";
import triptychM from "src/assets/copictiTriptychM.webp";
import triptychS from "src/assets/copictiTriptychS.webp";
import triptychSquareL from "src/assets/copictiTriptychLSquare.webp";
import triptychSquareM from "src/assets/copictiTriptychMSquare.webp";
import triptychSquareS from "src/assets/copictiTriptychSSquare.webp";
import triptychCircularL from "src/assets/copictiTriptychLCircular.webp";
import triptychCircularM from "src/assets/copictiTriptychMCircular.webp";
import triptychCircularS from "src/assets/copictiTriptychSCircular.webp";
import customEmpty from "src/assets/copictiEmpty.webp";
import customEmptyPlant from "src/assets/copictiEmptyPlant.webp";
import homeFrameFull from "src/assets/homeFrameFull.webp";
import html2canvas from "html2canvas";
import { postImageInStorage, postInStorageProductsImages, postProduct, postUserOrder } from "src/firebase/firebase";
import { useAuth } from "src/context/authContext";
import { useSearchParams } from "react-router-dom";
import "src/stylesGlobal.css";
import "./styles.css";

type CreatePictureProps = {
  adminOpen?: boolean;
  adminNewProduct?: any;
  setAdminNewProduct?: any;
  adminReload?: boolean;
  setAdminReload?: any;
};

interface YourObjectType {
  polyptychL: any;
  polyptychM: any;
  polyptychS: any;
  polyptychSameHeightL: any;
  polyptychSameHeightM: any;
  polyptychSameHeightS: any;
  triptychL: any;
  triptychM: any;
  triptychS: any;
  triptychSquareL: any;
  // ... other properties ...
  custom: any;
  [key: string]: any; // Add this line
}

const allCopictiImages = {
  polyptychL,
  polyptychM,
  polyptychS,
  polyptychSameHeightL,
  polyptychSameHeightM,
  polyptychSameHeightS,
  triptychL,
  triptychM,
  triptychS,
  triptychSquareL,
  triptychSquareM,
  triptychSquareS,
  triptychCircularL,
  triptychCircularM,
  triptychCircularS,
  custom: customEmpty,
} as YourObjectType;

const CreatePicture = ({ adminOpen = false, adminNewProduct = {}, setAdminNewProduct, adminReload = false, setAdminReload }: CreatePictureProps) => {
  const containerImgsRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const distributionParams = searchParams.get("distribution");
  const sizeParams = searchParams.get("size");

  /*   min-left: 3.1% | min-top: 2.67% |          10cm === 4.65% width === 6.35% height   */
  const [picturesPlaced, setPicturesPlaced] = useState([]);
  const { loginWithGoogle, userInfo, images, setImages } = useAuth();

  useEffect(() => {
    // when changing the background, the loading screen starts until it finishes loading
    if (sizeParams !== null || distributionParams === "custom") {
      let heightImage = 81;
      let widthImage = 81;
      let topImage = 0;
      if (sizeParams === "medium") {
        heightImage = 71;
        widthImage = 71;
        topImage = 5;
      } else if (sizeParams === "small") {
        heightImage = 61;
        widthImage = 61;
        topImage = 10;
      }
      setIsLoading(true);
      setImages({
        ...images,
        height: heightImage,
        width: widthImage,
        top: topImage,
        imageDistribution: allCopictiImages[distributionParams + (sizeParams !== null ? sizeParams[0]?.toUpperCase() : "")],
      });
      const imgDistribution = new Image();
      imgDistribution.src = allCopictiImages[distributionParams + (sizeParams !== null ? sizeParams[0]?.toUpperCase() : "")];
      imgDistribution.onload = () => {
        setIsLoading(false);
      };
    } else {
      setIsLoading(false);
    }
  }, [distributionParams, sizeParams]);

  const handleAddPicture = () => {
    /* the first picture added is placed in the middle */
    if (picturesPlaced.length === 0) {
      setPicturesPlaced([
        ...picturesPlaced,
        {
          height: 74,
          _id: "picturesPlaced " + picturesPlaced.length,
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
          _id: "picturesPlaced " + picturesPlaced.length,
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

  const handleChangeOptionsPicture = ({ target: { name, value, type } }: any) => {
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

  const handleFileUpload = ({ target: { files } }: any) => {
    if (files.length <= 1 && files[0].type.includes("image/")) {
      setIsLoading(true);
      /* transform to .webp */
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/webp");
          setImages({
            ...images,
            imageUploaded: dataURL,
            name: files[0].name.split(".")[0],
          });
        };
      };
      setIsLoading(false);
    } else {
      alert("Please upload an image file");
    }
  };

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  interface Options {
    // Other properties...
    willReadFrequently?: boolean;
  }

  /* download the living room with the pictures placed */
  const uploadThisSection = async () => {
    if (userInfo?.email) {
      /* create custom id */

      if (containerImgsRef.current) {
        setIsAddingToCart(true);
        const id = `${userInfo?.email.split("@")[0]}-${Date.now()}`;
        html2canvas(containerImgsRef.current, {
          height: containerImgsRef.current.offsetHeight,
          width: containerImgsRef.current.offsetWidth,
          willReadFrequently: true,
        } as any).then(async (canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/webp");
          try {
            const uploadedImageTransform = transformBase64ToFile(images.imageUploaded, id);
            const uploadedImageLink = await postImageInStorage(uploadedImageTransform);
            const pictureDistributionTransform = transformBase64ToFile(link.href, id + "_distribution");
            const pictureDistributionLink = await postImageInStorage(pictureDistributionTransform);
            const distributionSelected = distributionParams === "custom" ? "custom" : distributionParams + "_" + sizeParams;
            postUserOrder({
              email: userInfo.email,
              order: {
                _id: id,
                name: images.name,
                uploadedImage: uploadedImageLink,
                pictureDistribution: pictureDistributionLink,
                distributionSelected: distributionSelected,
                heightReference: images.height,
                widthReference: images.width,
              },
            })
              .then(() => {
                alert("Your order has been added to the cart");
                setIsAddingToCart(false);
              })
              .catch((error) => {
                console.log(error);
                setIsAddingToCart(false);
              });
          } catch (error) {
            console.log(error);
            setIsAddingToCart(false);
          }
        });
      }
    } else {
      loginWithGoogle();
    }
  };

  const adminUploadInProductsImages = async () => {
    const id = `${userInfo?.email.split("@")[0]}-${Date.now()}`;
    let idProduct = "";
    if (distributionParams === "polyptych") {
      if (sizeParams === "small") {
        idProduct = "AA Polyptych Small";
      } else if (sizeParams === "medium") {
        idProduct = "AA Polyptych Medium";
      } else if (sizeParams === "large") {
        idProduct = "AA Polyptych Large";
      }
    } else if (distributionParams === "polyptychSameHeight") {
      if (sizeParams === "small") {
        idProduct = "AB Polyptych SH Small";
      } else if (sizeParams === "medium") {
        idProduct = "AB Polyptych SH Medium";
      } else if (sizeParams === "large") {
        idProduct = "AB Polyptych SH Large";
      }
    } else if (distributionParams === "triptych") {
      if (sizeParams === "small") {
        idProduct = "AC Triptych Small";
      } else if (sizeParams === "medium") {
        idProduct = "AC Triptych Medium";
      } else if (sizeParams === "large") {
        idProduct = "AC Triptych Large";
      }
    } else if (distributionParams === "triptychSquare") {
      if (sizeParams === "small") {
        idProduct = "AD Triptych Square Small";
      } else if (sizeParams === "medium") {
        idProduct = "AD Triptych Square Medium";
      } else if (sizeParams === "large") {
        idProduct = "AD Triptych Square Large";
      }
    } else if (distributionParams === "triptychCircular") {
      if (sizeParams === "small") {
        idProduct = "AE Triptych Circle Small";
      } else if (sizeParams === "medium") {
        idProduct = "AE Triptych Circle Medium";
      } else if (sizeParams === "large") {
        idProduct = "AE Triptych Circle Large";
      }
    }
    if (adminOpen && adminNewProduct.name !== "" && adminNewProduct.description !== "" && adminNewProduct.price !== "") {
      html2canvas(containerImgsRef.current, {
        scale: 1,
        willReadFrequently: true,
      } as any).then(async (canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/webp");
        try {
          const pictureDistributionTransform = transformBase64ToFile(link.href, id + "_distribution");
          await setAdminNewProduct({
            ...adminNewProduct,
            _id: idProduct,
            image: await postInStorageProductsImages(pictureDistributionTransform, idProduct),
          });
          console.log("Your order has been added to the cart");
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      alert("Please fill all the fields");
    }
  };

  /* useEffect(() => {
    if (adminOpen && adminNewProduct?.image !== "") {
      setTimeout(() => {
        handleAdminAddProduct();
      }, 1000);
    }
  }, [adminNewProduct?.image]); */

  const handleAdminAddProduct = async () => {
    if (
      adminOpen &&
      adminNewProduct.id !== "" &&
      adminNewProduct.name !== "" &&
      adminNewProduct.description !== "" &&
      adminNewProduct.price !== "" &&
      adminNewProduct.image !== ""
    ) {
      await postProduct(adminNewProduct);
      setAdminReload(!adminReload);
      setAdminNewProduct({
        _id: "",
        name: "",
        description: "",
        price: "",
        image: "",
      });
      setImages({
        ...images,
        imageUploaded: homeFrameFull,
      });
    } else {
      alert("Please fill all the fields");
    }
  };

  const transformBase64ToFile = (base64: string, fileName: string) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const handleChangeDistributionSize = ({ target: { name, value } }: any) => {
    setImages({
      ...images,
      [name]: value,
    });
  };

  if (isLoading)
    return (
      <div className="createPicture">
        <div className="createPicture-container">
          <IsLoading />
        </div>
      </div>
    );

  return (
    <div className="createPicture">
      <h1 className="createPicture-title">
        {sizeParams || distributionParams === "custom"
          ? "Create Picture"
          : `Choose the ${distributionParams ? "size" : "distribution"} of images you want`}
      </h1>
      <div className="createPicture-container">
        {distributionParams === null && (
          <BoxPicturesContainer
            boxes={[
              {
                title: "Polyptych",
                distribution: "polyptych",
              },
              {
                title: "Polyptych SH",
                distribution: "polyptychSameHeight",
              },
              {
                title: "Triptych",
                distribution: "triptych",
              },
              {
                title: "Triptych square",
                distribution: "triptychSquare",
              },
              {
                title: "Triptych circular",
                distribution: "triptychCircular",
              },
              {
                title: "CUSTOM",
                distribution: "custom",
              },
            ]}
          />
        )}

        {distributionParams !== null && sizeParams === null && (
          <>
            {distributionParams === "polyptych" && (
              <BoxPicturesContainer
                boxes={[
                  {
                    title: "Polyptych Large",
                    size: "large",
                    distribution: "polyptych",
                  },
                  {
                    title: "Polyptych Medium",
                    size: "medium",
                    distribution: "polyptych",
                  },
                  {
                    title: "Polyptych Small",
                    size: "small",
                    distribution: "polyptych",
                  },
                ]}
              />
            )}
            {distributionParams === "polyptychSameHeight" && (
              <BoxPicturesContainer
                boxes={[
                  {
                    title: "Polyptych Large",
                    size: "large",
                    distribution: "polyptychSameHeight",
                  },
                  {
                    title: "Polyptych Medium",
                    size: "medium",
                    distribution: "polyptychSameHeight",
                  },
                  {
                    title: "Polyptych Small",
                    size: "small",
                    distribution: "polyptychSameHeight",
                  },
                ]}
              />
            )}
            {distributionParams === "triptych" && (
              <BoxPicturesContainer
                boxes={[
                  {
                    title: "Triptych Large",
                    size: "large",
                    distribution: "triptych",
                  },
                  {
                    title: "Triptych Medium",
                    size: "medium",
                    distribution: "triptych",
                  },
                  {
                    title: "Triptych Small",
                    size: "small",
                    distribution: "triptych",
                  },
                ]}
              />
            )}
            {distributionParams === "triptychSquare" && (
              <BoxPicturesContainer
                boxes={[
                  {
                    title: "Triptych Square Large",
                    size: "large",
                    distribution: "triptychSquare",
                  },
                  {
                    title: "Triptych Square Medium",
                    size: "medium",
                    distribution: "triptychSquare",
                  },
                  {
                    title: "Triptych Square Small",
                    size: "small",
                    distribution: "triptychSquare",
                  },
                ]}
              />
            )}
            {distributionParams === "triptychCircular" && (
              <BoxPicturesContainer
                boxes={[
                  {
                    title: "Triptych Circular Large",
                    size: "large",
                    distribution: "triptychCircular",
                  },
                  {
                    title: "Triptych Circular Medium",
                    size: "medium",
                    distribution: "triptychCircular",
                  },
                  {
                    title: "Triptych Circular Small",
                    size: "small",
                    distribution: "triptychCircular",
                  },
                ]}
              />
            )}
            {distributionParams === "custom" && (
              <div className="createPicture-box-show-img">
                <div className="createPicture-btn-file-uploaded">
                  <label className={images?.imageUploaded !== homeFrameFull ? "createPicture-btn-file max-w-156" : "createPicture-btn-file-center"}>
                    <input className="d-none" type="file" onChange={handleFileUpload} />
                    <span>Browse Image</span>
                  </label>
                </div>
                <div className="createPicture-image-final" ref={containerImgsRef}>
                  <div
                    className="createPicture-container-frames"
                    style={{ height: `${images?.height}%`, width: `${images?.width}%`, top: `${images?.top}%` }}
                  >
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
                            src={images?.imageUploaded}
                          />
                        </div>
                      ))}
                  </div>
                  <div className="createPicture-container-frames z-index-20 overflow-visible">
                    {picturesPlaced.length > 0 &&
                      picturesPlaced?.map(({ width, height, left, top, borderRadius }, i) => (
                        <div key={i}>
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
                          <p className="image-cropped-left" style={{ left: parseInt(left) + 0.5 + "%", top: parseInt(top) + 1 + "%" }}>
                            {Math.round(left * 2.4)}cm
                          </p>
                          <p className="image-cropped-top" style={{ left: parseInt(left) + 0.5 + "%", top: parseInt(top) + 6 + "%" }}>
                            {Math.round(top * 1.35)}cm
                          </p>
                          {borderRadius > 0 && (
                            <p
                              className="image-cropped-radius"
                              style={{
                                left: parseInt(left) + parseInt(width) / 2.5 + "%",
                                top: parseInt(top) + parseInt(height) / 2.5 + "%",
                              }}
                            >
                              {Math.round(borderRadius)}%
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                  <img className="createPicture-image-frame-plant" alt="frame" src={customEmptyPlant} />
                  <img className="createPicture-image-frame" alt="frame" src={customEmpty} />
                </div>
                {images?.imageUploaded !== homeFrameFull && (
                  <div className="createPicture-custom-container">
                    <div className="createPicture-custom-buttons">
                      {picturesPlaced.length > 0 && (
                        <button className="createPicture-btn-remove-custom" onClick={handleRemovePicture}>
                          Remove Last Picture
                        </button>
                      )}
                      <button className="createPicture-btn-add-custom" onClick={handleAddPicture}>
                        Add New Picture
                      </button>
                    </div>
                    {picturesPlaced.length > 0 && (
                      <div className="createPicture-custom-box-container">
                        <div className={`createPicture-custom-box ${distributionParams}`}>
                          <h5 className="createPicture-custom-title ">Width</h5>
                          <input
                            className="createPicture-input-range"
                            type="range"
                            min="0"
                            max={100 - picturesPlaced[picturesPlaced.length - 1]?.left || "0"}
                            name="width"
                            value={picturesPlaced[picturesPlaced.length - 1]?.width || "0"}
                            onChange={handleChangeOptionsPicture}
                          />
                          <input
                            className="createPicture-input-number "
                            type="number"
                            name="width"
                            min="0"
                            max={100 - picturesPlaced[picturesPlaced.length - 1]?.left || "0"}
                            value={Math.round(picturesPlaced[picturesPlaced.length - 1]?.width * 2.4) || "0"}
                            onChange={handleChangeOptionsPicture}
                          />
                          <p className="createPicture-custom-text ">cm</p>
                        </div>
                        <div className={`createPicture-custom-box ${distributionParams}`}>
                          <h5 className="createPicture-custom-title">Height</h5>
                          <input
                            className="createPicture-input-range"
                            type="range"
                            min="0"
                            max={100 - picturesPlaced[picturesPlaced.length - 1]?.top || "0"}
                            name="height"
                            value={picturesPlaced[picturesPlaced.length - 1]?.height || "0"}
                            onChange={handleChangeOptionsPicture}
                          />
                          <input
                            className="createPicture-input-number"
                            type="number"
                            name="height"
                            min="0"
                            max={100 - picturesPlaced[picturesPlaced.length - 1]?.top || "0"}
                            value={Math.round(picturesPlaced[picturesPlaced.length - 1]?.height * 1.35) || "0"}
                            onChange={handleChangeOptionsPicture}
                          />
                          <p className="createPicture-custom-text">cm</p>
                        </div>
                        <div className={`createPicture-custom-box ${distributionParams}`}>
                          <h5 className="createPicture-custom-title">Left</h5>
                          <input
                            className="createPicture-input-range"
                            type="range"
                            min="0"
                            max={99.9 - picturesPlaced[picturesPlaced.length - 1]?.width || "0"}
                            name="left"
                            value={picturesPlaced[picturesPlaced.length - 1]?.left || "0"}
                            onChange={handleChangeOptionsPicture}
                          />
                          <input
                            className="createPicture-input-number"
                            type="number"
                            name="left"
                            min="0"
                            max={99.9 - picturesPlaced[picturesPlaced.length - 1]?.width || "0"}
                            value={Math.round(picturesPlaced[picturesPlaced.length - 1]?.left * 2.4) || "0"}
                            onChange={handleChangeOptionsPicture}
                          />
                          <p className="createPicture-custom-text">cm</p>
                        </div>
                        <div className={`createPicture-custom-box ${distributionParams}`}>
                          <h5 className="createPicture-custom-title">Top</h5>
                          <input
                            className="createPicture-input-range"
                            type="range"
                            min="0"
                            max={99.9 - picturesPlaced[picturesPlaced.length - 1]?.height || "0"}
                            name="top"
                            value={picturesPlaced[picturesPlaced.length - 1]?.top || "0"}
                            onChange={handleChangeOptionsPicture}
                          />
                          <input
                            className="createPicture-input-number"
                            type="number"
                            name="top"
                            min="0"
                            max={99.9 - picturesPlaced[picturesPlaced.length - 1]?.height || "0"}
                            value={Math.round(picturesPlaced[picturesPlaced.length - 1]?.top * 1.35) || "0"}
                            onChange={handleChangeOptionsPicture}
                          />
                          <p className="createPicture-custom-text">cm</p>
                        </div>
                        <div className="createPicture-custom-box">
                          <h5 className="createPicture-custom-title">Radius</h5>
                          <input
                            className="createPicture-input-range"
                            type="range"
                            min="0"
                            max="50"
                            name="borderRadius"
                            value={picturesPlaced[picturesPlaced.length - 1]?.borderRadius || "0"}
                            onChange={handleChangeOptionsPicture}
                          />
                          <input
                            className="createPicture-input-number"
                            type="number"
                            name="borderRadius"
                            min="0"
                            max="50"
                            value={picturesPlaced[picturesPlaced.length - 1]?.borderRadius || "0"}
                            onChange={handleChangeOptionsPicture}
                          />
                          <p className="createPicture-custom-text">%</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {distributionParams !== null && sizeParams !== null && (
          <BoxShowImgContainer handleFileUpload={handleFileUpload} containerImgsRef={containerImgsRef} images={images} />
        )}

        {distributionParams !== "custom" && sizeParams !== null && (
          <div className="createPicture-custom-box-container">
            <div className="createPicture-custom-box">
              <label className="createPicture-custom-title">Top</label>
              <input
                className="createPicture-input-range"
                type="range"
                min="0"
                max="50"
                name="top"
                value={images?.top}
                onChange={handleChangeDistributionSize}
              />
            </div>
            <div className="createPicture-custom-box">
              <label className="createPicture-custom-title">Height</label>
              <input
                className="createPicture-input-range"
                type="range"
                min="5"
                max="81"
                name="height"
                value={images?.height}
                onChange={handleChangeDistributionSize}
              />
            </div>
            <div className="createPicture-custom-box">
              <label className="createPicture-custom-title">Width</label>
              <input
                className="createPicture-input-range"
                type="range"
                min="5"
                max="81"
                name="width"
                value={images?.width}
                onChange={handleChangeDistributionSize}
              />
            </div>
          </div>
        )}

        {(distributionParams === "custom" || sizeParams !== null) && !adminOpen && images?.imageUploaded !== homeFrameFull && (
          <div className="w-90">
            {isAddingToCart ? (
              <button className="createPicture-btn-addToCart" disabled>
                ADDING
                <span className="createPicture-btn-loader-dots" />
              </button>
            ) : (
              <button className="createPicture-btn-addToCart" onClick={uploadThisSection}>
                Add to cart
              </button>
            )}
          </div>
        )}

        {adminOpen && (
          <button className="adminProducts-btn-addToProducts-disabled" disabled>
            | ADMIN | --- | LOAD IMAGE TO ENABLE THE BUTTON | --- | ADMIN |
          </button>
        )}

        {adminOpen && images?.imageUploaded !== homeFrameFull && (
          <button className="adminProducts-btn-addToProducts" onClick={adminUploadInProductsImages}>
            | ADMIN | --- | Add to products | --- | ADMIN |
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatePicture;
