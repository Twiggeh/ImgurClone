describe('Routing', () => {
	before(() => {
		cy.visit('/');
		cy.waitForReact(1001);
	});
	after(() => {
		cy.visit('/');
	});

	it('Goes to the upload page', () => {
		cy.visit('/uploads');
	});
});
