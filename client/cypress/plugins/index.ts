/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const exportMe: Cypress.PluginConfig = (on, config) => {
	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config

	require('@cypress/code-coverage/task')(on, config);

	// add other tasks to be registered here

	// IMPORTANT to return the config object
	// with the any changed environment variables

	//on('before:browser:launch', (browser = {}, args) => {
	//
	//  if (browser.name === 'chrome') {
	//    args.push('--remote-debugging-port=9222')
	//
	//    // whatever you return here becomes the new args
	//    return args
	//  }
	//
	//})
	return config;
};

module.exports = exportMe;
