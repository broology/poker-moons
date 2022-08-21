import { emptyTable } from './../data/table';

describe('table create', () => {
    beforeEach(() => {
        // [Mock] Create table api response
        cy.intercept('POST', '**/table', { body: emptyTable.id }).as('createTable');
        cy.intercept('GET', '**/table/**', { body: emptyTable }).as('getTable');
    });

    it('should create a table', () => {
        // [Action] Load base page
        cy.visit('/');

        cy.get('[data-cy=landing-button]').click();

        // [Wait] for mock response
        cy.wait('@createTable');
        cy.wait('@getTable');

        // [Assert] Redirects to table page
        cy.location('pathname').should('eq', `/table/${emptyTable.id}`);

        //  [Mock] Websocket is connected to table
        // TODO Confirm websocket specific data is loaded
    });
});
