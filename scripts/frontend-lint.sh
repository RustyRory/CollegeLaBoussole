#!/bin/bash
# -------------------------------
# Lint & Prettier check pour le frontend
# -------------------------------

cd collegeLaBoussoleApp/frontend || { echo "❌ Dossier frontend introuvable"; exit 1; }

npm install

# Lancer ESLint
echo "🔎 Lancement ESLint..."
npx eslint . --ext .js,.jsx,.ts,.tsx
ESLINT_EXIT_CODE=$?

# Vérifier si des fichiers existent avant Prettier
FILES=$(find . -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.md" \))
if [ -n "$FILES" ]; then
    echo "🔎 Vérification Prettier pour les fichiers front..."
    npx prettier --check .
    PRETTIER_EXIT_CODE=$?
else
    echo "ℹ️ Aucun fichier à vérifier avec Prettier"
    PRETTIER_EXIT_CODE=0
fi

# Sortie globale
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $PRETTIER_EXIT_CODE -ne 0 ]; then
    echo "❌ Lint ou formatage échoué"
    exit 1
fi

echo "✅ Frontend lint & Prettier ok"
exit 0
