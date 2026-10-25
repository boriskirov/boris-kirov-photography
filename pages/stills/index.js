import OsImageCollection from "../../components/os/OsImageCollection";
import OsShell from "../../components/os/OsShell";
import { STILLS } from "../../lib/stills";

export default function StillsPage() {
  return (
    <OsShell
      title={STILLS.title}
      description={STILLS.description}
      chrome={{
        title: STILLS.title,
        showViewToggle: true,
      }}
    >
      <OsImageCollection images={STILLS.images} alt={STILLS.title} />
    </OsShell>
  );
}
