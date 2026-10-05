import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { STILLS } from "../../lib/stills";
import { PROJECTS } from "../../lib/projects";
import { SHOP } from "../../lib/shop";
import { folderShouldExpand, useOsNavState } from "./OsNavState";

const TREE = [
  { id: "index", label: "Index", href: "/" },
  {
    id: "stills",
    label: "Stills",
    children: STILLS.map((item) => ({
      id: `stills-${item.slug}`,
      label: item.title,
      count: item.images.length,
      href: `/stills/${item.slug}`,
    })),
  },
  {
    id: "projects",
    label: "Projects",
    children: PROJECTS.map((item) => ({
      id: `projects-${item.slug}`,
      label: item.title,
      count: item.images.length,
      href: `/projects/${item.slug}`,
    })),
  },
  {
    id: "shop",
    label: "Shop",
    children: SHOP.map((item) => ({
      id: `shop-${item.slug}`,
      label: item.title,
      count: item.images.length,
      href: `/shop/${item.slug}`,
    })),
  },
  { id: "about", label: "About", href: "/about" },
];

function isActivePath(path, href) {
  if (!href) return false;
  if (href === "/") return path === "/" || path === "";
  return path === href;
}

export default function OsTreeNav({ onNavigate }) {
  const router = useRouter();
  const path = router.asPath.split("?")[0];
  const { expanded, setExpanded } = useOsNavState();

  useEffect(() => {
    setExpanded((prev) => ({
      stills: prev.stills || folderShouldExpand(path, "stills"),
      projects: prev.projects || folderShouldExpand(path, "projects"),
      shop: prev.shop || folderShouldExpand(path, "shop"),
    }));
  }, [path]);

  const toggleFolder = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <nav className="os-tree" aria-label="Explorer">
      {TREE.map((node) => {
        if (node.children) {
          const open = Boolean(expanded[node.id]);

          return (
            <div key={node.id} className="os-tree-branch">
              <button
                type="button"
                className={`os-tree-row os-tree-folder${
                  folderShouldExpand(path, node.id) ? " is-section" : ""
                }`}
                aria-expanded={open}
                onClick={() => toggleFolder(node.id)}
              >
                <span className={`os-tree-chevron${open ? " is-open" : ""}`} />
                <span className="os-tree-label">{node.label}</span>
              </button>

              {open && (
                <div className="os-tree-children">
                  {node.children.map((child) => {
                    const active = isActivePath(path, child.href);

                    return (
                      <Link
                        key={child.id}
                        href={child.href}
                        className={`os-tree-row os-tree-leaf${
                          active ? " is-active" : ""
                        }`}
                        onClick={onNavigate}
                      >
                        <span className="os-tree-guide" aria-hidden="true" />
                        <span className="os-tree-label">{child.label}</span>
                        <span className="os-tree-count">
                          {child.count === 0 ? "•" : child.count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        const active = isActivePath(path, node.href);

        return (
          <Link
            key={node.id}
            href={node.href}
            className={`os-tree-row os-tree-leaf os-tree-root${
              active ? " is-active" : ""
            }`}
            onClick={onNavigate}
          >
            <span className="os-tree-spacer" aria-hidden="true" />
            <span className="os-tree-label">{node.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
