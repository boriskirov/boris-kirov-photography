import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";

const OsNavStateContext = createContext(null);

export function folderShouldExpand(path, folderId) {
  if (folderId === "stills") return path.startsWith("/stills");
  if (folderId === "projects") return path.startsWith("/projects");
  if (folderId === "shop") return path.startsWith("/shop");
  return false;
}

export function OsNavStateProvider({ children }) {
  const router = useRouter();
  const path = router.asPath.split("?")[0];
  const [expanded, setExpanded] = useState(() => ({
    stills: folderShouldExpand(path, "stills"),
    projects: folderShouldExpand(path, "projects"),
    shop: folderShouldExpand(path, "shop"),
  }));

  return (
    <OsNavStateContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </OsNavStateContext.Provider>
  );
}

export function useOsNavState() {
  return useContext(OsNavStateContext);
}
