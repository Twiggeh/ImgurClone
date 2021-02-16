// safely handles circular references
export const safeStringify = (obj: any, indent = 2) => {
	let cache: any = [];
	const retVal = JSON.stringify(
		obj,
		(_, value) =>
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
	const partsOfSearchBarLoaded = (
		page: Cypress.Chainable<Cypress.AUTWindow>,
		components: TopBarComponents = {
			signInBtn: false,
			signUpBtn: false,
			newPost: false,
			imgur: false,
			searchBar: false,
		}
	) => {
		page
			.get('[class*="StyledBar"]')
			.should('exist')
			.children()
			.then(children => {
				for (const child of children) {
					if (child.innerHTML.includes('sign in')) components.signInBtn = true;
					if (child.innerHTML.includes('Sign Up!')) components.signUpBtn = true;
					if (child.innerHTML.includes('New Post')) components.newPost = true;
					if (child.innerHTML.includes('imgur')) components.imgur = true;
					if (child.innerHTML.includes('#postid,')) components.searchBar = true;
				}
				const checkedIfLoaded = Object.entries(components);
				cy.log(safeStringify(checkedIfLoaded));

				for (let i = 0; i < checkedIfLoaded.length; i++) {
					const component = checkedIfLoaded[i][0];
					const didLoad = checkedIfLoaded[i][1];

					assert.equal(didLoad, true, `${component} did not have the expected value.`);
				}
			});
	};
	before(() => {
		cy.visit('/');
		cy.waitForReact(1001);
	});
	after(() => {
		cy.visit('/');
	});

	it('Loads the main page', () => {
		partsOfSearchBarLoaded(cy.visit('/'));
		partsOfSearchBarLoaded(cy.visit('/home'));
	});

	it('loads the upload page', () => {
		partsOfSearchBarLoaded(cy.visit('/upload'), { searchBar: true });
		cy.get('[class*="StyledDragArea"]').should('exist').and('be.visible');
	});
});

	});
});
