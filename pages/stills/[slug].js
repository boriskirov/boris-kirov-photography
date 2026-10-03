import OsShell from "../../components/os/OsShell";
import OsImageScroll from "../../components/os/OsImageScroll";
import { STILLS, getStill } from "../../lib/stills";

export default function StillItem({ still }) {
  if (!still) {
    return (
      <OsShell
        title="Stills"
        chrome={{
          title: "Stills",
        }}
      />
    );
  }

  return (
    <OsShell
      title={still.title}
      description={still.description}
      chrome={{
        title: still.title,
      }}
    >
      <OsImageScroll images={still.images} alt={still.title} />
    </OsShell>
  );
}

export async function getStaticPaths() {
  return {
    paths: STILLS.map((item) => ({ params: { slug: item.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const still = getStill(params.slug);

  if (!still) {
    return { notFound: true };
  }

  return {
    props: { still },
  };
}
