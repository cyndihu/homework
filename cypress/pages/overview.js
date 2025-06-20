export default class OverviewPage {
    addGatewayService(serviceName, tags, url) {
        cy.get('button').contains('Add a Gateway Service').click();
        cy.xpath('//span[text()= "New Gateway Service"]').should('exist');
        cy.get('input[name="name"]').type(serviceName);
        cy.get('input[name="tags"]').type(tags);
        cy.get('input[name="url"]').type(url);
    }

    addGatewayServiceWithFullDetails( retries, connectionTimeout, writeTimeout, readTimeout, clientCert, caCerts, ...tlsverify) {
        // this.addGatewayService(serviceName, tags, url);

        cy.get('button[class="collapse-trigger-content"]').invoke('attr', 'aria-expanded').then((status) => {
            if (status === 'false') {
                cy.get('button[class="collapse-trigger-content"]').click();
            } else {
                cy.log('Collapse content is already expanded.');
            }
        });

        cy.get('input[name="retries"]').clear().type(retries);
        cy.get('input[name="connTimeout"]').clear().type(connectionTimeout);
        cy.get('input[name="writeTimeout"]').clear().type(writeTimeout);
        cy.get('input[name="readTimeout"]').clear().type(readTimeout);
        cy.get('input[name="clientCert"]').clear().type(clientCert);
        cy.get('input[data-testid="gateway-service-ca-certs-input"]').clear().type(caCerts);
        if (tlsverify[0] === 'true') {
            cy.get('input[data-testid="gateway-service-tls-verify-checkbox"]').check().should('be.checked');
            if(tlsverify[0] === 'true') {
            cy.get('input[data-testid="gateway-service-tls-verify-true-option"]').check().should('be.checked');
        }
    
        }
    }
    
    saveGatewayService(serviceName) {
        cy.get('button').contains('Save').click();
        cy.get('span').contains(serviceName).should('exist');
        cy.url().should('include', 'services');
    }
}