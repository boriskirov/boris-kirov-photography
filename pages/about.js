import Image from "next/image";
import { useState } from "react";
import OsShell from "../components/os/OsShell";

const collaborators = [
  { name: "Fjällräven", image: "/fjallraven/fjall-e4-0.jpeg" },
  { name: "Next Street Gallery Paris" },
  { name: "Shlag Lab", image: "/garments/garments-61.jpg" },
  { name: "AT5" },
  { name: "Rapha", image: "/outdoors/outdoors-18.png" },
  { name: "MAAP", image: "/outdoors/outdoors-19.png" },
  { name: "outside.details", image: "/garments/garments-50.jpg" },
  { name: "analogue.amsterdam" },
  { name: "advanced.research", image: "/garments/garments-51.jpg" },
  { name: "Wesley Verhoeve" },
  { name: "Camera Japan" },
  { name: "That Divine" },
  { name: "raredub", image: "/life/life-70.jpg" },
  { name: "The Alchemist & Boldy James", image: "/life/life-30.png" },
  { name: "Negative Feed", image: "/garments/garments-48.jpg" },
  { name: "Art Cage Budapest" },
  {
    name: "EyeShot Magazine",
    image: "/about/eyeshot-magazine.jpg",
    width: 900,
    height: 596,
  },
  { name: "mnfst", image: "/life/life-75.jpg" },
  { name: "Cheetah bikes", image: "/garments/garments-46.jpg" },
  { name: "The Maker Market" },
  { name: "Haarlem City Blog" },
  { name: "Atlas Obscura" },
  { name: "Upphotographers" },
  { name: "FramePress Magazine" },
  { name: "Dutch Analog" },
  { name: "Shoot It With Film" },
  { name: "36h studio" },
  { name: "Vice" },
  { name: "Bored Panda" },
];

const bookshops = [
  { name: "Classic Paris", href: "https://www.classic-paris.com/" },
  { name: "Terry Bleu", href: "https://www.terrybleu.com/" },
  {
    name: "Athenaeum Boekhandel & Nieuwscentrum Spui",
    href: "https://athenaeumscheltema.nl/",
  },
  { name: "Ruparo Amsterdam", href: "https://www.ruparo.nl/" },
];

function BookshopLinks({ items = bookshops }) {
  return (
    <ul className="os-bookshops">
      {items.map((shop) => (
        <li key={shop.href}>
          <a
            href={shop.href}
            className="os-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {shop.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ClientMentions({ items = collaborators }) {
  const [active, setActive] = useState(null);

  return (
    <ul className="os-client-mentions">
      {items.map((client) => {
        const hasPreview = Boolean(client.image);
        const isActive = active === client.name;

        return (
          <li
            key={client.name}
            className={
              hasPreview ? "os-client-mention has-preview" : "os-client-mention"
            }
            onMouseEnter={() => hasPreview && setActive(client.name)}
            onMouseLeave={() => setActive(null)}
          >
            <span className="os-client-name">{client.name}</span>
            {isActive && client.image && (
              <Image
                src={client.image}
                alt=""
                width={client.width || 280}
                height={client.height || 356}
                className="os-client-preview-image"
              />
            )}
          </li>
        );
      })}
    </ul>
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
        <div className="os-about-accordion" aria-label="About details">
          <details open>
            <summary>Contact</summary>
            <p>
              Mail:{" "}
              <a href="mailto:info@boriskirov.photos" className="os-link">
                info@boriskirov.photos
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a
                href="https://www.instagram.com/boriskirovv/"
                className="os-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                @boriskirovv
              </a>
            </p>
          </details>
          <details>
            <summary>Clients, features and mentions</summary>
            <ClientMentions />
          </details>
          <details>
            <summary>Bookshops and publishing houses</summary>
            <BookshopLinks />
          </details>
        </div>
      </div>
    </OsShell>
  );
}
