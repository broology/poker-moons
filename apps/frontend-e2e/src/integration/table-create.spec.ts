import { emptyTable } from './../data/table';

describe('table create', () => {
    beforeEach(() => {
        // [Mock] Create table api response
        cy.intercept('POST', '/table', { body: emptyTable }).as('createTable');
    });

    it('should create a table', () => {
        // [Action] Load base page
        cy.visit('/');

        // [Assert] Redirects to builder
        cy.location('pathname').should('eq', '/builder');

        // [Action] Fill in table name
        cy.get('[data-cy=create-table-name]').type('New Table');

        // [Action] Click `create`
        cy.get('[data-cy=create-table-button]').click();

        // [Wait] for mock response
        cy.wait('@createTable');

        // [Assert] Redirects to table page
        cy.location('pathname').should('eq', `/table/${emptyTable.id}`);

        //  [Mock] Websocket is connected to table
        // TODO Confirm websocket specific data is loaded
    });
});
