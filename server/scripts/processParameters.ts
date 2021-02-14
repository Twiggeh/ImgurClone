interface PossibleConfigs {
	domain: string;
	domainExt: string;
	subDomain: string;
	securePort: string;
	insecurePort: string;
	devPort: string;
	backendProtocol: string;
}

export const processParams = <T extends Partial<PossibleConfigs>>(
	nodeArgs: NodeJS.Process['argv'],
	defaultCfg: T
) => {
	for (const arg in nodeArgs) {
		const [delimiter, parameter] = arg.split('=');

		console.log(`${delimiter.toUpperCase()}=${parameter}`);

		switch (delimiter) {
			case '-d':
			case '--domain':
				defaultCfg.domain = parameter;
				break;
			case '-s':
			case '--subdomain':
				defaultCfg.subDomain = parameter;
				break;
			case '-sp':
			case '--secureport':
				defaultCfg.securePort = parameter;
				break;
			case '-dp':
			case '--developmentport':
				defaultCfg.devPort = parameter;
				break;
			case '-ip':
			case '--insecureport':
				defaultCfg.insecurePort = parameter;
				break;
			case '-bp':
			case '--backendprotocol':
				if (parameter != 'http' && parameter != 'https') {
					console.log(`${parameter} has to be either http or https`);
					process.exit(1);
				}
				defaultCfg.backendProtocol = parameter;
				break;
			default:
				break;
		}
	}

	return defaultCfg;
};
