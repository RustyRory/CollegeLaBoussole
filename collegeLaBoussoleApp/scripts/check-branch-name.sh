#!/bin/bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ ! "$BRANCH" =~ ^(feature|feat|fix|hotfix)/[0-9]+-[a-z0-9-]+$ ]] && [[ ! "$BRANCH" =~ ^release/[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "❌ Nom de branche invalide: $BRANCH"
  echo "Exemple valide: feature/123-login, hotfix/456-bug, release/1.2.0"
  exit 1
fi

echo "✅ Nom de branche valide: $BRANCH"
