import Image from "next/image";
import { useEffect, useState } from "react";
import OsImageFooter from "../components/os/OsImageFooter";
import OsShell from "../components/os/OsShell";
import { PROJECTS } from "../lib/projects";
import { STILLS } from "../lib/stills";

const INDEX_IMAGES = [...STILLS, ...PROJECTS].flatMap((item) => item.images);

function pickRandomImage() {
  if (!INDEX_IMAGES.length) return null;
  return INDEX_IMAGES[Math.floor(Math.random() * INDEX_IMAGES.length)];
}

export default function Home() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(pickRandomImage());
  }, []);

  return (
    <OsShell
      title="Index"
      description="Photography & videography"
      chrome={{
        title: "Index",
      }}
    >
      <div className="os-index">
        <div className="os-index-image">
          {image && <Image src={image} alt="" fill sizes="100vw" />}
        </div>
        <OsImageFooter src={image} />
      </div>
    </OsShell>
  );
}
