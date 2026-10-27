import Link from "next/link";
import { useRouter } from "next/router";
import OsImageIcon from "./OsImageIcon";

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
  viewMode,
  onChangeView,
  showViewToggle = false,
}) {
  const router = useRouter();
  const crumbs = getCrumbs(router.asPath, title);

  if (!crumbs.length && !hasInfo && !seeMoreHref && !showViewToggle) return null;

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

        {showViewToggle && (
          <fieldset className="os-theme os-view-switch">
            <legend className="os-sr">Select a view:</legend>
            <span className="os-theme-option">
              <input
                type="radio"
                name="os-view"
                value="image"
                aria-label="Image view"
                title="Image view"
                checked={viewMode === "image"}
                onChange={() => onChangeView("image")}
              />
              <label title="Image view">
                <span className="os-sr">Image view</span>
                <OsImageIcon />
              </label>
            </span>
            <span className="os-theme-option">
              <input
                type="radio"
                name="os-view"
                value="grid"
                aria-label="Grid view"
                title="Grid view"
                checked={viewMode === "grid"}
                onChange={() => onChangeView("grid")}
              />
              <label title="Grid view">
                <span className="os-sr">Grid view</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M208,32H80A16,16,0,0,0,64,48V64H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V192h16a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,48H208v69.38l-16.7-16.7a16,16,0,0,0-22.62,0L93.37,176H80Zm96,160H48V80H64v96a16,16,0,0,0,16,16h96Zm32-32H116l64-64,28,28v36Zm-88-64A24,24,0,1,0,96,88,24,24,0,0,0,120,112Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,120,80Z"
                  />
                </svg>
              </label>
            </span>
          </fieldset>
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
