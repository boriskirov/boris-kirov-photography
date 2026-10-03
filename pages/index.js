import { useState } from "react";
import OsShell from "../components/os/OsShell";
import OsImageScroll from "../components/os/OsImageScroll";
import { STILLS } from "../lib/stills";

const INDEX_GROUPS = ["people", "outdoors", "garments", "urban"];

const INDEX_SLIDES = INDEX_GROUPS.map((slug) => {
  const still = STILLS.find((item) => item.slug === slug);
  if (!still?.images?.length) return null;

  return {
    slug: still.slug,
    title: still.title,
    src: still.images[0],
    href: `/stills/${still.slug}`,
  };
}).filter(Boolean);

const INDEX_IMAGES = INDEX_SLIDES.map((slide) => slide.src);

export default function Home() {
  const [index, setIndex] = useState(0);
  const current = INDEX_SLIDES[index] || INDEX_SLIDES[0];

  return (
    <OsShell
      title="Index"
      description="Photography & videography"
      chrome={{
        title: "Index",
        seeMoreHref: current?.href || null,
      }}
    >
      <OsImageScroll
        images={INDEX_IMAGES}
        alt="Index"
        onIndexChange={setIndex}
      />
    </OsShell>
  );
}
