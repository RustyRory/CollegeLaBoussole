#!/bin/bash

# Regex pour les messages de commit (Conventional Commit + Fixes #numéro)
REGEX="^(feat|feature|fix|docs|chore|refactor|test|hotfix)\([a-z0-9-]+\): Fixes #[0-9]+ - .+"

INVALID=0

# On récupère les 20 derniers commits
COMMITS=$(git log -n 20 --format=%s)

for commit in "$COMMITS"; do
  echo "➡️ Analyse du commit: \"$commit\""

  if ! [[ "$commit" =~ $REGEX ]]; then
    echo ""
    echo "❌ Commit invalide:"
    echo "   \"$commit\""
    echo ""
    echo "📘 Format attendu : type(scope): Fixes #<issue> - message"
    echo "📌 Types autorisés : feat | feature | fix | docs | chore | refactor | test | hotfix"
    echo "✅ Exemple valide : feat(login): Fixes #12 - Ajout page login"
    echo "💡 Exemple corrigé possible : feat(module): Fixes #1 - Description claire du changement"
    echo ""
    INVALID=1
  else
    echo "   ✅ Commit valide"
    echo ""
  fi
done

if [ $INVALID -eq 1 ]; then
  echo "🚫 Certains commits ne respectent pas la convention."
  exit 1
fi

echo "🎉 Tous les commits respectent la convention."
exit 0
