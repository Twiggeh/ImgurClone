import { should } from 'chai';

// safely handles circular references
const safeStringify = (obj: any, indent = 2) => {
	let cache: any = [];
	const retVal = JSON.stringify(
		obj,
		(key, value) =>
			typeof value === 'object' && value !== null
				? cache.includes(value)
					? undefined // Duplicate reference found, discard key
					: cache.push(value) && value // Store value in our collection
				: value,
		indent
	);
	cache = null;
	return retVal;
};

describe('Routing', () => {
	before(() => {
		cy.visit('/');
		cy.waitForReact(1001);
	});
	after(() => {
		cy.visit('/');
	});

	it('Loads the main page', () => {
		const mainPageFunctions = (page: Cypress.Chainable<Cypress.AUTWindow>) => {
			page
				.get('[class*="StyledBar"]')
				.should('exist')
				.children()
				.then(children => {
					const loadsComps = {
						signInBtn: false,
						signUpBtn: false,
						newPost: false,
						imgur: false,
						searchBar: false,
					};
					for (const child of children) {
						if (child.innerHTML.includes('sign in')) loadsComps.signInBtn = true;
						if (child.innerHTML.includes('Sign Up!')) loadsComps.signUpBtn = true;
						if (child.innerHTML.includes('New Post')) loadsComps.newPost = true;
						if (child.innerHTML.includes('imgur')) loadsComps.imgur = true;
						if (child.innerHTML.includes('#postid,')) loadsComps.searchBar = true;
					}
					const checkedIfLoaded = Object.entries(loadsComps);
					cy.log(safeStringify(checkedIfLoaded));

					for (let i = 0; i < checkedIfLoaded.length; i++) {
						const component = checkedIfLoaded[i][0];
						const didLoad = checkedIfLoaded[i][1];
						if (!didLoad) cy.log(`${component} did not load.`);
						assert.equal(didLoad, true, `${component} did not load.`);
					}
				});
		};
		mainPageFunctions(cy.visit('/'));
		mainPageFunctions(cy.visit('/home'));
	});
});
