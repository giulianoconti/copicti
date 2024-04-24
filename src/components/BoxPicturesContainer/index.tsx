import { useSearchParams } from "react-router-dom";
import homeFrameFull from "src/assets/createPaintingBg.jpg";
import { useNavigateParams } from "src/utils/hooks/useNavigateParams";

const BoxPicturesContainer = ({ boxes = [] }) => {
  const [searchParams] = useSearchParams();
  const distributionSelected = searchParams.get("distribution");
  const sizeSelected = searchParams.get("size");
  const navigateWithParams = useNavigateParams();

  const handleParams = (box: any) => {
    if (box.size) {
      navigateWithParams({ distribution: box.distribution, size: box.size });
    } else {
      navigateWithParams({ distribution: box.distribution });
    }
  };

  const Polyptych = ({ size = "large" }: { size: "large" | "medium" | "small" }) => {
    const fontSize = distributionSelected ? (size === "large" ? 14 : size === "medium" ? 12 : 10) : 14;
    const posibleSizes = {
      large: [
        [23, 62, 30, 60],
        [58, 52, 40, 80],
        [103, 42, 50, 100],
        [158, 52, 40, 80],
        [203, 62, 30, 60],
      ],
      medium: [
        [48, 72, 20, 40],
        [73, 62, 30, 60],
        [108, 52, 40, 80],
        [153, 62, 30, 60],
        [188, 72, 20, 40],
      ],
      small: [
        [73, 82, 10, 20],
        [88, 72, 20, 40],
        [113, 62, 30, 60],
        [148, 72, 20, 40],
        [173, 82, 10, 20],
      ],
    };

    return (
      <div className="createPicture-image-container">
        <svg width="0" height="0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <clipPath id={`clipShape${size}`}>
              <rect x={posibleSizes[size][0][0]} y={posibleSizes[size][0][1]} width={posibleSizes[size][0][2]} height={posibleSizes[size][0][3]} />
              <rect x={posibleSizes[size][1][0]} y={posibleSizes[size][1][1]} width={posibleSizes[size][1][2]} height={posibleSizes[size][1][3]} />
              <rect x={posibleSizes[size][2][0]} y={posibleSizes[size][2][1]} width={posibleSizes[size][2][2]} height={posibleSizes[size][2][3]} />
              <rect x={posibleSizes[size][3][0]} y={posibleSizes[size][3][1]} width={posibleSizes[size][3][2]} height={posibleSizes[size][3][3]} />
              <rect x={posibleSizes[size][4][0]} y={posibleSizes[size][4][1]} width={posibleSizes[size][4][2]} height={posibleSizes[size][4][3]} />
            </clipPath>
          </defs>
        </svg>

        {!distributionSelected ? (
          <div className="createPicture-image-container-texts">
            <p style={{ marginLeft: posibleSizes[size][0][0], width: posibleSizes[size][0][2] }}>1:2</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][1][2] }}>1:2</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][2][2] }}>1:2</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][3][2] }}>1:2</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][4][2] }}>1:2</p>
          </div>
        ) : (
          <div className="createPicture-image-container-texts" style={{ fontSize, top: 67 }}>
            <p style={{ marginLeft: posibleSizes[size][0][0], width: posibleSizes[size][0][2] }}>
              <span>{posibleSizes[size][0][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][0][3]}</span>
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][1][2] }}>
              <span>{posibleSizes[size][1][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][1][3]}</span>
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][2][2] }}>
              <span>{posibleSizes[size][2][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][2][3]}</span>
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][3][2] }}>
              <span>{posibleSizes[size][3][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][3][3]}</span>
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][4][2] }}>
              <span>{posibleSizes[size][4][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][4][3]}</span>
            </p>
          </div>
        )}

        <img
          src={homeFrameFull}
          alt="Ejemplo"
          style={{
            clipPath: `url(#clipShape${size})`,
            height: 184,
            width: 256,
          }}
        />
      </div>
    );
  };

  const PolyptychSH = ({ size = "large" }: { size: "large" | "medium" | "small" }) => {
    const fontSize = distributionSelected ? (size === "large" ? 14 : size === "medium" ? 12 : 10) : 14;
    const posibleSizes = {
      large: [
        [33, 42, 37.5, 100],
        [75.5, 42, 50, 100],
        [130.5, 42, 37.5, 100],
        [173, 42, 50, 100],
      ],
      medium: [
        [50.5, 52, 30, 80],
        [85.5, 52, 40, 80],
        [130.5, 52, 30, 80],
        [165.5, 52, 40, 80],
      ],
      small: [
        [68, 62, 22.5, 60],
        [95.5, 62, 30, 60],
        [130.5, 62, 22.5, 60],
        [158, 62, 30, 60],
      ],
    };

    return (
      <div className="createPicture-image-container">
        <svg width="0" height="0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <clipPath id={`clipShape-2-${size}`}>
              <rect x={posibleSizes[size][0][0]} y={posibleSizes[size][0][1]} width={posibleSizes[size][0][2]} height={posibleSizes[size][0][3]} />
              <rect x={posibleSizes[size][1][0]} y={posibleSizes[size][1][1]} width={posibleSizes[size][1][2]} height={posibleSizes[size][1][3]} />
              <rect x={posibleSizes[size][2][0]} y={posibleSizes[size][2][1]} width={posibleSizes[size][2][2]} height={posibleSizes[size][2][3]} />
              <rect x={posibleSizes[size][3][0]} y={posibleSizes[size][3][1]} width={posibleSizes[size][3][2]} height={posibleSizes[size][3][3]} />
            </clipPath>
          </defs>
        </svg>

        {!distributionSelected ? (
          <div className="createPicture-image-container-texts">
            <p style={{ marginLeft: posibleSizes[size][0][0], width: posibleSizes[size][0][2] }}>3:8</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][1][2] }}>1:2</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][2][2] }}>3:8</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][3][2] }}>1:2</p>
          </div>
        ) : (
          <div className="createPicture-image-container-texts" style={{ fontSize, top: 67 }}>
            <p style={{ marginLeft: posibleSizes[size][0][0], width: posibleSizes[size][0][2] }}>
              <span>{posibleSizes[size][0][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][0][3]}</span>
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][1][2] }}>
              <span>{posibleSizes[size][1][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][1][3]}</span>
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][2][2] }}>
              <span>{posibleSizes[size][2][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][2][3]}</span>
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][3][2] }}>
              <span>{posibleSizes[size][3][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][3][3]}</span>
            </p>
          </div>
        )}

        <img
          src={homeFrameFull}
          alt="Ejemplo"
          style={{
            clipPath: `url(#clipShape-2-${size})`,
            height: 184,
            width: 256,
          }}
        />
      </div>
    );
  };

  const Triptych = ({ size = "large" }: { size: "large" | "medium" | "small" }) => {
    const fontSize = distributionSelected ? (size === "large" ? 14 : size === "medium" ? 12 : 10) : 14;
    const posibleSizes = {
      large: [
        [48, 42, 50, 100],
        [103, 42, 50, 100],
        [158, 42, 50, 100],
      ],
      medium: [
        [63, 52, 40, 80],
        [108, 52, 40, 80],
        [153, 52, 40, 80],
      ],
      small: [
        [78, 62, 30, 60],
        [113, 62, 30, 60],
        [148, 62, 30, 60],
      ],
    };

    return (
      <div className="createPicture-image-container">
        <svg width="0" height="0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <clipPath id={`clipShape3-${size}`}>
              <rect x={posibleSizes[size][0][0]} y={posibleSizes[size][0][1]} width={posibleSizes[size][0][2]} height={posibleSizes[size][0][3]} />
              <rect x={posibleSizes[size][1][0]} y={posibleSizes[size][1][1]} width={posibleSizes[size][1][2]} height={posibleSizes[size][1][3]} />
              <rect x={posibleSizes[size][2][0]} y={posibleSizes[size][2][1]} width={posibleSizes[size][2][2]} height={posibleSizes[size][2][3]} />
            </clipPath>
          </defs>
        </svg>

        {!distributionSelected ? (
          <div className="createPicture-image-container-texts">
            <p style={{ marginLeft: posibleSizes[size][0][0], width: posibleSizes[size][0][2] }}>1:2</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][1][2] }}>1:2</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][2][2] }}>1:2</p>
          </div>
        ) : (
          <div className="createPicture-image-container-texts" style={{ fontSize, top: 67 }}>
            <p style={{ marginLeft: posibleSizes[size][0][0], width: posibleSizes[size][0][2] }}>
              <span>{posibleSizes[size][0][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][0][3]}</span>
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][1][2] }}>
              <span>{posibleSizes[size][1][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][1][3]}</span>
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][2][2] }}>
              <span>{posibleSizes[size][2][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][2][3]}</span>
            </p>
          </div>
        )}

        <img
          src={homeFrameFull}
          alt="Ejemplo"
          style={{
            clipPath: `url(#clipShape3-${size})`,
            height: 184,
            width: 256,
          }}
        />
      </div>
    );
  };

  const TriptychSquare = ({ size = "large" }: { size: "large" | "medium" | "small" }) => {
    const fontSize = distributionSelected ? (size === "large" ? 14 : size === "medium" ? 12 : 10) : 14;
    const posibleSizes = {
      large: [
        [48, 67, 50, 50],
        [103, 67, 50, 50],
        [158, 67, 50, 50],
      ],
      medium: [
        [63, 72, 40, 40],
        [108, 72, 40, 40],
        [153, 72, 40, 40],
      ],
      small: [
        [78, 78, 30, 30],
        [113, 78, 30, 30],
        [148, 78, 30, 30],
      ],
    };

    return (
      <div className="createPicture-image-container">
        <svg width="0" height="0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <clipPath id={`clipShape4-${size}`}>
              <rect x={posibleSizes[size][0][0]} y={posibleSizes[size][0][1]} width={posibleSizes[size][0][2]} height={posibleSizes[size][0][3]} />
              <rect x={posibleSizes[size][1][0]} y={posibleSizes[size][1][1]} width={posibleSizes[size][1][2]} height={posibleSizes[size][1][3]} />
              <rect x={posibleSizes[size][2][0]} y={posibleSizes[size][2][1]} width={posibleSizes[size][2][2]} height={posibleSizes[size][2][3]} />
            </clipPath>
          </defs>
        </svg>

        {!distributionSelected ? (
          <div className="createPicture-image-container-texts">
            <p style={{ marginLeft: posibleSizes[size][0][0], width: posibleSizes[size][0][2] }}>1:1</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][1][2] }}>1:1</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][2][2] }}>1:1</p>
          </div>
        ) : (
          <div className="createPicture-image-container-texts" style={{ fontSize, top: 67 }}>
            <p style={{ marginLeft: posibleSizes[size][0][0], width: posibleSizes[size][0][2] }}>
              <span>{posibleSizes[size][0][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][0][3]}</span>
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][1][2] }}>
              <span>{posibleSizes[size][1][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][1][3]}</span>
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][2][2] }}>
              <span>{posibleSizes[size][2][2]}</span>
              <span>x</span>
              <span>{posibleSizes[size][2][3]}</span>
            </p>
          </div>
        )}

        <img
          src={homeFrameFull}
          alt="Ejemplo"
          style={{
            clipPath: `url(#clipShape4-${size})`,
            height: 184,
            width: 256,
          }}
        />
      </div>
    );
  };

  const TriptychCircle = ({ size = "large" }: { size: "large" | "medium" | "small" }) => {
    const fontSize = distributionSelected ? (size === "large" ? 14 : size === "medium" ? 12 : 10) : 14;
    const posibleSizes = {
      large: [
        [73, 92, 25],
        [128, 92, 25],
        [183, 92, 25],
      ],
      medium: [
        [83, 92, 20],
        [128, 92, 20],
        [173, 92, 20],
      ],
      small: [
        [93, 92, 15],
        [128, 92, 15],
        [163, 92, 15],
      ],
    };

    return (
      <div className="createPicture-image-container">
        <svg width="0" height="0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <clipPath id={`clipShape5-${size}`}>
              <circle cx={posibleSizes[size][0][0]} cy={posibleSizes[size][0][1]} r={posibleSizes[size][0][2]} />
              <circle cx={posibleSizes[size][1][0]} cy={posibleSizes[size][1][1]} r={posibleSizes[size][1][2]} />
              <circle cx={posibleSizes[size][2][0]} cy={posibleSizes[size][2][1]} r={posibleSizes[size][2][2]} />
            </clipPath>
          </defs>
        </svg>

        {!distributionSelected ? (
          <div className="createPicture-image-container-texts">
            <p style={{ marginLeft: posibleSizes[size][0][0] - posibleSizes[size][0][2], width: posibleSizes[size][0][2] * 2 }}>1:1</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][1][2] * 2 }}>1:1</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][2][2] * 2 }}>1:1</p>
          </div>
        ) : (
          <div className="createPicture-image-container-texts" style={{ fontSize }}>
            <p style={{ marginLeft: posibleSizes[size][0][0] - posibleSizes[size][0][2], width: posibleSizes[size][0][2] * 2 }}>
              {posibleSizes[size][0][2] * 2}Ø
            </p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][1][2] * 2 }}>{posibleSizes[size][0][2] * 2}Ø</p>
            <p style={{ marginLeft: 5, width: posibleSizes[size][2][2] * 2 }}>{posibleSizes[size][0][2] * 2}Ø</p>
          </div>
        )}

        <img
          src={homeFrameFull}
          alt="Ejemplo"
          style={{
            clipPath: `url(#clipShape5-${size})`,
            height: 184,
            width: 256,
          }}
        />
      </div>
    );
  };

  const Custom = () => (
    <div className="createPicture-image-container">
      <svg width="0" height="0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <clipPath id="clipShape6">
            <rect x="26.75" y="42" width="50" height="100" />
            <circle cx="106.75" cy="92" r="25" />
            <rect x="136.75" y="67" width="50" height="50" />
            <rect x="191.75" y="42" width="37.5" height="100" />
          </clipPath>
        </defs>
      </svg>

      <div className="createPicture-image-container-texts">
        <p style={{ marginLeft: 26.75, width: 50 }}>1:2</p>
        <p style={{ marginLeft: 5, width: 50 }}>1:1</p>
        <p style={{ marginLeft: 5, width: 50 }}>1:1</p>
        <p style={{ marginLeft: 5, width: 37.5 }}>3:8</p>
      </div>

      <img
        src={homeFrameFull}
        alt="Ejemplo"
        style={{
          clipPath: "url(#clipShape6)",
          height: 184,
          width: 256,
        }}
      />
    </div>
  );

  return (
    <>
      {boxes.map((box) => (
        <button className="createPicture-box" onClick={() => handleParams(box)} key={box.title}>
          <div className="createPicture-image">
            {box.distribution === "polyptych" ? (
              <Polyptych size={box.size} />
            ) : box.distribution === "polyptychSameHeight" ? (
              <PolyptychSH size={box.size} />
            ) : box.distribution === "triptych" ? (
              <Triptych size={box.size} />
            ) : box.distribution === "triptychSquare" ? (
              <TriptychSquare size={box.size} />
            ) : box.distribution === "triptychCircular" ? (
              <TriptychCircle size={box.size} />
            ) : box.distribution === "custom" ? (
              <Custom />
            ) : null}
          </div>

          <h3 className="createPicture-pic-title">{box.title}</h3>
        </button>
      ))}
    </>
  );
};

export default BoxPicturesContainer;
