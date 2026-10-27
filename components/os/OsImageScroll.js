import Image from "next/image";
import { useEffect, useState } from "react";
import OsCliLoader from "./OsCliLoader";
import OsImageFooter from "./OsImageFooter";
import OsImageIcon from "./OsImageIcon";

function isVideo(src) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
}

export default function OsImageScroll({
  images = [],
  alt = "",
  onIndexChange,
}) {
  const [index, setIndex] = useState(0);
  const [loadedImage, setLoadedImage] = useState(null);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    if (!images.length) return;

    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => (current - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => (current + 1) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [images]);

  const current = images[index] || "";

  if (!images.length) {
    return (
      <div className="os-empty-state">
        <div className="os-empty-state-content">
          <OsCliLoader />
          <h4 className="os-empty-state-title">WIP</h4>
          <p className="os-empty-state-description">New work coming soon</p>
        </div>
      </div>
    );
  }

  const goPrev = () =>
    setIndex(
      (currentIndex) => (currentIndex - 1 + images.length) % images.length,
    );
  const goNext = () =>
    setIndex((currentIndex) => (currentIndex + 1) % images.length);

  return (
    <div className="os-viewer">
      {isVideo(current) ? (
        <video
          key={current}
          className="os-viewer-image"
          src={current}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="os-viewer-image-frame">
          {loadedImage !== current && (
            <div className="os-viewer-image-placeholder" aria-hidden="true">
              <OsImageIcon size={24} />
            </div>
          )}
          <Image
            key={current}
            src={current}
            alt={alt ? `${alt} ${index + 1}` : ""}
            className={`os-viewer-image${
              loadedImage === current ? " is-loaded" : ""
            }`}
            fill
            sizes="100vw"
            priority={index === 0}
            onLoad={() => setLoadedImage(current)}
            draggable={false}
          />
        </div>
      )}

      <OsImageFooter src={current} count={`${index + 1} / ${images.length}`} />

      <button
        type="button"
        className="os-viewer-hit os-viewer-hit-prev"
        aria-label="Previous image"
        onClick={goPrev}
      />
      <button
        type="button"
        className="os-viewer-hit os-viewer-hit-next"
        aria-label="Next image"
        onClick={goNext}
      />
    </div>
  );
}
