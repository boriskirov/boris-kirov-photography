import fs from "fs";
import path from "path";

const INFO_DIR = path.join(process.cwd(), "content/shop");

/**
 * Load shop info markdown by slug.
 * Place files at: content/shop/{slug}.md
 * Returns null when no file exists.
 */
export function getShopInfo(slug) {
  if (!slug) return null;

  const filePath = path.join(INFO_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  return fs.readFileSync(filePath, "utf8");
}
