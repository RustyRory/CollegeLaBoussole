#!/bin/bash
cd collegeLaBoussoleApp/backend
npm install
npx eslint . --ext .js,.ts
npx prettier --check ../*.md
