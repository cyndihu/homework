export default class GatewayServicesPage {
    getServiceId() {
        return cy.get('div[data-testid="id-copy-uuid"]').find('div[class="copy-text monospace"]').invoke('text').as('serviceId');
    }

    clickAddRoute(){
        cy.get('button').contains('Add a Route').click();
        cy.xpath('//span[text()= "Create Route"]').should('exist');
    }
    
}