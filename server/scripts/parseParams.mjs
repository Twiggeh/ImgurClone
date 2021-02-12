const getParams = nodeArgs => {
	const config = {
		domain: 'localhost',
		domainExt: '',
		subDomain: '',
		securePort: '8080',
		insecurePort: '8081',
		devPort: '5050',
		backendProtocol: 'http',
	};

	for (const arg in nodeArgs) {
		const [delimiter, parameter] = arg.split('=');
		switch (delimiter) {
			case '-d':
			case '--domain':
				config.domain = parameter;
				break;
			case '-s':
			case '--subdomain':
				config.subdomain = parameter;
				break;
			case '-sp':
			case '--secureport':
				config.securePort = parameter;
				break;
			case '-dp':
			case '--developmentport':
				config.devPort = parameter;
				break;
			case '-ip':
			case '--insecureport':
				config.insecurePort = parameter;
				break;
			case '-bp':
			case '--backendprotocol':
				if (parameter != 'http' && parameter != 'https') {
					console.log(`${parameter} has to be either http or https`);
					process.exit(1);
				}
				config.backendProtocol = parameter;
				break;
			default:
				break;
		}
	}

	console.log(`DOMAIN = ${config.domain}`);
	console.log(`DOMAINEXTENSION = ${config.domainExt}`);
	console.log(`SUBDOMAIN = ${config.subdomain}`);
	console.log(`SECUREPORT = ${config.securePort}`);
	console.log(`DEVELOPMENTPORT = ${config.devPort}`);
	console.log(`INSECUREPORT = ${config.insecurePort}`);
	console.log(`BACKENDPROTOCOL = ${config.backendProtocol}`);

	return config;
};

export default getParams;
