import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import OsImageFooter from "./OsImageFooter";
import OsImageScroll from "./OsImageScroll";
import { OsViewContext } from "./OsViewContext";

function isVideo(src) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
}

function pickRandomImage(images) {
  if (!images.length) return null;
  return images[Math.floor(Math.random() * images.length)];
}

export default function OsImageCollection({
  images = [],
  alt = "",
  mode = "carousel",
}) {
  const viewMode = useContext(OsViewContext);
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    if (mode === "random") {
      setRandomImage(pickRandomImage(images));
    }
  }, [images, mode]);

  if (viewMode === "grid") {
    return (
      <div className="os-image-collection-grid-view">
        <div className="os-image-grid">
          {images.map((src) => (
            <div className="os-image-grid-item" key={src}>
              {isVideo(src) ? (
                <video src={src} autoPlay muted loop playsInline />
              ) : (
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 800px) 33vw, 16vw"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "random") {
    return (
      <div className="os-index">
        <div className="os-index-image">
          {randomImage && (
            <Image src={randomImage} alt={alt} fill sizes="100vw" />
          )}
        </div>
        <OsImageFooter src={randomImage} />
      </div>
    );
  }

  return <OsImageScroll images={images} alt={alt} />;
}
