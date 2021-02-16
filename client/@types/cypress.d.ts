declare namespace Cypress {
	interface Chainable<Subject> {
		drag_in_file(
			selector: string,
			fileUrl: string,
			type: FilePropertyBag['type']
		): Chainable<Subject>;
	}
}
