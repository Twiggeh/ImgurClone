// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('drag_in_file', (selector, fileUrl, type) => {
	return cy
		.fixture(fileUrl, 'base64')
		.then(Cypress.Blob.base64StringToBlob)
		.then(blob => {
			const nameSegments = fileUrl.split('/');
			const name = nameSegments[nameSegments.length - 1];
			const testFile = new File([blob], name, { type });
			const event = { dataTransfer: { files: [testFile] } };
			return cy.get(selector).trigger('drop', event);
		});
});
