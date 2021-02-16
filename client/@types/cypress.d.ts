declare namespace Cypress {
	interface Chainable<Subject> {
		upload_file(
			selector: string,
			fileUrl: string,
			type: FilePropertyBag['type']
		): Chainable<Subject>;
	}
}
