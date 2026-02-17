#!/bin/bash
cd collegeLaBoussoleApp/frontend
npm install
npx eslint . --ext .js,.jsx,.ts,.tsx
npx prettier --check .
