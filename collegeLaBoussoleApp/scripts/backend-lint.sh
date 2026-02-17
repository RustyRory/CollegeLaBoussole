#!/bin/bash
# -------------------------------
# Lint & Prettier check pour le backend
# -------------------------------

cd "$(dirname "$0")/../backend" || { echo "❌ Dossier backend introuvable"; exit 1; }

npm install

# Lancer ESLint
echo "🔎 Lancement ESLint..."
npx eslint . --ext .js,.ts
ESLINT_EXIT_CODE=$?

# Vérifier si des fichiers markdown existent avant Prettier
MD_FILES=$(ls ../*.md 2>/dev/null)
if [ -n "$MD_FILES" ]; then
    echo "🔎 Vérification Prettier pour les fichiers .md..."
    npx prettier --check ../*.md
    PRETTIER_EXIT_CODE=$?
else
    echo "ℹ️ Aucun fichier .md à vérifier avec Prettier"
    PRETTIER_EXIT_CODE=0
fi

# Sortie globale
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $PRETTIER_EXIT_CODE -ne 0 ]; then
    echo "❌ Lint ou formatage échoué"
    exit 1
fi

echo "✅ Backend lint & Prettier ok"
exit 0
