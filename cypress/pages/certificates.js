export default class CertificatesPage {
    addCertificate(cert, key) {
        cy.xpath('//a[text()[contains(.,"New certificate")]]').click();
        cy.get('textarea[data-testid="certificate-form-cert"]').clear().type(cert, { parseSpecialCharSequences: false });
        cy.get('textarea[data-testid="certificate-form-key"]').clear().type(key, { parseSpecialCharSequences: false });
        //  cy.xpath('//div[@data-testid="id-copy-uuid"]//div[@class="copy-text monospace"]').invoke('text')

    }

    saveCertificate() {
        cy.get('button').contains('Save').click();
        cy.xpath('//span[text()= "Certificate Details"]').should('exist');
        return cy.get('div[data-testid="id-copy-uuid"]').find('div[class="copy-text monospace"]').invoke('text').as('certId');
    }
}   