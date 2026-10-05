import Image from "next/image";
import Link from "next/link";
import OsShell from "../components/os/OsShell";
import { PROJECTS } from "../lib/projects";
import { STILLS } from "../lib/stills";

const INDEX_CARDS = [
  ...STILLS.map((item) => ({
    id: `stills-${item.slug}`,
    title: item.title,
    href: `/stills/${item.slug}`,
    image: item.images[0] || null,
  })),
  ...PROJECTS.map((item) => ({
    id: `projects-${item.slug}`,
    title: item.title,
    href: `/projects/${item.slug}`,
    image: item.images[0] || null,
  })),
];

export default function Home() {
  return (
    <OsShell
      title="Index"
      description="Photography & videography"
      chrome={{
        title: "Index",
      }}
    >
      <div className="os-index">
        {INDEX_CARDS.map((card) => (
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
