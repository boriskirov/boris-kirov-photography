import { useEffect, useState } from "react";

function getFileName(src) {
  if (!src) return "";
  return src.split("/").pop() || src;
}

function formatSizeKb(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return null;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function OsImageFooter({ src, count }) {
  const [sizeLabel, setSizeLabel] = useState(null);

  useEffect(() => {
    if (!src) {
      setSizeLabel(null);
      return;
    }

    let cancelled = false;
    setSizeLabel(null);

    fetch(src, { method: "HEAD" })
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
  }, [src]);

  return (
    <footer className="os-viewer-footer">
      {count ? <span className="os-viewer-footer-count">{count}</span> : null}
      <div className="os-viewer-footer-meta">
        <span className="os-viewer-footer-name">{getFileName(src)}</span>
        {sizeLabel && (
          <span className="os-viewer-footer-size">{sizeLabel}</span>
        )}
      </div>
    </footer>
  );
}
