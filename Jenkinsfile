name: Cypress E2E CI

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run Cypress tests
        run: npx cypress run

      - name: Upload Cypress screenshots (on failure)
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: cypress-screenshots
          path: cypress/screenshots

      // - name: Upload Cypress videos (on failure)
      //   if: failure()
      //   uses: actions/upload-artifact@v4
      //   with:
      //     name: cypress-videos
      //     path: cypress/videos