#!/bin/bash

# Prepare release files for GitHub Release
# This script copies and renames CDN files for distribution

set -e

RELEASE_DIR="release-dist"
LIB_DIR="lib"

echo "📦 Preparing release files..."

# Create release directory
mkdir -p "$RELEASE_DIR"
echo "✅ Created $RELEASE_DIR directory"

# Copy and rename CDN files
cp "$LIB_DIR/cdn.min.js" "$RELEASE_DIR/date-fns-jp.min.js"
echo "✅ Copied $LIB_DIR/cdn.min.js → $RELEASE_DIR/date-fns-jp.min.js"

cp "$LIB_DIR/fp/cdn.min.js" "$RELEASE_DIR/date-fns-jp_fp.min.js"
echo "✅ Copied $LIB_DIR/fp/cdn.min.js → $RELEASE_DIR/date-fns-jp_fp.min.js"

echo ""
echo "🎉 Release files ready in release-dist/"
echo "Files:"
ls -lh "$RELEASE_DIR"
