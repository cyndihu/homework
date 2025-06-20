# Homework

This project is an end-to-end (E2E) automation test suite for Kong Gateway services, built with Cypress. It covers UI workflows and API verifications.

## Project Structure

cypress/
  ├── e2e/
  │     └── test.cy.js         # Main test cases
  ├── fixtures/
  │     └── data.json          # Test data (e.g., certificates)
  └── pages/
        ├── home.js
        ├── overview.js
        ├── sidebar.js
        ├── certificates.js
        ├── gatewayServices.js
        └── routes.js
cypress.config.js               # Cypress configuration


## Getting Started

1. **Install dependencies**

   sh
   npm install

2. **Start the system under test**

   Make sure the Kong Admin API (e.g., http://localhost:8001) is running and accessible.

3. **Configure test data**

   Fill in `cypress/fixtures/data.json` with required certificate and key data, for example:

   json
   {
     "cert": "-----BEGIN CERTIFICATE----- ...",
     "key": "-----BEGIN PRIVATE KEY----- ..."
   }
   

## Running Tests

### Open Cypress UI

sh
npx cypress open


### Run all tests in headless mode

sh
npx cypress run

### generate report in mochawesome-report folder

npx mochawesome-merge cypress/reports/*.json > XXX.json
npx marge XXX.json

## Test Workflow

- The suite covers: visiting the home page, switching workspace, adding a certificate, adding a gateway service, adding a route, and verifying via API requests.
- Page Object Model is used for maintainability and reusability.
- Test data is managed centrally via fixture files.
- Results is generated in cypress/reports

## Troubleshooting

- **Port in use or service not started:** Ensure Kong Admin API is running on port 8001.
- **Data not synced:** If data is not available immediately, consider adding waits or retries.
- **Cypress version compatibility:** Cypress 10+ is recommended.