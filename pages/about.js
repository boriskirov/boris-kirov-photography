import Image from "next/image";
import OsShell from "../components/os/OsShell";

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
        <p className="os-meta">
          <a href="mailto:info@boriskirov.photos">info@boriskirov.photos</a>
        </p>
      </div>
    </OsShell>
  );
}
