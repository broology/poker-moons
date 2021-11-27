describe('frontend', () => {
    beforeEach(() => cy.visit('/'));

    it('should render page', () => {
        cy.get('html');
    });
});
