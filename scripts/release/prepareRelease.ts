/**
 * Prepare release files for GitHub Release
 * This script copies and renames CDN files for distribution
 */

import { copyFile, mkdir } from "fs/promises";
import { join } from "path";

const RELEASE_DIR = "release-dist";
const LIB_DIR = "lib";

async function prepareRelease() {
  console.log("📦 Preparing release files...");

  // Create release directory
  await mkdir(RELEASE_DIR, { recursive: true });
  console.log(`✅ Created ${RELEASE_DIR} directory`);

  // Copy and rename CDN files
  const files = [
    {
      src: join(LIB_DIR, "cdn.min.js"),
      dest: join(RELEASE_DIR, "date-fns-jp.min.js"),
    },
    {
      src: join(LIB_DIR, "fp", "cdn.min.js"),
      dest: join(RELEASE_DIR, "date-fns-jp_fp.min.js"),
    },
  ];

  for (const { src, dest } of files) {
    await copyFile(src, dest);
    console.log(`✅ Copied ${src} → ${dest}`);
  }

  console.log("\n🎉 Release files ready in release-dist/");
  console.log("Files:");
  console.log("  - date-fns-jp.min.js");
  console.log("  - date-fns-jp_fp.min.js");
}

prepareRelease().catch((error) => {
  console.error("❌ Error preparing release:", error);
  process.exit(1);
});
