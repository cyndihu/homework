import HomePage from "../pages/home"
import OverviewPage from "../pages/overview"
import Sidebar from "../pages/sidebar"
import CertificatesPage from "../pages/certificates"
import GatewayServicesPage from "../pages/gatewayServices"
import RoutesPage from "../pages/routes"

describe.only('Create New Service', () => {
  const homePage = new HomePage();
  const overviewPage = new OverviewPage();
  const sidebar = new Sidebar();
  const certificatesPage = new CertificatesPage();
  const gatewayServicesPage = new GatewayServicesPage();
  const routesPage = new RoutesPage();
  let certId;
  let serviceId;

  before(() => {
    cy.exec('docker-compose up -d'); // Start the Kong Gateway server
    cy.wait(60000); // Wait for the server to start
  });

  after(() => {
    cy.exec('docker-compose down'); // Stop the Kong Gateway server 
  });

  it('Visit Home Page', () => {
    homePage.visit();
  });

  it('Filter Workspace', () => {
    homePage.filterWorkspace('default');
  });

    it('Add a Certificate', () => {
      cy.fixture('data').then((data) => {
          sidebar.navigateToSection('Certificates');
          certificatesPage.addCertificate(data.cert, data.key);
          certificatesPage.saveCertificate().then((id) => {
            cy.log(`Certificate ID: ${id}`);
            certId = id;
        });
      });
    });

    it('Add a Gateway Service with Full details', () => {
      sidebar.navigateToSection('Overview');
      overviewPage.addGatewayService('Test_Service', 'testTag', 'https://api.kong-air.com/flights');
      overviewPage.addGatewayServiceWithFullDetails('3', '60000', '60000', '60000', certId, certId, 'true');
      overviewPage.saveGatewayService('Test_Service');
      gatewayServicesPage.getServiceId().then((id) => {
        serviceId= id;
        cy.log(`Service ID: ${id}`);
        expect(serviceId).to.exist;
      });
      });

      it('Add a Route', () => {
        gatewayServicesPage.clickAddRoute();
        routesPage.addRoute('Test_Route', 'HTTPS', '/flights');
        routesPage.saveRoute('Test_Route');
      });

    it('Fetch services', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8001/default/services?sort_desc=1&size=30',
        headers: {
          'Content-Type': 'application/json',
          'Host': 'localhost:8001'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data[0]).to.have.property('name', 'Test_Service');
        expect(response.body.data[0].id).to.eq(serviceId);
        cy.log('Services fetched successfully');
      });
    })

  it('Fetch routes', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8001/default/routes?sort_desc=1&size=30',
        headers: {
          'Content-Type': 'application/json',
          'Host': 'localhost:8001'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data[0]).to.have.property('name', 'Test_Route');
        cy.log('Services fetched successfully');
      });
    });

})