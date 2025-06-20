export default class Sidebar {
    navigateToSection(sectionName) {
        cy.get('a[aria-label="Open Main Menu"]').then($ele =>  {
        if($ele.length) {
            cy.get('a[aria-label="Open Main Menu"]').click();
        }
    });
        cy.xpath('//div[@class="sidebar-item-name-container"]/div').contains(sectionName).click();
    }
}