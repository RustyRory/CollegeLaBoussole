#!/bin/bash
set -e

cd collegeLaBoussoleApp/backend
npm install
npm audit --audit-level=high
cd ../frontend
npm install
npm audit --audit-level=high
