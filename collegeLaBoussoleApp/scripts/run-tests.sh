#!/bin/bash
set -e

cd collegeLaBoussoleApp/backend
npm install
npm test
cd ../frontend
npm install
npm test

echo "✅ Tous les tests réussissent"
