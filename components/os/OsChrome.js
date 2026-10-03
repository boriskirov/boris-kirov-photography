import Link from "next/link";
import { useRouter } from "next/router";

const SECTION_LABELS = {
  stills: "Stills",
  projects: "Projects",
  shop: "Shop",
};

function getCrumbs(path, title) {
  if (!title) return [];

  const section = path.split("?")[0].split("/").filter(Boolean)[0];
  const sectionLabel = SECTION_LABELS[section];

  if (sectionLabel && sectionLabel !== title) {
    return [sectionLabel, title];
  }

  return [title];
}

export default function OsChrome({
  title,
  hasInfo = false,
  infoOpen = false,
  onToggleInfo,
  seeMoreHref = null,
  navOpen = false,
  onToggleNav,
}) {
  const router = useRouter();
  const crumbs = getCrumbs(router.asPath, title);

  if (!crumbs.length && !hasInfo && !seeMoreHref) return null;

  return (
    <header className="os-chrome">
      <div className="os-chrome-top">
        <button
          type="button"
          className="os-menu"
          aria-expanded={navOpen}
          onClick={onToggleNav}
        >
          {navOpen ? "Close" : "Menu"}
        </button>

        {crumbs.length > 0 && (
          <nav className="os-chrome-title" aria-label="Breadcrumb">
            <ol className="os-chrome-crumbs">
              {crumbs.map((crumb, index) => {
                const current = index === crumbs.length - 1;

                return (
                  <li
                    key={crumb}
                    className={`os-chrome-crumb${current ? " is-current" : ""}`}
                    {...(current ? { "aria-current": "page" } : {})}
                  >
                    {index > 0 && (
                      <span className="os-chrome-sep" aria-hidden="true">
                        /
                      </span>
                    )}
                    {crumb}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {seeMoreHref && (
          <Link href={seeMoreHref} className="os-chrome-info">
            See more
          </Link>
        )}

        {hasInfo && (
          <button
            type="button"
            className="os-chrome-info"
            aria-expanded={infoOpen}
            onClick={onToggleInfo}
          >
            {infoOpen ? "Close info" : "Open info"}
          </button>
        )}
      </div>
    </header>
  );
}
