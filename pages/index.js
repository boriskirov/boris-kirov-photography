import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import OsShell from "../components/os/OsShell";
import { PROJECTS } from "../lib/projects";
import { STILLS } from "../lib/stills";

function pickRandomImage(images = []) {
  if (!images.length) return null;
  return images[Math.floor(Math.random() * images.length)];
}

const INDEX_CARDS = [
  ...STILLS.map((item) => ({
    id: `stills-${item.slug}`,
    title: item.title,
    href: `/stills/${item.slug}`,
    images: item.images,
    image: pickRandomImage(item.images),
  })),
  ...PROJECTS.map((item) => ({
    id: `projects-${item.slug}`,
    title: item.title,
    href: `/projects/${item.slug}`,
    images: item.images,
    image: pickRandomImage(item.images),
  })),
];

export default function Home() {
  const [cards, setCards] = useState(INDEX_CARDS);

  useEffect(() => {
    setCards(
      INDEX_CARDS.map((card) => ({
        ...card,
        image: pickRandomImage(card.images),
      }))
    );
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
        {cards.map((card) => (
          <Link key={card.id} href={card.href} className="os-index-card">
            <span className="os-index-thumb">
              {card.image && (
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 800px) 50vw, 280px"
                />
              )}
            </span>
            <span className="os-index-card-title">{card.title}</span>
          </Link>
        ))}
      </div>
    </OsShell>
  );
}
