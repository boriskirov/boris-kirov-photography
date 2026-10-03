import { useEffect, useState } from "react";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export default function OsCliLoader() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((prev) => (prev + 1) % FRAMES.length);
    }, 80);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="os-cli-loader" aria-hidden="true">
      <span className="os-cli-loader-frame">{FRAMES[frame]}</span>
    </div>
  );
}
