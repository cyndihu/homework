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

      - name: Start Kong (example, adjust as needed)
        run: |
          docker run -d --name kong \
            -e "KONG_DATABASE=off" \
            -e "KONG_DECLARATIVE_CONFIG=/usr/local/kong/declarative/kong.yml" \
            -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
            -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
            -e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
            -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
            -e "KONG_ADMIN_LISTEN=0.0.0.0:8001" \
            -p 8000:8000 -p 8001:8001 \
            kong:latest
        # You may need to adjust this step to fit your Kong setup

      - name: Wait for Kong to be ready
        run: |
          for i in {1..30}; do
            if curl -s http://localhost:8001/status; then
              echo "Kong is up!"
              break
            fi
            echo "Waiting for Kong..."
            sleep 2
          done

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