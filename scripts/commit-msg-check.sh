#!/bin/bash
REGEX="^(feat|feature|fix|docs|chore|refactor|test|hotfix)\([a-z0-9-]+\): Fixes #[0-9]+ - .+"
INVALID=0

for commit in $(git log -n 20 --format=%s); do
  if ! [[ "$commit" =~ $REGEX ]]; then
    echo "❌ Commit invalide: $commit"
    INVALID=1
  fi
done

if [ $INVALID -eq 1 ]; then
  exit 1
fi
