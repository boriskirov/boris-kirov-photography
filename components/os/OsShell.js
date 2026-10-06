import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GeistSans } from "geist/font/sans";
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
  const [isMobile, setIsMobile] = useState(false);
  const hasInfo = Boolean(chrome?.infoMarkdown);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 800px)");
    const syncMobileState = () => setIsMobile(mediaQuery.matches);

    syncMobileState();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncMobileState);
      return () => mediaQuery.removeEventListener("change", syncMobileState);
    }

    mediaQuery.addListener(syncMobileState);
    return () => mediaQuery.removeListener(syncMobileState);
  }, []);

  useEffect(() => {
    setInfoOpen(!isMobile);
  }, [chrome?.infoMarkdown, title, isMobile]);

  useEffect(() => {
    setNavOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    if (!infoOpen && !navOpen) return;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setNavOpen(false);
      setInfoOpen(isMobile ? false : true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [infoOpen, navOpen, isMobile]);

  const handleToggleInfo = () => {
    if (isMobile) {
      setInfoOpen((open) => !open);
      return;
    }

    setInfoOpen(true);
  };

  return (
    <div
      className={`os ${GeistSans.className} ${GeistSans.variable}${
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
            onToggleInfo={handleToggleInfo}
            navOpen={navOpen}
            onToggleNav={() => setNavOpen((open) => !open)}
          />
        )}
        <div className="os-stage">
          <div className="os-stage-content">{children}</div>
          {hasInfo && (
            <OsInfoDrawer open={infoOpen} markdown={chrome.infoMarkdown} />
          )}
        </div>
      </main>
    </div>
  );
}
