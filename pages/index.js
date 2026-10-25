import OsImageCollection from "../components/os/OsImageCollection";
import OsShell from "../components/os/OsShell";
import { PROJECTS } from "../lib/projects";
import { STILLS } from "../lib/stills";

const INDEX_IMAGES = [...STILLS.images, ...PROJECTS.flatMap((item) => item.images)];

export default function Home() {
  return (
    <OsShell
      title="Index"
      description="Photography & videography"
      initialViewMode="grid"
      chrome={{
        title: "Index",
        showViewToggle: true,
      }}
    >
      <OsImageCollection images={INDEX_IMAGES} mode="random" />
    </OsShell>
  );
}
