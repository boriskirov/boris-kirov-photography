import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GeistMono } from "geist/font/mono";
import Metadata from "../metadata";
import OsTreeNav from "./OsTreeNav";
import OsChrome from "./OsChrome";
import OsInfoDrawer from "./OsInfoDrawer";
import OsThemeSwitch from "./OsThemeSwitch";

export default function OsShell({
  title = "OS",
  description = "Boris Kirov",
  chrome = null,
  children,
}) {
  const router = useRouter();
  const [infoOpen, setInfoOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const hasInfo = Boolean(chrome?.infoMarkdown);

  useEffect(() => {
    setInfoOpen(false);
  }, [chrome?.infoMarkdown, title]);

  useEffect(() => {
    setNavOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    if (!infoOpen && !navOpen) return;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setNavOpen(false);
      setInfoOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [infoOpen, navOpen]);

  return (
    <div
      className={`os ${GeistMono.className} ${GeistMono.variable}${
        navOpen ? " os-nav-open" : ""
      }`}
    >
      <Metadata title={`${title} — Boris Kirov`} description={description} />

      <aside className="os-nav" aria-label="Explorer">
        <h4 className="os-nav-title">Boris Kirov Photography</h4>
        <OsTreeNav onNavigate={() => setNavOpen(false)} />
        <OsThemeSwitch />
      </aside>

      <button
        type="button"
        className="os-nav-backdrop"
        aria-label="Close menu"
        onClick={() => setNavOpen(false)}
      />

      <main className="os-main">
        {chrome && (
          <OsChrome
            {...chrome}
            hasInfo={hasInfo}
            infoOpen={infoOpen}
            onToggleInfo={() => setInfoOpen((open) => !open)}
            navOpen={navOpen}
            onToggleNav={() => setNavOpen((open) => !open)}
          />
        )}
        <div className="os-stage">
          <div className="os-stage-content">{children}</div>
          {hasInfo && (
            <OsInfoDrawer
              open={infoOpen}
              markdown={chrome.infoMarkdown}
            />
          )}
        </div>
      </main>
    </div>
  );
}
