export default class HomePage {
  visit() {
    cy.visit('http://localhost:8002/');
    cy.url().should('include', 'workspaces');
    cy.title().should('eq', 'Workspaces | Kong Manager');
  }

  filterWorkspace(workspaceName) {
    cy.get('input[placeholder="Filter Workspaces"]').click();
    cy.get('input[placeholder="Filter Workspaces"]').type(workspaceName);
    cy.get('.workspace-title').contains(workspaceName).click();
    cy.url().should('include', `${workspaceName}/overview`);
    cy.xpath('//span[text()= "Add a Gateway Service"]').should('exist');
  }
} 