import * as React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const ImageLoader = ({ src, alt, className = "image-loader" }) => {
  const loadedImages = {};
  const [loaded, setLoaded] = React.useState(loadedImages[src]);

  const onLoad = () => {
    loadedImages[src] = true;
    setLoaded(true);
  };

  return (
    <>
      {!loaded && (
        <LoadingOutlined
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            margin: "auto",
          }}
        />
      )}
      <img
        alt={alt || ""}
        className={`${className || ""} ${
          loaded ? "is-img-loaded" : "is-img-loading"
        }`}
        onLoad={onLoad}
        src={src}
      />
    </>
  );
};

export default ImageLoader;
