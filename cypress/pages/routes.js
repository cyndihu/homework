export default class RoutesPage {
    addRoute(routeName, protocols, paths) {
        cy.get('input[data-testid="route-form-name"]').clear().type(routeName);
        cy.get('input[data-testid="route-form-protocols"]').click();
        cy.get('.select-item-label').contains(protocols).click();
        cy.get('input[data-testid="route-form-paths-input-1"]').clear().type(paths, { parseSpecialCharSequences: false });
    }

    saveRoute(routeName) {
        cy.get('button').contains('Save').click();
        cy.xpath(`//b[text()= "${routeName}"]`).should('exist');
    }
}