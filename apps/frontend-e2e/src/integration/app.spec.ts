/**
 * Simple test to make sure app is building and rendering
 */

describe('frontend', () => {
    it('should render page', () => {
        cy.visit('/');
        cy.get('html');
    });
});
