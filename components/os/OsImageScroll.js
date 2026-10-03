import { useEffect, useState } from "react";
import OsCliLoader from "./OsCliLoader";

function getFileName(src) {
  if (!src) return "";
  return src.split("/").pop() || src;
}

function isVideo(src) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
}

function formatSizeKb(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return null;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function OsImageScroll({ images = [], alt = "", onIndexChange }) {
  const [index, setIndex] = useState(0);
  const [sizeLabel, setSizeLabel] = useState(null);

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
  const fileName = getFileName(current);

  useEffect(() => {
    if (!current) {
      setSizeLabel(null);
      return;
    }

    let cancelled = false;
    setSizeLabel(null);

    fetch(current, { method: "HEAD" })
      .then((response) => {
        if (cancelled) return;
        const length = Number(response.headers.get("content-length"));
        setSizeLabel(formatSizeKb(length));
      })
      .catch(() => {
        if (!cancelled) setSizeLabel(null);
      });

    return () => {
      cancelled = true;
    };
  }, [current]);

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
    setIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length);
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
        <img
          key={current}
          src={current}
          alt={alt ? `${alt} ${index + 1}` : ""}
          className="os-viewer-image"
          draggable={false}
        />
      )}

      <footer className="os-viewer-footer">
        <span className="os-viewer-footer-count">
          {index + 1} / {images.length}
        </span>
        <div className="os-viewer-footer-meta">
          <span className="os-viewer-footer-name">{fileName}</span>
          {sizeLabel && (
            <span className="os-viewer-footer-size">{sizeLabel}</span>
          )}
        </div>
      </footer>

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
