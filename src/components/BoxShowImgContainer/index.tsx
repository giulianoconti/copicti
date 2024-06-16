import homeFrameFull from "src/assets/createPaintingBg.jpg";

type BoxShowImgContainerProps = {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerImgsRef: React.RefObject<HTMLDivElement>;
  images: {
    height: string;
    imageDistribution: string;
    imageUploaded: string;
    name?: string;
    top?: string;
    width: string;
  };
};

const BoxShowImgContainer = ({ handleFileUpload, containerImgsRef, images }: BoxShowImgContainerProps) => (
  <div className="createPicture-box-show-img">
    <div className="createPicture-btn-file-uploaded">
      <label className={images?.imageUploaded !== homeFrameFull ? "createPicture-btn-file max-w-156" : "createPicture-btn-file-center"}>
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

export default BoxShowImgContainer;
