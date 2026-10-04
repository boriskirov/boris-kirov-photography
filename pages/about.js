import Image from "next/image";
import { useState } from "react";
import OsShell from "../components/os/OsShell";

const PREVIEW_WIDTH = 220;
const PREVIEW_OFFSET = 18;

const collaborators = [
  { name: "Fjällräven" },
  { name: "Shlag Lab", image: "/garments/garments-61.jpg" },
  { name: "Rapha", image: "/outdoors/outdoors-18.png" },
  { name: "MAAP", image: "/outdoors/outdoors-19.png" },
  { name: "outside.details", image: "/garments/garments-50.jpg" },
  { name: "analogue.amsterdam" },
  { name: "advanced.research", image: "/garments/garments-51.jpg" },
  { name: "Dolomite", image: "/outdoors/outdoors-24.png" },
  { name: "Ferrino Italy", image: "/garments/garments-39.png" },
  { name: "North Face", image: "/garments/garments-45.png" },
  { name: "raredub", image: "/life/life-70.jpg" },
  { name: "Boldy James", image: "/life/life-30.png" },
  { name: "Negative Feed", image: "/garments/garments-48.jpg" },
  { name: "Cheetah bikes", image: "/garments/garments-46.jpg" },
  { name: "AT5" },
  { name: "The Maker Market" },
  { name: "Upphotographers" },
  { name: "Vice" },
];

function ClientMentions({ items = collaborators }) {
  const [active, setActive] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(event) {
    const nextX =
      event.clientX + PREVIEW_OFFSET + PREVIEW_WIDTH > window.innerWidth
        ? event.clientX - PREVIEW_WIDTH - PREVIEW_OFFSET
        : event.clientX + PREVIEW_OFFSET;

    setPos({ x: nextX, y: event.clientY + PREVIEW_OFFSET });
  }

  return (
    <small className="os-client-mentions">
      {items.map((client, index) => {
        const hasPreview = Boolean(client.image);

        return (
          <span key={client.name}>
            {index > 0 && <span aria-hidden="true"> • </span>}
            <span
              className={
                hasPreview
                  ? "os-client-mention has-preview"
                  : "os-client-mention"
              }
              onMouseEnter={() => hasPreview && setActive(client)}
              onMouseLeave={() => setActive(null)}
              onMouseMove={hasPreview ? handleMove : undefined}
            >
              {client.name}
            </span>
          </span>
        );
      })}

      {active?.image && (
        <div className="os-client-preview" style={{ left: pos.x, top: pos.y }}>
          <Image
            src={active.image}
            alt={active.name}
            width={PREVIEW_WIDTH}
            height={280}
            className="os-client-preview-image"
          />
        </div>
      )}
    </small>
  );
}

export default function About() {
  return (
    <OsShell
      title="About"
      description="About Boris Kirov"
      chrome={{
        title: "About",
      }}
    >
      <div className="os-panel-body">
        <div className="os-about-image">
          <Image
            src="/avatar-3.png"
            alt="Boris Kirov"
            width={640}
            height={640}
            priority
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <p>
          Hey, I&apos;m Boris (b. 1991) a designer, photographer, creative
          storyteller and speaker. Raised in Sofia, Bulgaria and now based in
          Amsterdam, The Netherlands. I care for details, colours and emotions
          by creating imagery, storytelling &amp; concepts across movement,
          photography and other brain stuff.
        </p>
        <p>
          Not always but I mainly shoot people, outdoors, garments, and always
          and forever the everyday life.
        </p>
        <h4 className="os-panel-title">Contact</h4>
        <p className="os-meta">
          Mail:{" "}
          <a href="mailto:info@boriskirov.photos" className="os-link">
            info@boriskirov.photos
          </a>
        </p>

        <div className="os-about-accordion" aria-label="About details">
          <details open>
            <summary>Selected collaborators</summary>
            <ClientMentions />
          </details>
        </div>
      </div>
    </OsShell>
  );
}
