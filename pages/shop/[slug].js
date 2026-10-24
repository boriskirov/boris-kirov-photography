import OsShell from "../../components/os/OsShell";
import OsImageCollection from "../../components/os/OsImageCollection";
import { SHOP, getShopItem } from "../../lib/shop";
import { getShopInfo } from "../../lib/shop-info";

export default function ShopItem({ item, infoMarkdown }) {
  if (!item) {
    return (
      <OsShell
        title="Shop"
        chrome={{
          title: "Shop",
        }}
      />
    );
  }

  return (
    <OsShell
      title={item.title}
      description={item.description}
      chrome={{
        title: item.title,
        infoMarkdown: infoMarkdown || null,
        showViewToggle: true,
        infoHeaderAction: item.website ? (
          <a
            href={item.website}
            className="os-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to website
          </a>
        ) : null,
      }}
    >
      <OsImageCollection images={item.images} alt={item.title} />
    </OsShell>
  );
}

export async function getStaticPaths() {
  return {
    paths: SHOP.map((item) => ({ params: { slug: item.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const item = getShopItem(params.slug);

  if (!item) {
    return { notFound: true };
  }

  return {
    props: {
      item,
      infoMarkdown: getShopInfo(item.slug),
    },
  };
}
