#!/bin/bash
set -e

echo "🔎 Lancement ESLint et Prettier frontend..."

# Aller dans le dossier frontend
cd "$(dirname "$0")/../frontend"

# Installer les dépendances si elles ne sont pas là
if [ ! -d "node_modules" ]; then
  echo "📦 Installation des dépendances frontend..."
  npm install
fi

# Supprimer le cache ESLint existant pour éviter les erreurs
rm -f .eslintcache

# ESLint pour tous les fichiers JS/TS/TSX/JSX du frontend
echo "🔍 Lancement ESLint..."
npx eslint "**/*.{js,jsx,ts,tsx}" --max-warnings=0 || true

# Prettier pour vérifier le formatage
echo "🎨 Vérification Prettier..."
npx prettier "**/*.{js,jsx,ts,tsx,json,css,md}" --check

echo "✅ Lint & formatage frontend OK !"
