import fs from "fs";
import path from "path";

const INFO_DIR = path.join(process.cwd(), "content/projects");

/**
 * Load project info markdown by slug.
 * Place files at: content/projects/{slug}.md
 * Returns null when no file exists.
 */
export function getProjectInfo(slug) {
  if (!slug) return null;

  const filePath = path.join(INFO_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  return fs.readFileSync(filePath, "utf8");
}

export function listProjectInfoSlugs() {
  if (!fs.existsSync(INFO_DIR)) return [];

  return fs
    .readdirSync(INFO_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}
