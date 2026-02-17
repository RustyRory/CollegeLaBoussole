#!/bin/bash
FILES=("README.md" "CONTRIBUTING.md" "INSTALL.md" "LICENSE")
DIRS=("collegeLaBoussoleApp/frontend" "collegeLaBoussoleApp/backend")

for file in "${FILES[@]}"; do
  [ ! -f "$file" ] && echo "❌ Fichier manquant: $file" && exit 1
done

for dir in "${DIRS[@]}"; do
  [ ! -d "$dir" ] && echo "❌ Dossier manquant: $dir" && exit 1
done

echo "✅ Structure valide"
